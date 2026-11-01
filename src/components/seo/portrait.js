import { readFile } from "node:fs/promises";
import { join } from "node:path";

// public/bhaskar.jpg is a 570×713 portrait on a white background.
const SOURCE = { width: 570, height: 713 };

// Square regions of the source ({ x, y, side }) used by generated images.
export const HEADSHOT_CROP = { x: 5, y: 10, side: 560 };
export const FACE_CROP = { x: 30, y: 87, side: 440 };

export async function loadPortrait() {
  const data = await readFile(join(process.cwd(), "public/bhaskar.jpg"), "base64");
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
