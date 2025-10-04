
export type WorldBankIndicator = {
  id: string;
  name: string;
  value: number | null;
  year: number;
};

type WorldBankRow = {
  indicator: { id: string; value: string };
  country: { id: string; value: string };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
};

async function fetchJson(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchWorldBankIndicators(): Promise<WorldBankIndicator[]> {
  const INDICATORS = [
    "SP.POP.TOTL", // Population, total
    "NY.GDP.MKTP.CD", // GDP (current US$)
    "NY.GDP.PCAP.CD", // GDP per capita (current US$)
    "FP.CPI.TOTL.ZG", // Inflation, consumer prices (annual %)
  ];
  const annee = new Date().getFullYear() - 1;
  const url = `https://api.worldbank.org/v2/country/MYS/indicator/${INDICATORS.join(
    ";"
  )}?format=json&date=${annee}`;

  const data = await fetchJson(url);

  if (!data || !data[1]) {
    return [];
  }

  return data[1].map((row: WorldBankRow) => ({
    id: row.indicator.id,
    name: row.indicator.value,
    value: row.value,
    year: Number(row.date),
  }));
}
