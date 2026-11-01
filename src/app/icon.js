import { ImageResponse } from "next/og";
import { FACE_CROP, Portrait, loadPortrait } from "@/components/seo/portrait";

// Square favicon (Google Search requires a square icon, a multiple of 48px).
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default async function Icon() {
  const portrait = await loadPortrait();

  return new ImageResponse(
    <Portrait src={portrait} size={size.width} crop={FACE_CROP} style={{ borderRadius: size.width / 2 }} />,
    size
  );
}
