import { Card, CardContent } from "@/components/ui/card";
import { Download, File } from "lucide-react";

type FileDownloadLinkProps = {
  postSlug: string;
  fileName: string;
};

export default function FileDownloadLink({
  postSlug,
  fileName,
}: FileDownloadLinkProps) {
  return (
    <a href={`/uploads/files/posts/${postSlug}/${fileName}`} download>
      <Card className="w-fit">
        <CardContent className="flex items-center gap-5">
          <div className="flex-shrink-0">
            <File className="h-4 w-4 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-medium text-gray-900 truncate"
              title={fileName}
            >
              {fileName}
            </p>
          </div>
          <div className="flex-shrink-0">
            <Download className="h-4 w-4 text-gray-500" />
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
