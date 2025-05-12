/* eslint-disable no-await-in-loop */
import { omit, orderBy } from 'lodash';
import { SolanaError } from '@solana/kit';

import { sleep } from 'src/utils';

import { RpcService } from './core';

// ----------

export default class BlockService extends RpcService {
  /**
   * Get the latest blocks from the Solana cluster.
   */
  public getLatestBlocks = async (payload: GetLatestBlocksPayload) => {
    const slot = payload.slot ? BigInt(payload.slot) : await this.getLatestBlockSlot();
    const slots = await this.rpc.getBlocks(slot - BigInt(payload.limit) + 1n, slot).send();

    const blocks: PreviewBlockDto[] = [];
    for (let i = 0; i < slots.length; i++) {
      const block = await this.getBlockPreview(slots[i]);
      if (block) blocks.push(block);
      await sleep(100); // Adds a small delay to avoid rate limiting exceeding
    }
    return orderBy(blocks, ['slot'], 'desc');
  };

  public getLatestBlockSlot = async () => {
    const slot = await this.rpc.getSlot().send();
    return slot;
  };

  /**
   * Get a preview of a block from the Solana cluster.
   */
  public getBlockPreview = async (slot: bigint) => {
    try {
      const block = await this.rpc.getBlock(slot, { transactionDetails: 'signatures' }).send();

      if (!block) return null;

      return {
        ...omit(block, 'signatures'),
        slot,
        transactionLength: block.signatures.length,
      };
    } catch {
      return null;
    }
  };

  /**
   * Get the details of a block from the Solana cluster.
   */
  public getBlock = async (slot: bigint) => {
    try {
      const block = await this.rpc
        .getBlock(slot, {
          transactionDetails: 'full',
          encoding: 'jsonParsed',
          maxSupportedTransactionVersion: 0,
        })
        .send();

      if (!block) return null;

      return { ...block, slot };
    } catch (error) {
      if (error instanceof SolanaError && error.message.includes('Block not available'))
        return null;
      throw error;
    }
  };

  public searchBlock = async (query: string) => {
    try {
      if (!query) return null;

      const slot = BigInt(query);
      const block = await this.rpc
        .getBlock(slot, {
          transactionDetails: 'none',
          encoding: 'json',
          maxSupportedTransactionVersion: 0,
        })
        .send();

      return { ...block, slot };
    } catch {
      return null;
    }
  };
}

interface GetLatestBlocksPayload {
  limit: number;
  slot?: bigint | string;
}

export interface PreviewBlockDto
  extends NonNullable<Awaited<ReturnType<BlockService['getBlockPreview']>>> {}

export interface BlockDto extends NonNullable<Awaited<ReturnType<BlockService['getBlock']>>> {}

export type PreviewTransactionDto = BlockDto['transactions'][number];

export type InstructionDto =
  PreviewTransactionDto['transaction']['message']['instructions'][number];

export type InnerInstructionDto = NonNullable<
  PreviewTransactionDto['meta']
>['innerInstructions'][number]['instructions'][number];
