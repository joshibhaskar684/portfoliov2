import { ImageResponse } from "next/og";
import { FACE_CROP, Portrait, loadPortrait } from "@/components/seo/portrait";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rounds the corners itself and needs an opaque image.
export default async function AppleIcon() {
  const portrait = await loadPortrait();

  return new ImageResponse(
    <Portrait src={portrait} size={size.width} crop={FACE_CROP} style={{ background: "#ffffff" }} />,
    size
  );
}
