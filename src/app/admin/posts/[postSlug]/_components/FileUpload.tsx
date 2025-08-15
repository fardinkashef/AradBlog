"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Upload, X, File, Plus, Paperclip } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";

type FileUploadProps = {
  attachments: string[]; // The names of the attached files(.e.g ['article.pdf' , 'photo.jpg'])
  postId: string;
};

export default function FileUpload({ attachments, postId }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isAdding, setIsAdding] = useState(false); // Adding a new file
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const router = useRouter();
  const toggleEdit = () => setIsAdding((current) => !current);
  // Removes a file from the server. In other words, removes a file from previously uploaded files.
  const handleRemoveFile = async (fileName: string) => {
    try {
      await fetch("/api/posts/attachments/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, fileName }),
      });
      toast.success("File deleted successfully");
      router.refresh();
    } catch (error) {
      console.log("This error happend while deleting the file:", error);
      toast.error("An error happend when removing file");
    }
  };
  //   Removes a file from newly selected files
  const handleDiscardFile = (fileName: string) => {
    const newFiles = files.filter((file) => file.name !== fileName);
    setFiles(newFiles);
  };
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };
  const handleUploadFiles = async () => {
    // Create form data
    const formData = new FormData();
    files.forEach((file: File) => formData.append("files", file));
    formData.append("postId", postId);
    setUploading(true);
    setProgress(0);

    try {
      await axios.post("/api/posts/attachments/upload", formData, {
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
      setFiles([]);
      router.refresh();
      // setSuccess(true);
    } catch (err) {
      // setError("Failed to upload video. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };
  const handleAddFile = (newFile: File) => setFiles([...files, newFile]);
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="font-medium flex items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Paperclip className="h-5 w-5" />
          Attachments
        </CardTitle>
        <Button onClick={toggleEdit} variant="ghost">
          {isAdding ? (
            <>Cancel</>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add new file
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {attachments.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Uploaded Files
            </h3>
            <div className="space-y-2">
              {attachments.map((attachment) => (
                <Card className="w-full bg-muted/30" key={attachment}>
                  <CardContent className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <File size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {attachment}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFile(attachment)}
                      className="flex-shrink-0 h-8 w-8 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        {files.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Ready to Upload
            </h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <Card className="w-full bg-blue-50 border-blue-200" key={index}>
                  <CardContent className="flex items-center gap-3">
                    <File className="text-blue-500" size={18} />
                    <div className="grow">
                      <p className="font-medium truncate max-w-xs">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatBytes(file.size)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDiscardFile(file.name)}
                      className="flex-shrink-0 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
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
        {isAdding && (
          <FileInputAndDrag
            // setError={setError}
            handleAddFile={handleAddFile}
          />
        )}
        {files.length > 0 && (
          <div className="flex justify-end">
            <Button
              onClick={handleUploadFiles}
              disabled={files.length === 0 || uploading}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        )}
        {/* Display Errors */}
        {/* {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
          {error}
        </div>
      )} */}
      </CardContent>
    </Card>
  );
}

type FileInputAndDragProps = {
  // setError: React.Dispatch<React.SetStateAction<string>>;
  handleAddFile: (newFile: File) => void;
};
function FileInputAndDrag({ handleAddFile }: FileInputAndDragProps) {
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
      handleAddFile(file);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; // Take only the first file
      handleAddFile(file);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div
      className={`w-full flex justify-center items-center border-2 border-dashed bg-blue-100 rounded-lg p-8 text-center cursor-pointer transition-colors ${
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
  );
}
