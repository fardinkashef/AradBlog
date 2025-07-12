import { getPostById } from "@/lib/server-actions/posts";
import Image from "next/image";
import { redirect } from "next/navigation";
import YouTubeVideo from "./_components/YouTubeVideo";

type PostPreviewPageProps = {
  params: Promise<{ postId: string }>;
};

export default async function PostPreviewPage({
  params,
}: PostPreviewPageProps) {
  const { postId } = await params;
  const post = await getPostById(postId);

  if (!post) {
    return redirect("/");
  }
  return (
    <div className="max-w-2xl mx-auto my-6 flex flex-col gap-2">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{post.title}</h1>
      <div className="relative aspect-video">
        <Image src={post.imageSrc} fill alt="Post image" />
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
      {post.youtubeVideoId && <YouTubeVideo videoId={post.youtubeVideoId} />}
    </div>
  );
}
