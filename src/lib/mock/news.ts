export type BlogItem = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
};

export async function getNewsItems(): Promise<BlogItem[]> {
  return [
    {
      title: "Example News Item",
      slug: "example-news-item",
      description: "This is an example news item.",
      publishedAt: "2026-04-30",
    },
    {
      title: "Another Update",
      slug: "another-update",
      description: "This is another update.",
      publishedAt: "2026-04-28",
    },
  ];
}
