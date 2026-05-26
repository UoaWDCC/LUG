import { Metadata } from "next";

export default function Blog() {
  return (
    <div>
      <section>
        <h1>Blog</h1>

        <p>Placeholder Blog</p>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Blog | The Linux User Group",
  description:
    "Latest updates, tutorials, and news from The University of Auckland Linux User Group.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    types: {
      "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL}/blog/rss.xml`,
    },
  },
};
