import type { HealthResponse, ForecastResponse, DecisionResponse } from "./types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
const TIMEOUT_MS = 8_000;

async function fetchAPI<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE_URL}${path}`, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`API ${res.status}: ${res.statusText}`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

export function getHealth(): Promise<HealthResponse> {
  return fetchAPI<HealthResponse>("/health");
}

export function getForecast(): Promise<ForecastResponse> {
  return fetchAPI<ForecastResponse>("/api/v1/forecast");
}

export function getDecision(): Promise<DecisionResponse> {
  return fetchAPI<DecisionResponse>("/api/v1/decision");
}
