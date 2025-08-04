"use client";
import { Button } from "@/components/ui/button";
import { updatePostPublishStatus } from "@/lib/server-actions/posts";
import { CircleSlash2, SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function PublishButton({
  postSlug,
  isPublished,
}: {
  postSlug: string;
  isPublished: boolean;
}) {
  const router = useRouter();
  const handlePublishPost = async () => {
    await updatePostPublishStatus(postSlug, true);
    toast.success("Post published successfully");
    router.refresh();
  };
  const handleUnublishPost = async () => {
    await updatePostPublishStatus(postSlug, false);
    toast.success("Post unpublished successfully");
    router.refresh();
  };
  return (
    <>
      {isPublished ? (
        <Button variant="outline" onClick={handleUnublishPost}>
          <CircleSlash2 className="w-4 h-4 mr-2" />
          Unpublish
        </Button>
      ) : (
        <Button variant="success" onClick={handlePublishPost}>
          <SendHorizontal className="w-4 h-4 mr-2" />
          Publish
        </Button>
      )}
    </>
  );
}
