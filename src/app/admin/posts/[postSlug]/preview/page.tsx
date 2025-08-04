import { getPostBySlug } from "@/lib/server-actions/posts";
import Image from "next/image";
import { redirect } from "next/navigation";
import YouTubeVideo from "./_components/YouTubeVideo";
import { formatPostDate } from "@/lib/utils/posts";

type PostPreviewPageProps = {
  params: Promise<{ postSlug: string }>;
};

export default async function PostPreviewPage({
  params,
}: PostPreviewPageProps) {
  const { postSlug } = await params;
  const post = await getPostBySlug(postSlug);

  if (!post) {
    return redirect("/");
  }
  // const views = await getPostViews(postSlug);

  return (
    <div className="max-w-2xl mx-auto my-6 flex flex-col gap-2">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{post.title}</h1>
      <div className="flex gap-6 text-gray-700">
        {post.readTime && <span>{post.readTime} min read</span>}
        <span>{formatPostDate(post.createdAt)}</span>
        {/* <div className="flex items-center gap-1 w-12">
          <Eye className="w-5 h-5" />
          <span>{views}</span>
        </div> */}
      </div>
      {post.imageSrc && (
        <div className="relative aspect-video">
          <Image src={post.imageSrc} fill alt="Post image" />
        </div>
      )}
      <div
        className="py-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
      {post.youtubeVideoId && <YouTubeVideo videoId={post.youtubeVideoId} />}
    </div>
  );
}
