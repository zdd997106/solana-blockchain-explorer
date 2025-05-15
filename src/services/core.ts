import { createSolanaRpc } from '@solana/kit';
import { env } from 'src/utils/env';

type Rpc = ReturnType<typeof createSolanaRpc<any>>;

export class RpcService {
  protected readonly rpc: Rpc;

  constructor(type: ECluster = ECluster.MAINNET) {
    this.rpc = createSolanaRpc(getRpcUrl(type));
  }
}

// ---- HELPERS -----

function getRpcUrl(type: ECluster) {
  switch (type) {
    case ECluster.TESTNET:
      return env.getOrThrow('TESTNET_URL');

    case ECluster.DEVNET:
      return env.getOrThrow('DEVNET_URL');

    case ECluster.MAINNET:
    default:
      return env.getOrThrow('MAINNET_URL');
  }
}

// ----- ENUMS -----

export const ECluster = {
  MAINNET: 'mainnet',
  DEVNET: 'devnet',
  TESTNET: 'testnet',
} as const;

export type ECluster = (typeof ECluster)[keyof typeof ECluster];
