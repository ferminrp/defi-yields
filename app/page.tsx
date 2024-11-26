import { YieldsComparison } from '@/components/YieldsComparison';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">DeFi Yields Comparison</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <YieldsComparison protocol="aave-v3" title="AAVE" />
          <YieldsComparison protocol="compound-v3" title="Compound" />
        </div>
      </div>
    </main>
  );
}