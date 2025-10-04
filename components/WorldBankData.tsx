'use client';

import { useEffect, useState } from 'react';
import { fetchWorldBankIndicators, WorldBankIndicator } from '@/lib/fetchWorldBankData';

export default function WorldBankData() {
  const [data, setData] = useState<WorldBankIndicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchWorldBankIndicators()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-4">Loading Malaysia data...</div>;
  if (error) return <div className="text-center text-red-500 py-4">Error: {error.message}</div>;
  if (!data.length) return null;

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Malaysia at a Glance ({data[0].year})</h2>
      <div className="grid grid-cols-2 gap-4">
        {data.map((indicator) => (
          <div key={indicator.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">{indicator.name}</p>
            <p className="text-xl sm:text-2xl font-bold">
              {indicator.value !== null ? formatIndicator(indicator) : 'N/A'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatIndicator(indicator: WorldBankIndicator): string {
  if (indicator.value === null) return 'N/A';

  switch (indicator.id) {
    case 'SP.POP.TOTL':
      return (indicator.value / 1_000_000).toFixed(2) + 'M';
    case 'NY.GDP.MKTP.CD':
      return '$' + (indicator.value / 1_000_000_000).toFixed(2) + 'B';
    case 'NY.GDP.PCAP.CD':
      return '$' + indicator.value.toFixed(2);
    case 'FP.CPI.TOTL.ZG':
      return indicator.value.toFixed(2) + '%';
    default:
      return indicator.value.toString();
  }
}
