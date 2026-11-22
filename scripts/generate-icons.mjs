// Builds every site icon from the portrait, so browser tabs, bookmarks, home
// screens and search results all show the same image. Run `npm run icons`
// after replacing the portrait or changing CROP.
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const SOURCE = "public/bhaskar-joshi.jpg";

// Square region of the 570×713 portrait: its full width, from the top.
const CROP = { left: 0, top: 0, width: 570, height: 570 };

const OUTPUTS = [
  // Tabs and bookmarks; also what browsers and crawlers fetch by default.
  { file: "src/app/favicon.ico", sizes: [16, 32, 48] },
  // Search result favicon (Google wants a square multiple of 48px).
  { file: "src/app/icon.png", sizes: [192] },
  // iOS home screen.
  { file: "src/app/apple-icon.png", sizes: [180] },
  // Large icon listed in the web app manifest.
  { file: "public/icon-512.png", sizes: [512] },
];

function render(size) {
  return sharp(SOURCE)
    .extract(CROP)
    .resize(size, size)
    .flatten({ background: "#ffffff" })
    // Opaque, but stored as RGBA: .ico readers (Next.js included) expect it.
    .ensureAlpha()
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// An .ico file is a directory of images. Every current browser reads PNG
// entries, which keep the file small.
function toIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = header.length + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette size
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map(({ data }) => data)]);
}

for (const { file, sizes } of OUTPUTS) {
  const images = await Promise.all(sizes.map(async (size) => ({ size, data: await render(size) })));
  await writeFile(file, file.endsWith(".ico") ? toIco(images) : images[0].data);
  console.log(`${file} (${sizes.map((size) => `${size}×${size}`).join(", ")})`);
}
