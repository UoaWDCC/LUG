import getBlogPosts from "@/features/blog/getBlogPosts";
export async function GET() {
  const blogposts = await getBlogPosts();
  return Response.json(blogposts);
}
