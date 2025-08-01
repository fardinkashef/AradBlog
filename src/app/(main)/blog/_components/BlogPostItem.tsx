import Image from "next/image";
import { Eye, Timer } from "lucide-react";
import { formatPostDate } from "@/lib/utils/posts";

type BlogPostItemProps = {
  title: string;
  readTime: number;
  excerpt: string;
  imageSrc: string;
  createdAt: string;
};

export default function BlogPostItem({
  title,
  readTime,
  excerpt,
  imageSrc,
  createdAt,
}: BlogPostItemProps) {
  // const views = 335;
  // const likes = 25;
  // const comments = 10;
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      {/* Content Section */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{excerpt}</p>

        {/* Metadata */}
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1 w-24">
            <div className="w-3 h-3 bg-orange-400 rotate-45"></div>
            <span>{formatPostDate(createdAt)}</span>
          </div>
          {/* <div className="flex items-center gap-1 w-12">
            <Eye className="w-4 h-4" />
            <span>{views}</span>
          </div> */}
          <div className="flex items-center gap-1">
            <Timer className="w-4 h-4" />
            <span>{readTime} min read</span>
          </div>
          {/* <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{comments}</span>
          </div> */}
        </div>
      </div>

      {/* Thumbnail */}
      {imageSrc && (
        <div className="relative w-32 aspect-video rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
