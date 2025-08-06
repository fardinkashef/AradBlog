"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { createPost } from "@/lib/server-actions/posts";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

type FormFields = z.infer<typeof schema>;

export default function CreatePostForm() {
  const form = useForm<FormFields>({
    defaultValues: { title: "" },
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const { isSubmitting, isValid } = form.formState;

  const submit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await createPost(data.title);
      toast.success("Post created");
      router.push(`/admin/posts/${response.newPostSlug}`);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="grow max-w-2xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Title your post</h1>
        <p className="text-sm text-slate-600">
          What would you like to title your post. Don&apos;t worry, you can
          change this later
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'marine stuff'"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormDescription>
                    What title is suitable here?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
