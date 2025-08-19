"use server";

import { getAnalyticsDataClient, GA4_PROPERTY_ID } from "@/lib/utils/ga4"; // Import your utility

export async function getPostViews(postSlug: string): Promise<number> {
  if (!GA4_PROPERTY_ID) {
    console.error("GA4_PROPERTY_ID is not set in environment variables.");
    // Handle this error appropriately, e.g., throw, return 0, etc.
    return 0;
  }

  const analyticsDataClient = getAnalyticsDataClient(); // Get the initialized client

  // Construct the page path as it appears in Google Analytics.
  // Make sure this matches your actual blog post path structure (e.g., /posts/your-post-title)
  const pagePath = `/blog/${postSlug}`;

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${GA4_PROPERTY_ID}`,
      dateRanges: [
        { startDate: "2025-01-01", endDate: "today" }, // Track views from the beginning
      ],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      dimensionFilter: {
        filter: {
          fieldName: "pagePath",
          stringFilter: {
            matchType: "EXACT",
            value: pagePath,
          },
        },
      },
    });
    // console.log("this is theeeee response:", response);

    let views = 0;
    if (response.rows && response.rows.length > 0) {
      views = parseInt(response.rows[0].metricValues[0].value || "0");
    }
    return views;
  } catch (error) {
    console.error(`Error fetching GA4 data for slug ${postSlug}:`, error);
    // You might want to handle this gracefully, e.g., return 0 views on error
    // or re-throw if it's a critical error.
    return 0;
  }
}
