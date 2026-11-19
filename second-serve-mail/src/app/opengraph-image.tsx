import { ImageResponse } from "next/og";
import { site } from "@/content";

export const alt = "Second Serve Mail: Email & SMS retention for Brisbane restaurants";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F8F3EA", padding: 72, color: "#1F2A24" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 40 40">
            <circle cx="15" cy="20" r="11" fill="#B94E2A" />
            <circle cx="25" cy="20" r="11" fill="#E3B04B" fillOpacity="0.9" />
            <path d="M20 10.6a11 11 0 0 1 0 18.8 11 11 0 0 1 0-18.8z" fill="#1F2A24" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Give every guest a reason to come back.</div>
          <div style={{ marginTop: 24, fontSize: 34, color: "#4A5550" }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ background: "#B94E2A", color: "#fff", fontSize: 30, fontWeight: 700, padding: "16px 32px", borderRadius: 999 }}>Book a free guest-list audit</div>
        </div>
      </div>
    ),
    size,
  );
}
