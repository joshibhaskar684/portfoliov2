import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteData } from "@/components/data/siteData";

// The portrait in public/ is 570×713 on a white background.
const SOURCE = { width: 570, height: 713 };

// Square region of the source ({ x, y, side }) used by the Open Graph image.
// Site icons are static files built by scripts/generate-icons.mjs.
export const HEADSHOT_CROP = { x: 5, y: 10, side: 560 };

export async function loadPortrait() {
  const data = await readFile(join(process.cwd(), "public", siteData.image), "base64");
  return `data:image/jpeg;base64,${data}`;
}

// ImageResponse markup that scales `crop` of the portrait to fill a
// `size`×`size` box. Drawn as a background so `borderRadius` clips it.
export function Portrait({ src, size, crop, style }) {
  const scale = size / crop.side;

  return (
    <div
      style={{
        display: "flex",
        width: size,
        height: size,
        backgroundImage: `url(${src})`,
        backgroundSize: `${SOURCE.width * scale}px ${SOURCE.height * scale}px`,
        backgroundPosition: `${-crop.x * scale}px ${-crop.y * scale}px`,
        backgroundRepeat: "no-repeat",
        ...style,
      }}
    />
  );
}
