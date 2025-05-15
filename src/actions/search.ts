'use server';

import { BlockService, ECluster, TransactionService } from 'src/services';

// ----------

export async function solanaSearch(cluster: ECluster | undefined, query: string) {
  const blockService = new BlockService(cluster);
  const block = await blockService.searchBlock(query);
  if (block)
    return [
      {
        type: 'block',
        value: String(block.slot),
        label: String(block.blockhash),
      },
    ];

  const transactionService = new TransactionService(cluster);
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
