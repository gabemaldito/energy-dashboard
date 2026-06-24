interface StatusFooterProps {
  lastUpdated: Date | null;
  isOnline: boolean;
}

export function StatusFooter({ lastUpdated, isOnline }: StatusFooterProps) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-500 shadow-sm">
      <div className="flex items-center gap-2">
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span>{isOnline ? "Online" : "Offline"}</span>
      </div>

      {lastUpdated && (
        <span>
          Last updated:{" "}
          {lastUpdated.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </span>
      )}

      <a
        href={`${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000"}/docs`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-blue-600 underline-offset-2 hover:underline"
      >
        API Docs ↗
      </a>
    </footer>
  );
}
