'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { YieldList } from '@/components/YieldList';
import type { YieldPool } from '@/lib/types';

interface YieldCardProps {
  title: string;
  pools: YieldPool[];
  loading: boolean;
  error: string | null;
}

export function YieldCard({ title, pools, loading, error }: YieldCardProps) {
  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title} Yields</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title} USDC Yields</CardTitle>
      </CardHeader>
      <CardContent>
        <YieldList pools={pools} loading={loading} />
      </CardContent>
    </Card>
  );
}