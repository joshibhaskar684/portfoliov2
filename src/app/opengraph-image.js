import { ImageResponse } from "next/og";
import { HEADSHOT_CROP, Portrait, loadPortrait } from "@/components/seo/portrait";

export const alt = "Bhaskar Joshi – Software Engineer at Quana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const skills = ["Java", "Spring Boot", "NestJS", "Next.js", "AWS", "Docker"];

export default async function Image() {
  const portrait = await loadPortrait();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #0f172a 55%, #1e3a8a 100%)",
          color: "#ededed",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, letterSpacing: -2 }}>Bhaskar Joshi</div>
          <div style={{ fontSize: 40, color: "#60a5fa", marginTop: 20 }}>Software Engineer at Quana</div>
          <div style={{ fontSize: 28, color: "#a3a3a3", marginTop: 14 }}>
            Full Stack · Backend · Cloud (AWS)
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 40 }}>
            {skills.map((skill) => (
              <div
                key={skill}
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "2px solid rgba(59, 130, 246, 0.5)",
                  background: "rgba(59, 130, 246, 0.12)",
                  color: "#93c5fd",
                  fontSize: 24,
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", padding: 6, borderRadius: 46, background: "#2563eb" }}>
          <Portrait src={portrait} size={400} crop={HEADSHOT_CROP} style={{ borderRadius: 40 }} />
        </div>
      </div>
    ),
    size
  );
}
