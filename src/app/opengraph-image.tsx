import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { bpsToPercent, feeConfig } from "@/lib/vault";
import { ribbonDataUri } from "@/lib/ribbonSvg";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#faf8f4",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#8b8577",
            letterSpacing: 4,
          }}
        >
          {bpsToPercent(feeConfig.toRecipientBps).toUpperCase()} OF EVERY FEE ·
          CHILDHOOD CANCER
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 48 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 78,
                color: "#14130f",
                lineHeight: 1.02,
                letterSpacing: -2,
              }}
            >
              Every fee goes to kids with cancer.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontSize: 24,
                color: "#56524a",
              }}
            >
              {siteConfig.name} · one vault, one destination, no withdrawal
              function
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ribbonDataUri("#c1830b")} width={148} height={200} alt="" />
        </div>
      </div>
    ),
    { ...size },
  );
}
