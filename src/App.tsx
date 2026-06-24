import { useCallback, useEffect, useRef, useState } from "react";
import { getDecision, getForecast, getHealth } from "./api/client";
import type { DecisionResponse, ForecastResponse } from "./api/types";
import { VerdictCard } from "./components/VerdictCard";
import { PriceChart } from "./components/PriceChart";
import { SolarChart } from "./components/SolarChart";
import { StatusFooter } from "./components/StatusFooter";
import { ErrorState } from "./components/ErrorState";
import { LoadingSkeleton } from "./components/LoadingSkeleton";

const POLL_INTERVAL_MS = 5 * 60 * 1000;

interface AppData {
  decision: DecisionResponse;
  forecast: ForecastResponse;
}

export default function App() {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const fetchData = useCallback(async () => {
    try {
      const [decision, forecast] = await Promise.all([
        getDecision(),
        getForecast(),
      ]);
      setData({ decision, forecast });
      setError(null);
      setLastUpdated(new Date());

      const health = await getHealth();
      setIsOnline(health.status === "ok");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setError(msg);
      setIsOnline(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(fetchData, POLL_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData]);

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
           Energy Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Battery Controller — Groningen, NL
        </p>
      </header>

      {loading && <LoadingSkeleton />}

      {!loading && error && (
        <ErrorState message={error} onRetry={fetchData} />
      )}

      {!loading && !error && data && (
        <div className="space-y-6">
          <VerdictCard decision={data.decision} />
          <PriceChart data={data.decision.hourly_forecast_price} />
          <SolarChart data={data.forecast.forecast} />
        </div>
      )}

      <div className="mt-8">
        <StatusFooter lastUpdated={lastUpdated} isOnline={isOnline} />
      </div>
    </div>
  );
}
