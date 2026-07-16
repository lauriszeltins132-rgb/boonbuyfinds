"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[boonbuyfinds] global error", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          background: "#fffcf8",
          color: "#1a1410",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#ff8000",
              margin: 0,
            }}
          >
            BoonBuy Finds
          </p>
          <h1 style={{ fontSize: 28, margin: "12px 0 8px" }}>
            Temporary loading error
          </h1>
          <p style={{ color: "#7a6f66", maxWidth: 420, margin: "0 auto 24px" }}>
            Please refresh the page. If it keeps happening, try again in a
            moment.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              border: 0,
              borderRadius: 999,
              background: "#ff8000",
              color: "#fff",
              fontWeight: 800,
              padding: "12px 20px",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>
        </div>
      </body>
    </html>
  );
}
