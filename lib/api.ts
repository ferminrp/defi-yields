import type { YieldPool, YieldsResponse } from './types';

export async function fetchProtocolYields(protocol: string): Promise<YieldPool[]> {
  try {
    const response = await fetch('https://yields.llama.fi/pools');
    const data: YieldsResponse = await response.json();
    
    if (data.status !== 'success') {
      throw new Error('Failed to fetch data');
    }

    return data.data
      .filter((pool) => 
        pool.project === protocol && 
        pool.symbol === 'USDC'
      )
      .sort((a, b) => (b.apyBase + (b.apyReward || 0)) - (a.apyBase + (a.apyReward || 0)));
  } catch (error) {
    console.error('Error fetching yields:', error);
    throw error;
  }
}