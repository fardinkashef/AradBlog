// import PostViewTracker from "@/components/PostViewTracker";
import { getPostBySlug } from "@/lib/server-actions/posts";
import Image from "next/image";
import { redirect } from "next/navigation";
import YouTubeVideo from "./_components/YouTubeVideo";
import FileDownloadLink from "./_components/FileDownloadLink";
import { getPostViews } from "@/lib/server-actions/views";
import { formatPostDate } from "@/lib/utils/posts";

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
    <div className="max-w-2xl mx-auto mt-6 mb-14 flex flex-col gap-2">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        {post.title}
        {postViews}
      </h1>
      <div className="flex gap-6 text-gray-700">
        <span>{post.readTime} min read</span>
        <span>{formatPostDate(post.createdAt)}</span>
      </div>
      <div className="relative aspect-video my-6">
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
