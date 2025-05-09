import { createSolanaRpc } from '@solana/kit';
import { env } from 'src/utils/env';

type Rpc = ReturnType<typeof createSolanaRpc<any>>;

const clusterUrl = env.getOrThrow('CLUSTER_URL');

export class RpcService {
  protected readonly rpc: Rpc;

  constructor() {
    this.rpc = createSolanaRpc(clusterUrl);
  }
}
