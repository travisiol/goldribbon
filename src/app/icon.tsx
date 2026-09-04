import { ImageResponse } from "next/og";
import { ribbonDataUri } from "@/lib/ribbonSvg";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** The ribbon alone on paper. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf8f4",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ribbonDataUri("#c1830b")} width={34} height={46} alt="" />
      </div>
    ),
    { ...size },
  );
}
