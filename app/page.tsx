import Dashboard from "@/components/Dashboard";

export default async function Page() {
	return (
    <main className="min-h-dvh">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            🇲🇾 Malaysia Historical Loan Cost Calculator (1975–2022)
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Data source: World Bank — Lending interest rate (%)
          </p>
        </header>
        <Dashboard />
      </div>
    </main>
  );
}
