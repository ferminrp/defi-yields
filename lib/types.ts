export interface YieldPool {
  pool: string; // Unique identifier for the pool
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apyBase: number;
  apyReward: number | null;
  apy: number;
}

export interface YieldsResponse {
  status: string;
  data: YieldPool[];
}