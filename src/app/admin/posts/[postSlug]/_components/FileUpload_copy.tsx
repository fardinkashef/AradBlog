"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Upload, X, File } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";

type FileUploadProps = {
  // The src of the image uploaded previously which we can delete and replace with a new one 👇:
  fileName?: string;
  // The name that will be used to store the image, extension not included, e.g. postId = "book" or "145468523"  👇:
  postId: string;
};

export default function FileUpload({ fileName, postId }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  return (
    <div className="w-full max-w-2xl rounded-lg bg-white p-4">
      <div className="text-2xl font-medium mb-2">File</div>

      {fileName ? (
        <FileView fileName={fileName} postId={postId} />
      ) : file ? (
        <FilePreview postId={postId} file={file} setFile={setFile} />
      ) : (
        <FileInputAndDrag
          // setError={setError}
          setFile={setFile}
        />
      )}
      {/* Display Errors */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
}

function FileView({ fileName, postId }: { fileName: string; postId: string }) {
  const router = useRouter();
  const handleRemoveFile = async () => {
    try {
      await fetch("/api/posts/delete-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      toast.success("Post file deleted successfully");
      router.refresh();
    } catch (error) {
      console.log("This error happend while deleting post file:", error);
      toast.error("An error happend when removing file");
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg">
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
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemoveFile}
            className="flex-shrink-0 h-8 w-8 text-gray-400 hover:text-red-500"
            aria-label={`Remove ${fileName}`}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

type FilePreviewProps = {
  postId: string;
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};
function FilePreview({ postId, file, setFile }: FilePreviewProps) {
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const router = useRouter();
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleSubmit = async () => {
    // Create form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("postId", postId);
    setUploading(true);
    setProgress(0);

    try {
      await axios.post("/api/posts/upload-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });
      router.refresh();
      // setSuccess(true);
      setFile(null);
    } catch (err) {
      // setError("Failed to upload video. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Preview</h3>
        <button
          type="button"
          onClick={() => setFile(null)}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="mt-3 flex items-center space-x-3">
        <File className="text-blue-500" size={20} />
        <div>
          <p className="font-medium truncate max-w-xs">{file.name}</p>
          <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setFile(null)}
          className="flex-shrink-0 h-8 w-8 text-gray-400 hover:text-red-500"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      {(uploading || progress > 0) && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1 text-center">{progress}%</p>
        </div>
      )}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!file || uploading}
          className={`mt-3 px-4 py-2 rounded-md text-white font-medium ${
            !file || uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </div>
  );
}

type FileInputAndDragProps = {
  // setError: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};
function FileInputAndDrag({ setFile }: FileInputAndDragProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) {
        setIsDragging(true);
      }
    },
    [isDragging]
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]; // Take only the first file
      setFile(file);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; // Take only the first file
      setFile(file);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div>
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-2xl">Upload your file</h2>
      </div>
      <div
        className={`w-full aspect-video flex justify-center items-center border-2 border-dashed bg-blue-100 rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          //   accept="image/*"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <Upload
            size={40}
            className={isDragging ? "text-blue-500" : "text-gray-400"}
          />

          <p className="text-lg font-medium">
            {isDragging ? "Drop file here" : "Drag & drop file here"}
          </p>

          <p className="text-sm text-gray-500">or click to browse your files</p>
        </div>
      </div>
    </div>
  );
}
