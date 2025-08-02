import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { getRecentPosts } from "@/lib/server-actions/posts";
import { post } from "@/lib/types";
import Link from "next/link";
import { Button } from "../ui/button";

const readTime = 10;
const tag = "marine";
export default async function RecentPostsSection() {
  const recentPosts = (await getRecentPosts()) as post[];
  //   console.log("recentPosts", recentPosts);

  return (
    <section className="py-24 px-4 md:w-[90%] mx-auto">
      <div className="mb-6 text-center">
        <h2 className=" text-gray-600 text-3xl font-bold tracking-tight mb-4">
          Recent Posts
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Stay up to date with the latest insights, tutorials, and industry
          trends from our blog.
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="gap-6">
          {recentPosts.map((post) => (
            <CarouselItem
              key={post._id}
              className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4"
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="py-0 overflow-hidden h-full">
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={post.imageSrc || "/placeholder.svg"}
                      alt={post.title}
                      fill
                    />
                    {/* //Todo: Add tags here */}
                    {/* <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">
                      {tag}
                    </Badge> */}
                  </div>

                  <CardHeader>
                    <CardTitle className="mb-2 line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 mt-auto">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{`${readTime} min read`}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex top-1/2 -left-12" />
        <CarouselNext className="hidden md:flex top-1/2 -right-12" />
      </Carousel>

      <div className="text-center mt-8">
        <Link href="/blog">
          <Button variant="outline">View All Posts</Button>
        </Link>
      </div>
    </section>
  );
}
