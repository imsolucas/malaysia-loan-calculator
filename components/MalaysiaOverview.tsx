"use client";

import React, { useEffect, useState } from "react";

// Fetch Malaysia overview data from World Bank API
async function fetchMalaysiaOverview() {
  const indicators = {
    GDP: "NY.GDP.MKTP.CD",
    Population: "SP.POP.TOTL",
    Inflation: "FP.CPI.TOTL.ZG",
    "GNI per Capita": "NY.GNP.PCAP.CD",
  };

  const results: { name: string; value: number | string; year: number }[] = [];

  for (const [name, code] of Object.entries(indicators)) {
    try {
      const res = await fetch(
        `https://api.worldbank.org/v2/country/MY/indicator/${code}?format=json&per_page=1`
      );
      const json = await res.json();
      const entry = json?.[1]?.[0];
      if (entry) {
        results.push({
          name,
          value:
            name === "Inflation"
              ? Number(entry.value).toFixed(2) + "%"
              : Number(entry.value),
          year: entry.date ? Number(entry.date) : new Date().getFullYear(),
        });
      }
    } catch (e) {
      console.error(`Failed to fetch ${name}`, e);
    }
  }

  return results;
}

type Props = {
  theme: "light" | "dark";
};

export default function MalaysiaOverview({ theme }: Props) {
  const [data, setData] = useState<
    { name: string; value: string | number; year: number }[]
  >([]);

  useEffect(() => {
    fetchMalaysiaOverview().then(setData);
  }, []);

  return (
    <div
      className={`card p-6 sm:p-8 rounded-xl shadow-lg border transition-all duration-300 ${
        theme === "light"
          ? "bg-white border-green-200"
          : "bg-gray-900 border-green-700"
      }`}
    >
      <h2
        className={`text-xl font-bold mb-6 transition-colors ${
          theme === "light" ? "text-gray-900" : "text-white"
        }`}
      >
        🇲🇾 Malaysia Economic Overview
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {data.length === 0 && (
          <p
            className={`col-span-4 text-center text-sm ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Loading latest data from World Bank...
          </p>
        )}

        {data.map((item) => (
          <div
            key={item.name}
            className={`relative group rounded-xl p-5 text-center shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200
              ${
                theme === "light"
                  ? "bg-white border border-green-100"
                  : "bg-gray-800 border border-green-700"
              }`}
          >
            <p
              className={`text-ellipsis text-sm font-medium mb-1 ${
                theme === "light" ? "text-gray-600" : "text-gray-300"
              }`}
              title={item.name}
            >
              {item.name}
            </p>
            <p
              className={`truncate text-2xl font-extrabold ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
              title={
                typeof item.value === "number"
                  ? item.value.toLocaleString()
                  : item.value
              }
            >
              {typeof item.value === "number"
                ? item.value.toLocaleString()
                : item.value}
            </p>

            {/* Year */}
            <p
              className={`truncate text-xs mt-1 ${
                theme === "light" ? "text-gray-500" : "text-gray-400"
              }`}
              title={`Year: ${item.year}`}
            >
              ({item.year})
            </p>

            {/* Fancy tooltip on hover */}
            <div
              className="absolute hidden group-hover:flex flex-col items-center
                         bg-gray-900/90 text-white text-xs px-3 py-1 rounded-lg
                         shadow-md whitespace-nowrap z-10 -top-10 left-1/2 -translate-x-1/2"
            >
              <span>{item.name}</span>
              <span className="opacity-80">
                {typeof item.value === "number"
                  ? item.value.toLocaleString()
                  : item.value}{" "}
                ({item.year})
              </span>
              <div className="w-2 h-2 bg-gray-900/90 rotate-45 absolute -bottom-1"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
