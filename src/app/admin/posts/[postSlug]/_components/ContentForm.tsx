"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updatePostContent } from "@/lib/server-actions/posts";
import { Pencil } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import toast from "react-hot-toast";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
// https://dev.to/a7u/reactquill-with-nextjs-478b
import "react-quill-new/dist/quill.snow.css";

export default function ContentForm({
  initialContent,
  postSlug,
}: {
  initialContent: string;
  postSlug: string;
}) {
  const [value, setValue] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const handleSaveContent = async () => {
    await updatePostContent(postSlug, value);
    toast.success("Content updated sucessfully");
    toggleEdit();
  };
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="font-medium flex items-center justify-between">
        <CardTitle className="text-2xl">Content</CardTitle>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil />
              Edit
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div>
            <ReactQuill
              theme="snow"
              placeholder="Write something..."
              className="h-72 mb-12"
              value={value}
              onChange={setValue}
            />
            <div className="flex justify-end">
              <Button onClick={handleSaveContent}>Save Changes</Button>
            </div>
          </div>
        ) : (
          <div
            className="p-3 max-w-2xl mx-auto w-full post-content"
            dangerouslySetInnerHTML={{ __html: value }}
          ></div>
        )}
      </CardContent>
    </Card>
  );
}
