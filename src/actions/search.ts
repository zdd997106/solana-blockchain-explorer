'use server';

import { BlockService, TransactionService } from 'src/services';

const blockService = new BlockService();
const transactionService = new TransactionService();

// ----------

export async function solanaSearch(query: string) {
  const block = await blockService.searchBlock(query);
  if (block)
    return [
      {
        type: 'block',
        value: String(block.slot),
        label: String(block.blockhash),
      },
    ];

  const transaction = await transactionService.searchTransaction(query);
  if (transaction)
    return [
      {
        type: 'transaction',
        value: String(transaction.transaction.signatures[0]),
        label: String(transaction.transaction.signatures[0]),
      },
    ];

  return [];
}
