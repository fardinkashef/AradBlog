"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { updatePostExcerpt } from "@/lib/server-actions/posts";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExcerptFormProps {
  initialExcerpt: string;
  postId: string;
}

const formSchema = z.object({
  excerpt: z.string().min(1, {
    message: "excerpt is required",
  }),
});

export default function ExcerptForm({
  initialExcerpt,
  postId,
}: ExcerptFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { excerpt: initialExcerpt },
  });

  const { isSubmitting, isValid } = form.formState;

  const submit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updatePostExcerpt(postId, values.excerpt);
      toast.success("Post excerpt updated");
      toggleEdit();
      router.refresh();
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(`Server responded with ${error.response.status} error`);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="font-medium flex items-center justify-between">
        <CardTitle className="text-2xl">Excerpt</CardTitle>
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
        {!isEditing && (
          <p className="text-sm dark:text-gray-300">{initialExcerpt}</p>
        )}
        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="dark:text-gray-300"
            >
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="e.g. 'This is the excerpt'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end mt-2">
                <Button disabled={!isValid || isSubmitting} type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
