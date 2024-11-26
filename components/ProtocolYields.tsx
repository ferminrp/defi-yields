'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Pool {
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apyBase: number;
  apyReward: number;
  apy: number;
}

interface PoolsResponse {
  status: string;
  data: Pool[];
}

export function ProtocolYields() {
  const [aaveData, setAaveData] = useState<Pool[]>([]);
  const [compoundData, setCompoundData] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://yields.llama.fi/pools');
        const data: PoolsResponse = await response.json();

        if (data.status === 'success') {
          const aavePools = data.data
            .filter((pool) => pool.project === 'aave-v3' && pool.symbol === 'USDC')
            .sort((a, b) => (b.apyBase + (b.apyReward || 0)) - (a.apyBase + (a.apyReward || 0)));

          const compoundPools = data.data
            .filter((pool) => pool.project === 'compound-v3' && pool.symbol === 'USDC')
            .sort((a, b) => (b.apyBase + (b.apyReward || 0)) - (a.apyBase + (a.apyReward || 0)));

          setAaveData(aavePools);
          setCompoundData(compoundPools);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatAPY = (value: number | null) => {
    if (value === null || value === undefined) return '0.00';
    return value.toFixed(2);
  };

  const renderPoolCard = (title: string, description: string, pools: Pool[]) => (
    <Card className="w-full md:w-[600px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : pools.length > 0 ? (
          <div className="space-y-4">
            {pools.map((pool, index) => (
              <div
                key={`${pool.chain}-${index}`}
                className="flex justify-between items-center p-4 rounded-lg bg-secondary"
              >
                <div>
                  <h3 className="font-medium">{pool.chain}</h3>
                  <p className="text-sm text-muted-foreground">USDC</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {(pool.apyBase + (pool.apyReward || 0)).toFixed(2)}% APY
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <span>Base: {formatAPY(pool.apyBase)}%</span>
                    {pool.apyReward > 0 && (
                      <span className="ml-2">Rewards: {formatAPY(pool.apyReward)}%</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No pools available</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      {renderPoolCard(
        'AAVE USDC Yields',
        'Compare USDC lending yields across different chains',
        aaveData
      )}
      {renderPoolCard(
        'Compound USDC Yields',
        'Compare USDC lending yields across different chains',
        compoundData
      )}
    </div>
  );
}