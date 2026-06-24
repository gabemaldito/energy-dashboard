export interface HealthResponse {
  status: string;
  api_version: string;
  timestamp: string;
}

export interface ForecastEntry {
  time: string;
  shortwave_radiation: number;
}

export interface ForecastResponse {
  location: string;
  latitude: number;
  longitude: number;
  forecast: ForecastEntry[];
  average_radiation: number;
}

export interface PriceForecastEntry {
  readingDate: string;
  price: number;
}

export interface DecisionResponse {
  action: "CHARGE" | "DISCHARGE" | "HOLD";
  average_radiation: number;
  current_price: number;
  hourly_forecast_price: PriceForecastEntry[];
}
