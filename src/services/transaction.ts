import { isSignature, SolanaError } from '@solana/kit';
import { RpcService } from './core';

export default class TransactionService extends RpcService {
  public getTransaction = async (signature: string) => {
    try {
      if (!isSignature(signature)) return null;

      const transaction = await this.rpc
        .getTransaction(signature, {
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

  public searchTransaction = async (query: string) => {
    try {
      if (!isSignature(query)) return null;

      const transaction = await this.rpc
        .getTransaction(query, {
          encoding: 'json',
          maxSupportedTransactionVersion: 0,
        })
        .send();

      if (!transaction) return null;
      return { ...transaction, signature: transaction.transaction.signatures[0] };
    } catch {
      return null;
    }
  };
}

export type TransactionDto = NonNullable<Awaited<ReturnType<TransactionService['getTransaction']>>>;

export type TransactionAccountDto = TransactionDto['transaction']['message']['accountKeys'][number];
