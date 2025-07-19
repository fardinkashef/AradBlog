// import PostViewTracker from "@/components/PostViewTracker";
import { getPostBySlug } from "@/lib/server-actions/posts";
import Image from "next/image";
import { redirect } from "next/navigation";
import YouTubeVideo from "./_components/YouTubeVideo";
import FileDownloadLink from "./_components/FileDownloadLink";
import { getPostViews } from "@/lib/server-actions/views";

type BlogPostPageProps = {
  params: Promise<{ postSlug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { postSlug } = await params;
  const post = await getPostBySlug(postSlug);
  if (!post) {
    return redirect("/");
  }
  const postViews = await getPostViews(postSlug);
  return (
    <div className="max-w-2xl mx-auto my-6 flex flex-col gap-2">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        {post.title}
        {postViews}
      </h1>
      <div className="relative aspect-video">
        <Image src={post.imageSrc} fill alt="Post image" />
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
      {/* {post.attachments.length > 0 && (
        <FileDownloadLink fileName={post.fileName} />
      )} */}
      {post.youtubeVideoId && <YouTubeVideo videoId={post.youtubeVideoId} />}
      {/* <PostViewTracker postId={postId} /> */}
    </div>
  );
}
