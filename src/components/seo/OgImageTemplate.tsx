import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage(title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #FF9D2E 0%, #FF8000 42%, #FFF5EA 100%)",
          color: "#1A1410",
          fontFamily: "system-ui, sans-serif",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 1000,
            color: "#FFFFFF",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#1A1410",
            fontWeight: 600,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 36,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#49D6D9",
            }}
          />
          <div style={{ fontSize: 22, color: "#5C524A" }}>boonbuyfinds.net</div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
