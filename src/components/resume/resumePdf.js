import { PDFDocument, PDFString, StandardFonts, rgb } from "pdf-lib";
import { SITE_URL } from "@/components/data/siteData";

// Draws a resume parsed by ./resume.js as a PDF that matches the original
// Word resume: A4, Times, 15 mm margins, 1.5 line spacing, ruled section
// headings and arrow bullets. All measurements are in points and were taken
// from that original file.
const PAGE_WIDTH = 595.3;
const PAGE_HEIGHT = 841.9;
const MARGIN = 42.5;
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;
const PAGE_BOTTOM = PAGE_HEIGHT - MARGIN;

// A line's box is its largest font size times the spacing, with the baseline
// this far down the box.
const LINE_SPACING = 1.725; // 1.5 lines
const SINGLE_SPACING = 1.157;
const BASELINE = 0.545;

const BULLET_INDENT = 21;
const RULE_ABOVE_HEADING = 13.5;
const BLACK = rgb(0, 0, 0);

// `size` is for regular text and `boldSize` for **bold** text in that block.
const STYLES = {
  name: { size: 18, boldSize: 18 },
  contact: { size: 11.05, boldSize: 12 },
  heading: { size: 14.05, boldSize: 14.05, before: 0.8 },
  entry: { size: 11.05, boldSize: 11.05 },
  line: { size: 9.95, boldSize: 11.05 },
  paragraph: { size: 9.95, boldSize: 9.95, spacing: SINGLE_SPACING, justify: true, before: 3.2, after: 13.5 },
  bullet: { size: 9.95, boldSize: 9.95, justify: true, indent: BULLET_INDENT },
};

// The standard PDF fonts only cover Windows-1252, so anything outside it is
// swapped for a close match or dropped.
const FALLBACKS = { "→": "->", "←": "<-", "−": "-", "‐": "-", "‑": "-", "\t": " " };

function makeSanitizer(font) {
  const supported = new Set(font.getCharacterSet());
  const warned = new Set();

  return (text) =>
    Array.from(text, (char) => {
      if (supported.has(char.codePointAt(0))) return char;
      if (char in FALLBACKS) return FALLBACKS[char];
      if (!warned.has(char)) {
        warned.add(char);
        console.warn(`resume.md: "${char}" can't be printed in the PDF and was left out.`);
      }
      return "";
    }).join("");
}

// pdf-lib's widthOfTextAtSize applies kerning, but drawText doesn't, so text
// is measured one character at a time to match what actually gets drawn.
const measure = (font, text, size) =>
  Array.from(text).reduce((width, char) => width + font.widthOfTextAtSize(char, size), 0);

// Splits runs into words that know their own width and the width of the
// space after them. One word can mix styles, like "**GitHub**:".
function toWords(runs, style, fonts) {
  const words = [];
  let word = null;

  for (const run of runs) {
    const font = fonts.pick(run);
    const size = run.bold ? style.boldSize : style.size;

    for (const part of fonts.sanitize(run.text).split(/( +)/)) {
      if (!part) continue;
      if (part.startsWith(" ")) {
        if (word) word.space = measure(font, " ", size);
        word = null;
        continue;
      }
      if (!word) {
        word = { pieces: [], width: 0, space: 0 };
        words.push(word);
      }
      const width = measure(font, part, size);
      word.pieces.push({ text: part, font, size, width, link: run.link });
      word.width += width;
    }
  }

  return words;
}

function wrap(words, maxWidth) {
  const lines = [];
  let line = [];
  let width = 0;

  for (const word of words) {
    const gap = line.length ? line[line.length - 1].space : 0;
    if (line.length && width + gap + word.width > maxWidth) {
      lines.push(line);
      line = [];
      width = 0;
    }
    width += (line.length ? line[line.length - 1].space : 0) + word.width;
    line.push(word);
  }

  if (line.length) lines.push(line);
  return lines;
}

// pdf-lib measures y from the bottom of the page; the layout works top-down.
const flip = (y) => PAGE_HEIGHT - y;

function drawWords(pdf, page, words, { x, baseline, width, justify }) {
  const natural = words.reduce((sum, word, i) => sum + word.width + (i < words.length - 1 ? word.space : 0), 0);
  const stretch = justify && words.length > 1 ? (width - natural) / (words.length - 1) : 0;
  const links = [];
  let cursor = x;

  words.forEach((word, i) => {
    word.pieces.forEach((piece, j) => {
      // Every word is placed on its own, but still ends in a real space so
      // copied text and ATS parsers see separate words.
      const endsWord = j === word.pieces.length - 1 && i < words.length - 1;
      const text = endsWord ? `${piece.text} ` : piece.text;
      page.drawText(text, { x: cursor, y: flip(baseline), size: piece.size, font: piece.font, color: BLACK });

      const last = links[links.length - 1];
      if (piece.link && last?.url === piece.link) last.end = cursor + piece.width;
      else if (piece.link) links.push({ url: piece.link, start: cursor, end: cursor + piece.width, size: piece.size });
      else links.push({});

      cursor += piece.width;
    });
    if (i < words.length - 1) cursor += word.space + stretch;
  });

  for (const { url, start, end, size } of links) {
    if (!url) continue;
    const annotation = pdf.context.obj({
      Type: "Annot",
      Subtype: "Link",
      Rect: [start, flip(baseline + size * 0.25), end, flip(baseline - size * 0.85)],
      Border: [0, 0, 0],
      A: { Type: "Action", S: "URI", URI: PDFString.of(url) },
    });
    page.node.addAnnot(pdf.context.register(annotation));
  }
}

