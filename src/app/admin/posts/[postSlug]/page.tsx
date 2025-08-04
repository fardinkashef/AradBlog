import { getPostBySlug } from "@/lib/server-actions/posts";
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
  params: Promise<{ postSlug: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { postSlug } = await params;
  const post = await getPostBySlug(postSlug);

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
          <DeleteButton postSlug={postSlug} />
          <Link
            href={`/admin/posts/${postSlug}/preview`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </Link>
          <PublishButton postSlug={postSlug} isPublished={post.isPublished} />
        </div>
      </div>
      <TitleForm initialTitle={post.title} postSlug={postSlug} />
      <ExcerptForm initialExcerpt={post.excerpt || ""} postSlug={postSlug} />
      <ImageUpload imageSrc={post.imageSrc} postSlug={postSlug} />
      <FileUpload attachments={post.attachments} postSlug={postSlug} />
      <ContentForm initialContent={post.content || ""} postSlug={postSlug} />
      <YouTubeVideoInput
        youtubeVideoId={post.youtubeVideoId}
        postSlug={postSlug}
      />
    </div>
  );
}
