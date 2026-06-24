import type { DecisionResponse } from "../api/types";

const VERDICT_CONFIG = {
  CHARGE: {
    label: "CHARGE",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    icon: "⚡",
    description: "Charge battery — low price and/or high solar radiation",
  },
  DISCHARGE: {
    label: "DISCHARGE",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    icon: "🔋",
    description: "Discharge battery — high price, use stored energy",
  },
  HOLD: {
    label: "HOLD",
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-700",
    icon: "⏸️",
    description: "Hold current state — neutral conditions",
  },
} as const;

interface VerdictCardProps {
  decision: DecisionResponse;
}

export function VerdictCard({ decision }: VerdictCardProps) {
  const config = VERDICT_CONFIG[decision.action];

  return (
    <div
      className={`rounded-2xl border ${config.border} ${config.bg} p-6 shadow-sm`}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{config.icon}</span>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Verdict
          </p>
          <h2 className={`text-2xl font-bold ${config.text}`}>{config.label}</h2>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-600">{config.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-white/60 p-3">
          <p className="text-xs text-gray-500">Current price</p>
          <p className="font-semibold text-gray-800">
            €{decision.current_price.toFixed(0)}/MWh
          </p>
        </div>
        <div className="rounded-lg bg-white/60 p-3">
          <p className="text-xs text-gray-500">Solar radiation</p>
          <p className="font-semibold text-gray-800">
            {decision.average_radiation.toFixed(0)} W/m²
          </p>
        </div>
      </div>
    </div>
  );
}
