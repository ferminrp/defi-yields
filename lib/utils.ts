import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { YieldPool } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTotalApy(pool: YieldPool): number {
  const baseApy = pool.apyBase || 0;
  const rewardApy = pool.apyReward || 0;
  return baseApy + rewardApy;
}

export function formatPercentage(value: number): string {
  return value.toFixed(2);
}

export function calculateMaxApy(pools: YieldPool[]): number {
  if (pools.length === 0) return 0;
  return Math.max(...pools.map(calculateTotalApy));
}