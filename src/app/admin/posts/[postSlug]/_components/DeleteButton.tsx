"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteButton({ postId }: { postId: string }) {
  const router = useRouter();
  const handleDeletePost = async () => {
    try {
      const res = await fetch("/api/posts/delete-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      // await fetch("/api/posts/test", {
      //   method: "POST",
      // });
      if (res.ok) {
        toast.success("Post deleted successfully");
        router.push("/admin/posts");
        // *This router.refresh() will be applied to the new url of "/admin/posts"
        router.refresh();
      }
    } catch (error) {
      console.log("This error happend while deleting the post:", error);
      toast.error("An error happened while deleting the post");
    }
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-red-600">
            <X className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete This Post?</DialogTitle>
            <DialogDescription>
              Make sure you want to delete this post.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              variant="destructive"
              onClick={handleDeletePost}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
