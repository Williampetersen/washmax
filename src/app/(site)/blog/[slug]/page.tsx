import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/blog-article";
import { blogPosts, blogPostsBySlug } from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    return {};
  }

  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [{ url: post.coverImage.src, width: 1200, height: 675, alt: post.coverImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.description,
      images: [post.coverImage.src],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    notFound();
  }

  return <BlogArticle post={post} />;
}
