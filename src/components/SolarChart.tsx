import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { ForecastEntry } from "../api/types";

interface SolarChartProps {
  data: ForecastEntry[];
}

function formatHour(time: string): string {
  const d = new Date(time);
  return `${String(d.getHours()).padStart(2, "0")}:00`;
}

export function SolarChart({ data }: SolarChartProps) {
  const chartData = data.map((entry) => ({
    name: formatHour(entry.time),
    radiation: entry.shortwave_radiation,
  }));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        Solar radiation — next {data.length}h (W/m²)
      </h3>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
          <defs>
            <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
            width={40}
          />
          <Tooltip
            formatter={(value) => [`${Number(value).toFixed(0)} W/m²`, "Radiation"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "13px",
            }}
          />
          <Area
            type="monotone"
            dataKey="radiation"
            stroke="#f59e0b"
            strokeWidth={2}
            fill="url(#solarGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
