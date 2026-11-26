import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/data/caseStudies";
import { Navbar } from "@/components/Navbar";
import { SideChrome } from "@/components/SideChrome";
import { SmoothScrollController } from "@/components/SmoothScrollController";
import { CaseStudyView } from "@/components/CaseStudyView";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) {
    return { title: "Project Not Found — Rashmi Pathak" };
  }
  return {
    title: `${study.name} (${study.index}) — Rashmi Pathak`,
    description: study.summary,
    openGraph: {
      title: `${study.name} — ${study.subtitle}`,
      description: study.summary,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <SmoothScrollController />
      <Navbar />
      <SideChrome />
      <main id="main-content" tabIndex={-1}>
        <CaseStudyView study={study} />
      </main>
    </>
  );
}
