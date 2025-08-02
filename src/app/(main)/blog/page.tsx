import { getPublishedPosts } from "@/lib/server-actions/posts";
import Link from "next/link";
import BlogPostItem from "./_components/BlogPostItem";

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return (
    <div className="container mx-auto mt-12 max-w-3xl p-5 min-h-screen">
      <ul className="flex flex-col gap-3">
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/blog/${post.slug}`}>
              <BlogPostItem
                title={post.title}
                readTime={post.readTime}
                excerpt={post.excerpt}
                imageSrc={post.imageSrc}
                createdAt={post.createdAt.toDateString()}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
