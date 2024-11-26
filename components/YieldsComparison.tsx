'use client';

import { useEffect, useState } from 'react';
import { YieldCard } from '@/components/YieldCard';
import { fetchProtocolYields } from '@/lib/api';
import type { YieldPool } from '@/lib/types';

interface YieldsComparisonProps {
  protocol: string;
  title: string;
}

export function YieldsComparison({ protocol, title }: YieldsComparisonProps) {
  const [pools, setPools] = useState<YieldPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProtocolYields(protocol);
        setPools(data);
      } catch (err) {
        setError('Failed to fetch yield data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [protocol]);

  return (
    <YieldCard
      title={title}
      pools={pools}
      loading={loading}
      error={error}
    />
  );
}