"use client";

//* This component is used to track the views of pages like home, contact, services etc. In other words, any page in the website but post page and admin pages.

import { useEffect, useRef } from "react";
import { createView } from "@/lib/server-actions/views";

export default function PageViewTracker() {
  // Using a ref to track what's already been sent for the current page/post combination
  const trackRef = useRef<boolean>(null);

  useEffect(() => {
    if (trackRef.current) {
      return; // Already tracked
    }
    const triggerTracking = async () => {
      try {
        // Call the Server Action directly with the path and optional postId
        const result = await createView();

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
  }, []); // Re-run effect when postId changes

  return null; // This component renders nothing visually
}
