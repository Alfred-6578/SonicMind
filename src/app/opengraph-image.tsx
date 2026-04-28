import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SonicMind — Ask anything";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#fafaf9",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#0d9488",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "999px",
              background: "#0d9488",
            }}
          />
          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              color: "#0c0a09",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            SonicMind
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: "36px",
            color: "#78716c",
            maxWidth: "900px",
            lineHeight: 1.3,
          }}
        >
          Ask anything. AI-powered answers from your knowledge base.
        </div>
      </div>
    ),
    size,
  );
}
