import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { PriceForecastEntry } from "../api/types";

interface PriceChartProps {
  data: PriceForecastEntry[];
}

function formatHour(readingDate: string): string {
  const d = new Date(readingDate);
  return `${String(d.getHours()).padStart(2, "0")}:00`;
}

export function PriceChart({ data }: PriceChartProps) {
  const now = new Date();
  const currentHour = now.getHours();

  const prices = data.map((d) => d.price * 1000);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const chartData = data.map((entry) => {
    const hour = new Date(entry.readingDate).getHours();
    const priceMWh = entry.price * 1000;
    const isCurrent = hour === currentHour;
    const isCheapest = priceMWh === minPrice;
    const isMostExpensive = priceMWh === maxPrice;

    return {
      name: formatHour(entry.readingDate),
      price: priceMWh,
      isCurrent,
      isCheapest,
      isMostExpensive,
    };
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        Electricity price — next {data.length}h (€/MWh)
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            width={50}
          />
          <Tooltip
            formatter={(value) => [`€${Number(value).toFixed(0)}/MWh`, "Price"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "13px",
            }}
          />
          <Bar dataKey="price" radius={[4, 4, 0, 0]} maxBarSize={48}>
            {chartData.map((entry, i) => (
              <Cell
                key={i}
                fill={
                  entry.isMostExpensive
                    ? "#ef4444"
                    : entry.isCheapest
                      ? "#22c55e"
                      : entry.isCurrent
                        ? "#3b82f6"
                        : "#93c5fd"
                }
                stroke={
                  entry.isCurrent ? "#1d4ed8" : "transparent"
                }
                strokeWidth={entry.isCurrent ? 2 : 0}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm bg-blue-500" /> Current
          hour
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm bg-green-500" /> Cheapest
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm bg-red-500" /> Most
          expensive
        </span>
      </div>
    </div>
  );
}
