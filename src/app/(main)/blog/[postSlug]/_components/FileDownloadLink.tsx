import { Card, CardContent } from "@/components/ui/card";
import { File } from "lucide-react";

export default function FileDownloadLink({ fileName }: { fileName: string }) {
  return (
    <div>
      <a href={`/uploads/files/posts/${fileName}`} download>
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex-shrink-0">
              <File className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium text-gray-900 truncate"
                title={fileName}
              >
                {fileName}
              </p>
            </div>
          </CardContent>
        </Card>
      </a>
    </div>
  );
}
