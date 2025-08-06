import { getAllPosts } from "@/lib/server-actions/posts";
import { Plus } from "lucide-react";
import Link from "next/link";
import PostItem from "./_components/PostItem";
import { Button } from "@/components/ui/button";

export default async function PostsPage() {
  const posts = await getAllPosts();
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Posts</h1>
          <p className="text-gray-600">Manage your blog posts</p>
        </div>
        <Link href="/admin/posts/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New Post
          </Button>
        </Link>
      </div>
      <ul className="flex flex-col gap-3">
        {posts.map((post) => (
          <li key={post._id.toString()}>
            <Link href={`/admin/posts/${post.slug}`}>
              <PostItem
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
