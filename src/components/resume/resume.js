import fs from "node:fs";
import path from "node:path";

// resume.md in this folder is the single source of the downloadable resume.
// It is parsed into the shape below and drawn by ./resumePdf.js:
//
// {
//   name: "Bhaskar Joshi",
//   contact: [runs, ...],                 // one entry per contact line
//   sections: [{ title, blocks: [...] }], // one per `## Heading`
// }
//
// A block is { type, runs } where type is one of:
//   "entry"     `### Title` (job, project, school)
//   "bullet"    `- text`
//   "paragraph" plain text straight under a heading that doesn't open with
//               bold text, like the summary; set as justified prose
//   "line"      any other line (dates, skill rows, tech stacks, links)
//
// and runs are the inline pieces of the text: { text, bold, italic, link }.
const RESUME_FILE = path.join(process.cwd(), "src/components/resume/resume.md");

// **bold**, *italic*, [label](url), bare URLs, and email addresses.
const INLINE_PATTERN =
  /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s]*[^\s.,;:!?)])|([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

function parseInline(text, style = {}) {
  const runs = [];
  let last = 0;

  for (const match of text.matchAll(INLINE_PATTERN)) {
    const [whole, bold, italic, label, href, url, email] = match;
    if (match.index > last) runs.push({ ...style, text: text.slice(last, match.index) });

    if (bold !== undefined) runs.push(...parseInline(bold, { ...style, bold: true }));
    else if (italic !== undefined) runs.push(...parseInline(italic, { ...style, italic: true }));
    else if (label !== undefined) runs.push(...parseInline(label, { ...style, link: href }));
    else if (url !== undefined) runs.push({ ...style, text: url, link: style.link ?? url });
    else runs.push({ ...style, text: email, link: style.link ?? `mailto:${email}` });

    last = match.index + whole.length;
  }

  if (last < text.length) runs.push({ ...style, text: text.slice(last) });
  return runs;
}

export function parseResume(markdown) {
  const resume = { name: "", contact: [], sections: [] };
  let section = null;

  const lines = markdown.replace(/<!--[\s\S]*?-->/g, "").split(/\r?\n/);

  for (const line of lines.map((l) => l.trim()).filter(Boolean)) {
    let match;

    if ((match = line.match(/^#\s+(.+)$/))) {
      resume.name = match[1];
    } else if ((match = line.match(/^##\s+(.+)$/))) {
      section = { title: match[1], blocks: [] };
      resume.sections.push(section);
    } else if (!section) {
      resume.contact.push(parseInline(line));
    } else if ((match = line.match(/^###\s+(.+)$/))) {
      section.blocks.push({ type: "entry", runs: parseInline(match[1], { bold: true }) });
    } else if ((match = line.match(/^[-*+]\s+(.+)$/))) {
      section.blocks.push({ type: "bullet", runs: parseInline(match[1]) });
    } else {
      const runs = parseInline(line);
      const underHeading = !section.blocks.some((block) => block.type === "entry");
      const isProse = underHeading && !runs[0]?.bold;
      section.blocks.push({ type: isProse ? "paragraph" : "line", runs });
    }
  }

  if (!resume.name) {
    throw new Error("resume.md needs a `# Your Name` line at the top.");
  }

  return resume;
}

export function getResume() {
  return parseResume(fs.readFileSync(RESUME_FILE, "utf8"));
}

// "Bhaskar Joshi" -> "Bhaskar-Joshi-Resume.pdf"
export function resumeFileName(name) {
  const slug = name
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `${slug || "Resume"}-Resume.pdf`;
}
