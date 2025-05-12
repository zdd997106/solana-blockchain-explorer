import { UnixTimestamp } from '@solana/kit';

export function toSol(lamports: number | bigint = 0) {
  return Number(lamports) / 1_000_000_000;
}

export function toDate(unixTimestamp: UnixTimestamp) {
  return new Date(+unixTimestamp.toString() * 1000);
}