// The original's arrowhead bullet (Wingdings ➢): an outlined upper half and a
// filled lower half, drawn with its tip on the text's x-height.
function drawBullet(page, x, baseline, size) {
  const scale = size / 9.95;
  const options = { x, y: flip(baseline), scale };
  page.drawSvgPath("M 0.95 -7.1 L 7 -3.6 L 3.05 -3.6 Z", { ...options, borderColor: BLACK, borderWidth: 0.3 / scale });
  page.drawSvgPath("M 3.05 -3.6 L 7 -3.6 L 0.9 0 Z", { ...options, color: BLACK });
}

// Turns one block of text into line boxes:
// { height, before, after, keepWithNext, draw(pdf, page, baseline) }
function textBoxes(runs, style, fonts, { keepWithNext = false, decorate } = {}) {
  const indent = style.indent ?? 0;
  const width = CONTENT_WIDTH - indent;
  const lines = wrap(toWords(runs, style, fonts), width);

  return lines.map((words, i) => {
    const isFirst = i === 0;
    const isLast = i === lines.length - 1;
    const largest = Math.max(...words.flatMap((word) => word.pieces.map((piece) => piece.size)));

    return {
      height: largest * (style.spacing ?? LINE_SPACING),
      before: isFirst ? (style.before ?? 0) : 0,
      after: isLast ? (style.after ?? 0) : 0,
      keepWithNext,
      draw(pdf, page, baseline) {
        if (isFirst) decorate?.(page, baseline);
        drawWords(pdf, page, words, { x: MARGIN + indent, baseline, width, justify: style.justify && !isLast });
      },
    };
  });
}

function layout(resume, fonts) {
  const boxes = [
    ...textBoxes([{ text: resume.name, bold: true }], STYLES.name, fonts),
    ...resume.contact.flatMap((runs) => textBoxes(runs, STYLES.contact, fonts)),
  ];

  for (const section of resume.sections) {
    const rule = (page, baseline) =>
      page.drawLine({
        start: { x: MARGIN, y: flip(baseline - RULE_ABOVE_HEADING) },
        end: { x: PAGE_WIDTH - MARGIN, y: flip(baseline - RULE_ABOVE_HEADING) },
        thickness: 0.5,
        color: BLACK,
      });
    boxes.push(...textBoxes([{ text: section.title, bold: true }], STYLES.heading, fonts, { keepWithNext: true, decorate: rule }));

    // An entry's title and the lines under it (dates, stack, links) stay on
    // the same page as its first bullet.
    let inEntryHeader = false;

    for (const block of section.blocks) {
      if (block.type === "entry") inEntryHeader = true;
      else if (block.type !== "line") inEntryHeader = false;

      const bullet = (page, baseline) => drawBullet(page, MARGIN, baseline, STYLES.bullet.size);
      boxes.push(
        ...textBoxes(block.runs, STYLES[block.type], fonts, {
          keepWithNext: inEntryHeader,
          decorate: block.type === "bullet" ? bullet : undefined,
        }),
      );
    }
  }

  return boxes;
}

// Height a box needs on the current page, including every following box it
// must stay with.
function heightWithFollowers(boxes, index) {
  let height = 0;
  for (let i = index; i < boxes.length; i++) {
    height += boxes[i].before + boxes[i].height;
    if (!boxes[i].keepWithNext) break;
    height += boxes[i].after;
  }
  return height;
}

export async function renderResumePdf(resume) {
  const pdf = await PDFDocument.create();
  const [regular, bold, italic, boldItalic] = await Promise.all([
    pdf.embedFont(StandardFonts.TimesRoman),
    pdf.embedFont(StandardFonts.TimesRomanBold),
    pdf.embedFont(StandardFonts.TimesRomanItalic),
    pdf.embedFont(StandardFonts.TimesRomanBoldItalic),
  ]);
  const fonts = {
    pick: ({ bold: isBold, italic: isItalic }) =>
      isBold ? (isItalic ? boldItalic : bold) : isItalic ? italic : regular,
    sanitize: makeSanitizer(regular),
  };

  pdf.setTitle(`${resume.name} Resume`);
  pdf.setAuthor(resume.name);
  pdf.setSubject(`Resume of ${resume.name}`);
  pdf.setCreator(SITE_URL);
  pdf.setProducer(SITE_URL);

  const boxes = layout(resume, fonts);
  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = MARGIN;
  let atPageTop = true;

  boxes.forEach((box, i) => {
    if (!atPageTop && y + heightWithFollowers(boxes, i) > PAGE_BOTTOM) {
      page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      y = MARGIN;
      atPageTop = true;
    }

    const top = atPageTop ? y : y + box.before;
    box.draw(pdf, page, top + box.height * BASELINE);
    y = top + box.height + box.after;
    atPageTop = false;
  });

  return pdf.save();
}
