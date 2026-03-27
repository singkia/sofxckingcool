import { ImageResponse } from "next/og";
import { Font } from "../../components/Font";

export async function GET() {
  // Generate random colors with full 6-digit hex codes
  const randomBackgroundColor = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
  const randomLogoColor = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

  return new ImageResponse(
    (
      <div
        style={{
          color: randomLogoColor,
          backgroundColor: randomBackgroundColor,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <Font text="SO FXCKING COOL" color={randomLogoColor} size={84} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              color: randomLogoColor,
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            <div>Creative Studio</div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              Jikan / Lomopic / Wordcounter / 中文简繁转换器
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: randomLogoColor,
            fontSize: 24,
            fontWeight: 600,
            opacity: 0.85,
          }}
        >
          sofxcking.cool
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
