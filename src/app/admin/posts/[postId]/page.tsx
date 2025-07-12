import { getPostById } from "@/lib/server-actions/posts";
import { TitleForm } from "./_components/TitleForm";
import { redirect } from "next/navigation";
import ImageUpload from "./_components/ImageUpload";
import ContentForm from "./_components/ContentForm";
import ExcerptForm from "./_components/ExcerptForm";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PublishButton from "./_components/PublishButton";
import DeleteButton from "./_components/DeleteButton";
import YouTubeVideoInput from "./_components/YouTubeVideoInput";
import FileUpload from "./_components/FileUpload";

type PostPageProps = {
  params: Promise<{ postId: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = await params;
  const post = await getPostById(postId);

  if (!post) {
    return redirect("/");
  }
  return (
    <div className="w-full max-w-2xl mx-auto my-3 flex flex-col gap-6">
      <div className="flex items-center justify-between p-3 mb-8 ">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Manage your post
        </h1>
        <div className="flex gap-3">
          <DeleteButton postId={postId} />
          <Link
            href={`/admin/posts/${postId}/preview`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </Link>
          <PublishButton postId={postId} isPublished={post.isPublished} />
        </div>
      </div>
      <TitleForm initialTitle={post.title} postId={postId} />
      <ExcerptForm initialExcerpt={post.excerpt || ""} postId={postId} />
      <ImageUpload imageSrc={post.imageSrc} postId={postId} />
      <FileUpload attachments={post.attachments} postId={postId} />
      <ContentForm initialContent={post.content || ""} postId={postId} />
      <YouTubeVideoInput youtubeVideoId={post.youtubeVideoId} postId={postId} />
    </div>
  );
}
