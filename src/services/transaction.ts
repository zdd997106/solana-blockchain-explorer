import { Signature, SolanaError } from '@solana/kit';
import { RpcService } from './core';

export default class TransactionService extends RpcService {
  public getTransaction = async (signature: string) => {
    try {
      const transaction = await this.rpc
        .getTransaction(signature as Signature, {
          encoding: 'jsonParsed',
          maxSupportedTransactionVersion: 0,
        })
        .send();

      if (!transaction) return null;

      return {
        ...transaction,
      };
    } catch (error) {
      if (error instanceof SolanaError && error.message.startsWith('Transaction not available')) {
        return null;
      }
      throw error;
    }
  };
}

export type TransactionDto = NonNullable<Awaited<ReturnType<TransactionService['getTransaction']>>>;

export type TransactionAccountDto = TransactionDto['transaction']['message']['accountKeys'][number];
