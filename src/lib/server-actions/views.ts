"use server";
import { connectToDatabase } from "@/lib/database/db-connection";
import View from "../database/models/View";
import {
  endOfMonth,
  // endOfWeek,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  // subWeeks,
} from "date-fns";

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
    console.log("this is theeeee response:", response);

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

export async function createView(
  postId?: string // Optional: The MongoDB ObjectId of the blog post
) {
  try {
    await connectToDatabase();
    // Create a new View document
    const newView = new View({
      postId: postId || undefined, // Set if provided, otherwise undefined
      timestamp: new Date(), // Automatically set to current time
    });

    await newView.save();

    return { success: true, message: "View tracked successfully" };
  } catch (error) {
    console.error("This error happened while tracking a view:", error);
    return {
      success: false,
      message: "Failed to track view",
      error: (error as Error).message,
    };
  }
}
export async function getAllViews() {
  try {
    await connectToDatabase();
    const totalSiteViews = await View.countDocuments({});
    return totalSiteViews;
  } catch (error) {
    console.log("This error happened while counting all views:", error);
  }
}
export async function getThisWeekViews() {
  try {
    await connectToDatabase();
    const now = new Date();
    const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }); // Monday as start of week
    const viewsThisWeek = await View.countDocuments({
      timestamp: { $gte: startOfThisWeek },
    });
    return viewsThisWeek;
  } catch (error) {
    console.log("This error happened while counting this week views:", error);
  }
}
// export async function getLastWeekViews() {
//   try {
//     await connectToDatabase();
//     const now = new Date();
//     const startOfLastWeek = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
//     const endOfLastWeek = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
//     const viewsLastWeek = await View.countDocuments({
//       timestamp: { $gte: startOfLastWeek, $lte: endOfLastWeek },
//     });
//     return viewsLastWeek;
//   } catch (error) {
//     console.log("This error happened while counting last week views:", error);
//   }
// }
export async function getThisMonthViews() {
  try {
    await connectToDatabase();
    const now = new Date();
    const startOfThisMonth = startOfMonth(now);
    const viewsThisMonth = await View.countDocuments({
      timestamp: { $gte: startOfThisMonth },
    });
    return viewsThisMonth;
  } catch (error) {
    console.log("This error happened while counting this month views:", error);
  }
}
export async function getLastMonthViews() {
  try {
    await connectToDatabase();
    const now = new Date();
    const startOfLastMonth = startOfMonth(subMonths(now, 1));
    const endOfLastMonth = endOfMonth(subMonths(now, 1));
    const viewsLastMonth = await View.countDocuments({
      timestamp: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });
    return viewsLastMonth;
  } catch (error) {
    console.log("This error happened while counting last month views:", error);
  }
}
export async function getLast30DaysDailyViews() {
  const now = new Date(); // Current date/time
  const thirtyDaysAgo = subDays(now, 29);

  const rawDailyViews = await View.aggregate([
    {
      $match: {
        timestamp: { $gte: thirtyDaysAgo },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  return rawDailyViews;
}
