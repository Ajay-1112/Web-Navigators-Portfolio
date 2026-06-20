import type { Metadata } from "next";

import type { PortfolioData, ProjectItem } from "@/types/portfolio";

export function buildMetadata(data: PortfolioData): Metadata {
  return {
    metadataBase: new URL(data.seo.siteUrl),
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      type: "website",
      url: data.seo.siteUrl,
      images: [{ url: data.seo.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo.title,
      description: data.seo.description,
      images: [data.seo.ogImage],
    },
  };
}

export function buildProjectMetadata(
  data: PortfolioData,
  project: ProjectItem,
): Metadata {
  return {
    title: `${project.title} | ${data.personal.brandName}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `${data.seo.siteUrl}/projects/${project.slug}`,
      images: [{ url: project.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export function buildPersonJsonLd(data: PortfolioData) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.personal.name,
    jobTitle: data.personal.title,
    description: data.personal.subtitle,
    url: data.seo.siteUrl,
    email: data.personal.email,
    sameAs: [data.personal.github],
  };
}
