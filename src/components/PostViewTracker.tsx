"use client";

import { useEffect, useRef } from "react";
import { createView } from "@/lib/server-actions/views";

interface PostViewTrackerProps {
  postId?: string; // Optional: Pass the MongoDB ObjectId string if it's a blog post page
}

export default function PostViewTracker({ postId }: PostViewTrackerProps) {
  // Using a ref to track what's already been sent for the current page/post combination
  const trackRef = useRef<boolean>(null);

  useEffect(() => {
    if (trackRef.current) {
      return; // Already tracked
    }
    const triggerTracking = async () => {
      try {
        // Call the Server Action directly with the path and optional postId
        const result = await createView(postId);

        if (!result.success) {
          console.error("Server Action failed to track view:", result.error);
        } else {
          trackRef.current = true; // Mark as tracked on success
        }
      } catch (error) {
        console.error("Error calling Server Action:", error);
      }
    };

    triggerTracking();
  }, [postId]); // Re-run effect when postId changes

  return null; // This component renders nothing visually
}
