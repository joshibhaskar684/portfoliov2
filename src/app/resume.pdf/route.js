import { getResume, resumeFileName } from "@/components/resume/resume";
import { renderResumePdf } from "@/components/resume/resumePdf";

// /resume.pdf: the "Download Resume" file, generated from
// src/components/resume/resume.md. Built once per deploy, so editing the
// Markdown and redeploying is all it takes to update it.
export const dynamic = "force-static";

export async function GET() {
  const resume = getResume();
  const pdf = await renderResumePdf(resume);

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${resumeFileName(resume.name)}"`,
    },
  });
}
