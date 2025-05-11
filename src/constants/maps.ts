// Map of program IDs to their names
// Reference: https://github.com/solana-foundation/explorer/blob/master/app/utils/programs.ts
export const programNameMap = new Map<string, string>([
  // Core Programs
  ['11111111111111111111111111111111', 'System Program'],
  ['Stake11111111111111111111111111111111111111', 'Stake Program'],
  ['Vote111111111111111111111111111111111111111', 'Vote Program'],
  ['ComputeBudget111111111111111111111111111111', 'Compute Budget Program'],

  // SPL Programs
  ['TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', 'SPL Token Program'],
  ['TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb', 'SPL Token 2022 Program'],
  ['ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL', 'Associated Token Account Program'],
  ['MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr', 'Memo Program'],

  // Sysvar Programs
  ['SysvarC1ock11111111111111111111111111111111', 'Clock Sysvar'],
  ['SysvarRent111111111111111111111111111111111', 'Rent Sysvar'],
  ['SysvarRecentB1ockHashes11111111111111111111', 'Recent Blockhashes Sysvar'],
  ['SysvarFees111111111111111111111111111111111', 'Fees Sysvar'],
  ['SysvarInstructions1111111111111111111111111', 'Instructions Sysvar'],

  // Loader Programs
  ['BPFLoader1111111111111111111111111111111111', 'BPF Loader'],
  ['BPFLoader2111111111111111111111111111111111', 'BPF Loader 2'],
  ['BPFLoaderUpgradeab1e11111111111111111111111', 'BPF Upgradeable Loader'],

  // DeFi & DEX Programs
  ['JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4', 'Jupiter Aggregator'],
  ['whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc', 'Whirlpool AMM'],
  ['dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH', 'Drift Protocol'],
  ['22Y43yTVxuUkoRKdm9thyRhQ3SdgQS7c7kB6UNCiaczD', 'Serum Swap'],
  ['RVKd61ztZW9GdKzvXzXjJZ6hRM6o3qK8Hkz5wihFERQ', 'Raydium AMM'],
  ['SwaPp5j3xkYk5g1XvXjJZ6hRM6o3qK8Hkz5wihFERQ', 'Saber StableSwap'],

  // NFT & Metadata Programs
  ['metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s', 'Metaplex Metadata'],
  ['mplTokenMetadata1111111111111111111111111111', 'Metaplex Token Metadata'],
  ['NFT111111111111111111111111111111111111111', 'NFT Program'],

  // Name Service
  ['namesLP1x2x3x4x5x6x7x8x9x0x1x2x3x4x5x6x7x8x9', 'Solana Name Service'],

  // Other Programs
  ['ZkTokenProof1111111111111111111111111111111', 'ZK Token Proof Program'],
  ['noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV', 'Noop Program'],
]);
