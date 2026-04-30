import { Feed } from "feed";
import { getMockBlogItems, BlogItem } from "@/lib/mock/news";

const siteURL: string = process.env.NEXT_PUBLIC_SITE_URL || "";

export async function GET() {
  const blogItems: BlogItem[] = await getMockBlogItems();
  const feed = new Feed({
    title: "The Linux User Group Website",
    description:
      "Latest updates from The University of Auckland Linux User Group",
    id: siteURL,
    link: siteURL,
    language: "en-NZ",
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  });

  blogItems.forEach((item) => {
    const url = `${siteURL}/blog/${item.slug}`;
    feed.addItem({
      title: item.title,
      id: url,
      link: url,
      description: item.description,
      date: new Date(item.publishedAt),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
