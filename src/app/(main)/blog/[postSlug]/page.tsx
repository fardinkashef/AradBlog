import { getPostBySlug } from "@/lib/server-actions/posts";
import Image from "next/image";
import { redirect } from "next/navigation";
import YouTubeVideo from "./_components/YouTubeVideo";
import FileDownloadLink from "./_components/FileDownloadLink";
import { getPostViews } from "@/lib/server-actions/views";
import { formatPostDate } from "@/lib/utils/posts";
import { Eye } from "lucide-react";

type BlogPostPageProps = {
  params: Promise<{ postSlug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { postSlug } = await params;
  const post = await getPostBySlug(postSlug);
  if (!post) {
    return redirect("/");
  }
  const views = await getPostViews(postSlug);

  return (
    <div className="max-w-2xl mx-auto my-16 flex flex-col gap-2">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{post.title}</h1>
      <div className="flex gap-6 text-gray-700">
        <span>{post.readTime} min read</span>
        <span>{formatPostDate(post.createdAt)}</span>
        <div className="flex items-center gap-1 w-12">
          <Eye className="w-5 h-5" />
          <span>{views}</span>
        </div>
      </div>
      {post.imageSrc && (
        <div className="relative aspect-video my-6">
          <Image src={post.imageSrc} fill alt="Post image" />
        </div>
      )}

      <div
        className="my-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
      {post.attachments.length > 0 && (
        <div className="flex flex-wrap gap-4 my-8">
          {post.attachments.map((attachment) => (
            <FileDownloadLink fileName={attachment} key={attachment} />
          ))}
        </div>
      )}
      {post.youtubeVideoId && <YouTubeVideo videoId={post.youtubeVideoId} />}
    </div>
  );
}
