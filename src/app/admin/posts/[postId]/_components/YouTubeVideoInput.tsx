"use client";

import { Button } from "@/components/ui/button";
import {
  deletePostVideo,
  updatePostYouTubeVideoId,
} from "@/lib/server-actions/posts";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { getYouTubeVideoId } from "@/lib/utils/youtube";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type YouTubeVideoInputProps = {
  youtubeVideoId?: string;
  postId: string;
};

export default function YouTubeVideoInput({
  youtubeVideoId,
  postId,
}: YouTubeVideoInputProps) {
  const [videoId, setVideoId] = useState<string | null>(null); // YouTube video id generated from video url admin provided.
  const [error, setError] = useState("");

  const handleCancelVideo = () => {
    setVideoId(null);
  };
  const handleSetVideoId = (videoUrl: string) => {
    const extractedVideoId = getYouTubeVideoId(videoUrl);
    setVideoId(extractedVideoId);
  };
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="font-medium flex items-center justify-start">
        <CardTitle className="text-2xl">YouTube Video</CardTitle>
      </CardHeader>
      <CardContent>
        {youtubeVideoId ? (
          <VideoView youtubeVideoId={youtubeVideoId} postId={postId} />
        ) : videoId ? (
          <VideoPreview
            videoId={videoId}
            postId={postId}
            handleCancelVideo={handleCancelVideo}
          />
        ) : (
          <VideoUrlInput handleSetVideoId={handleSetVideoId} />
        )}
        {/* Display Errors */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function VideoView({
  youtubeVideoId,
  postId,
}: {
  youtubeVideoId: string;
  postId: string;
}) {
  // const [src, setSrc] = useState<string>();

  const router = useRouter();
  const handleRemoveVideo = async () => {
    await deletePostVideo(postId);
    router.refresh();
  };

  // Why I added this useEffect? The 'browser' would cach the image not Next.js because with useRouter.refresh method, Next.js would get fresh data. So I have to change the image src a little bit using search params and Date object, but this leads to a Hydration Error. The solution is to use a useEffect hook like this.
  // useEffect(() => {
  //   setSrc(`${imageSrc}?v=${Date.now()}`);
  // }, []);
  return (
    <div className="bg-gray-50 rounded-lg">
      <LiteYouTubeEmbed
        id={youtubeVideoId}
        title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
        cookie={true}
      />
      <div className="flex justify-end mt-2">
        <Button onClick={handleRemoveVideo}>Remove Video</Button>
      </div>
    </div>
  );
}

type VideoPreviewProps = {
  videoId: string;
  postId: string;
  handleCancelVideo: () => void;
};
function VideoPreview({
  videoId,
  postId,
  handleCancelVideo,
}: VideoPreviewProps) {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSaving(true);
    await updatePostYouTubeVideoId(postId, videoId);
    toast.success("YouTube video updated successfully");
    setIsSaving(false);
    router.refresh();
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Preview</h3>
        <button
          type="button"
          onClick={handleCancelVideo}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      <LiteYouTubeEmbed
        id={videoId}
        title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
        cookie={true}
      />

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className={`mt-3 px-4 py-2 rounded-md text-white font-medium ${
            isSaving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

type VideoUrlInputProps = {
  // setError: React.Dispatch<React.SetStateAction<string>>;
  handleSetVideoId: (videoUrl: string) => void;
};
const formSchema = z.object({
  url: z.string().min(1, {
    message: "YouTube video URL is required",
  }),
});

function VideoUrlInput({ handleSetVideoId }: VideoUrlInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const submit = async (values: z.infer<typeof formSchema>) => {
    handleSetVideoId(values.url);
  };

  return (
    <div className="bg-white rounded-md p-4 dark:bg-gray-800">
      <div className="font-medium flex items-center justify-between">
        <span className="text-xl">Add URL</span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="space-y-4 mt-4 dark:text-gray-300"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'https://www.youtube.com/watch?v=2JcHMhtH6_s'"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button disabled={!isValid || isSubmitting} type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
