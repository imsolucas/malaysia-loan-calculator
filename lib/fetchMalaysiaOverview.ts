// lib/fetchMalaysiaOverview.ts
export type IndicatorData = {
  name: string;
  value: string | number;
  year: number;
};

const INDICATORS = [
  { id: "SP.POP.TOTL", name: "Population" },
  { id: "NY.GDP.MKTP.CD", name: "GDP (current US$)" },
  { id: "FP.CPI.TOTL.ZG", name: "Inflation Rate (%)" },
  { id: "NY.GNP.PCAP.CD", name: "GNI per Capita (US$)" },
];

async function fetchIndicator(indicatorId: string): Promise<IndicatorData | null> {
  const url = `https://api.worldbank.org/v2/country/MY/indicator/${indicatorId}?format=json&per_page=1`;
  const res = await fetch(url);
  const json = await res.json();

  const data = json[1]?.[0];
  if (!data) return null;

  return {
    name: data.indicator.value,
    value: data.value,
    year: data.date,
  };
}

export async function fetchMalaysiaOverview(): Promise<IndicatorData[]> {
  const results = await Promise.all(INDICATORS.map(i => fetchIndicator(i.id)));
  return results.filter(Boolean) as IndicatorData[];
}
