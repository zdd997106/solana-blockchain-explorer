'use client';

import { useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { useAction } from 'gexii/hooks';
import { Autocomplete, BaseTextFieldProps, CircularProgress, TextField } from '@mui/material';

import { solanaSearch } from 'src/actions/search';

// ----------

interface SolanaSearchFieldProps extends BaseTextFieldProps {}

export default function SolanaSearchField({ ...props }: SolanaSearchFieldProps) {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const search = useAction(async (query: string) => solanaSearch(query), {
    defaultValue: [],
  });

  // ----- HANDLERS -----

  const handleClose = () => {
    setOpen(false);
    search.reset();
  };

  const handleChange = (_: unknown, option: Option | null) => {
    if (!option) return;
    router.push(getLink(option));
    setInputValue('');
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    const inputValue = event.target.value.trim();

    search.reset();
    search(inputValue);
    setInputValue(inputValue);
  };

  return (
    <Autocomplete
      open={open}
      inputValue={inputValue}
      disableClearable={!inputValue}
      blurOnSelect
      onOpen={() => setOpen(true)}
      onClose={handleClose}
      isOptionEqualToValue={() => true} // Disable equality check
      getOptionLabel={getOptionLabel}
      options={search.getData()}
      loading={search.isLoading()}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          {...props}
          label="Search blocks or transactions"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {search.isLoading() ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            },
          }}
          onChange={handleInputChange}
        />
      )}
    />
  );
}

// ----- HELPERS -----

function getOptionLabel(option: Option) {
  switch (option.type) {
    case 'block':
      return `Block: ${option.label} (#${option.value})`;

    case 'transaction':
      return `Transaction: ${option.label}`;

    default:
      return option.label;
  }
}

function getLink(option: Option) {
  switch (option.type) {
    case 'block':
      return `/blocks/${option.value}`;

    case 'transaction':
      return `/transactions/${option.value}`;

    default:
      return '';
  }
}

// ----- INTERNAL TYPES -----

type Option = Awaited<ReturnType<typeof solanaSearch>>[number];
