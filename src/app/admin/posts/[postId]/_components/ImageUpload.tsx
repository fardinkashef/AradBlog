"use client";

import { Button } from "@/components/ui/button";
import { deletePostImage } from "@/lib/server-actions/posts";
import axios from "axios";
import { Upload, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type ImageUploadProps = {
  // The src of the image uploaded previously which we can delete and replace with a new one 👇:
  imageSrc?: string;
  // The name that will be used to store the image, extension not included, e.g. postId = "book" or "145468523"  👇:
  postId: string;
};

export default function ImageUpload({ imageSrc, postId }: ImageUploadProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const validateImageFile = (file: File) => {
    // Check if it's an image file
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return false;
    }

    // Clear any previous errors
    setError("");
    return true;
  };

  const processImageFile = (file: File) => {
    if (!validateImageFile(file)) return;

    setImageFile(file);

    // Create a URL for the image preview
    const url = URL.createObjectURL(file);
    setImagePreviewUrl(url);
  };

  const handleRemoveFile = useCallback(() => {
    setImageFile(null);

    // Clean up the object URL to prevent memory leaks
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }

    // Reset the file input
    // if (fileInputRef.current) {
    //   fileInputRef.current.value = "";
    // }
  }, [imagePreviewUrl]);
  return (
    <div className="w-full max-w-2xl rounded-lg bg-white p-4">
      <div className="text-2xl font-medium mb-2">Image</div>

      {imageSrc ? (
        <ImageView imageSrc={imageSrc} postId={postId} />
      ) : imagePreviewUrl && imageFile ? (
        <ImagePreview
          imagePreviewUrl={imagePreviewUrl}
          postId={postId}
          imageFile={imageFile}
          setImageFile={setImageFile}
          handleRemoveFile={handleRemoveFile}
        />
      ) : (
        <ImageInputAndDrag
          // setError={setError}
          processImageFile={processImageFile}
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

type ImageInputAndDragProps = {
  // setError: React.Dispatch<React.SetStateAction<string>>;
  processImageFile: (file: File) => void;
};
function ImageInputAndDrag({ processImageFile }: ImageInputAndDragProps) {
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

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]; // Take only the first file
      processImageFile(file);
      e.dataTransfer.clearData();
    }
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]; // Take only the first file
        processImageFile(file);
      }
    },
    []
  );

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div>
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-2xl">Upload your image</h2>
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
          accept="image/*"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <Upload
            size={40}
            className={isDragging ? "text-blue-500" : "text-gray-400"}
          />

          <p className="text-lg font-medium">
            {isDragging ? "Drop image here" : "Drag & drop image here"}
          </p>

          <p className="text-sm text-gray-500">or click to browse your files</p>
        </div>
      </div>
    </div>
  );
}

function ImageView({ imageSrc, postId }: { imageSrc: string; postId: string }) {
  const [src, setSrc] = useState<string>();

  const router = useRouter();
  const handleRemoveImage = async () => {
    await deletePostImage(postId);
    router.refresh();
  };

  // Why I added this useEffect? The 'browser' would cach the image not Next.js because with useRouter.refresh method, Next.js would get fresh data. So I have to change the image src a little bit using search params and Date object, but this leads to a Hydration Error. The solution is to use a useEffect hook like this.
  useEffect(() => {
    setSrc(`${imageSrc}?v=${Date.now()}`);
  }, []);
  return (
    <div className="bg-gray-50 rounded-lg">
      <div className="rounded-lg overflow-hidden bg-black relative max-w-2xl aspect-video">
        {src && (
          <Image
            src={src}
            className="w-full h-auto max-h-96"
            alt="Post Image"
            fill
          />
        )}
      </div>

      <div className="flex justify-end mt-2">
        <Button onClick={handleRemoveImage}>Remove Image</Button>
      </div>
    </div>
  );
}

type ImagePreviewProps = {
  imagePreviewUrl: string;
  postId: string;
  imageFile: File;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleRemoveFile: () => void;
};
function ImagePreview({
  imagePreviewUrl,
  postId,
  imageFile,
  setImageFile,
  // setError,
  handleRemoveFile,
}: ImagePreviewProps) {
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
    // if (!file) {
    //   setError("Please select a video file first");
    //   return;
    // }

    // Create form data
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("postId", postId);
    setUploading(true);
    setProgress(0);

    try {
      await axios.post("/api/posts/upload-image", formData, {
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
      setImageFile(null);
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
          onClick={handleRemoveFile}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="rounded-lg overflow-hidden bg-black relative max-w-2xl aspect-video">
        <Image
          src={imagePreviewUrl}
          fill
          className="w-full h-auto max-h-96"
          alt="Image Preview"
        />
      </div>

      <div className="mt-3 flex items-center space-x-3">
        <ImageIcon className="text-blue-500" size={20} />
        <div>
          <p className="font-medium truncate max-w-xs">{imageFile.name}</p>
          <p className="text-xs text-gray-500">{formatBytes(imageFile.size)}</p>
        </div>
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
          disabled={!imageFile || uploading}
          className={`mt-3 px-4 py-2 rounded-md text-white font-medium ${
            !imageFile || uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </div>
  );
}
