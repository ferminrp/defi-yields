'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import type { YieldPool } from '@/lib/types';
import { calculateMaxApy, calculateTotalApy, formatPercentage } from '@/lib/utils';

interface YieldListProps {
  pools: YieldPool[];
  loading: boolean;
}

export function YieldList({ pools, loading }: YieldListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (pools.length === 0) {
    return <p className="text-center text-muted-foreground">No yields data available</p>;
  }

  const maxApy = calculateMaxApy(pools);

  return (
    <div className="space-y-6">
      {pools.map((pool) => {
        const totalApy = calculateTotalApy(pool);
        const progressPercentage = maxApy > 0 ? (totalApy / maxApy) * 100 : 0;

        return (
          <div key={pool.pool} className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">{pool.chain}</span>
                <p className="text-sm text-muted-foreground">
                  TVL: ${(pool.tvlUsd / 1e6).toFixed(2)}M
                </p>
              </div>
              <div className="text-right">
                <span className="font-medium">
                  {formatPercentage(totalApy)}% APY
                </span>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Base: {formatPercentage(pool.apyBase || 0)}%</span>
              {(pool.apyReward || 0) > 0 && (
                <span>Reward: {formatPercentage(pool.apyReward)}%</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}