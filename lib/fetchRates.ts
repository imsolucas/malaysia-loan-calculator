export type LendingRate = { year: number; rate: number };

// World Bank API row type (simplified)
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

export async function fetchLendingRates(): Promise<LendingRate[]> {
  const START_YEAR = 1975;
  const END_YEAR = 2022;
  const base = process.env.WORLD_BANK_API_URL || "";

  const firstJson = await fetchJson(base + "&page=1");
  const meta = firstJson[0] ?? { pages: 1 };
  const rows: WorldBankRow[] = firstJson[1] ?? []; // ✅ typed

  const pages = meta.pages ?? 1;
  if (pages > 1) {
    for (let p = 2; p <= pages; p++) {
      const pageJson = await fetchJson(base + `&page=${p}`);
      rows.push(...((pageJson[1] ?? []) as WorldBankRow[]));
    }
  }

  const normalized: LendingRate[] = rows
    .filter((r) => r && r.value !== null)
    .map((r) => ({ year: Number(r.date), rate: Number(r.value) }))
    .filter((r) => r.year >= START_YEAR && r.year <= END_YEAR)
    .sort((a, b) => a.year - b.year);

  return normalized;
}
