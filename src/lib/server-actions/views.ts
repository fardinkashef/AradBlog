"use server";
import { connectToDatabase } from "@/lib/database/db-connection";
import PageView from "../database/models/PageView";
import {
  endOfMonth,
  // endOfWeek,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  // subWeeks,
} from "date-fns";

export async function createView(
  postId?: string // Optional: The MongoDB ObjectId of the blog post
) {
  try {
    await connectToDatabase();
    // Create a new PageView document
    const newPageView = new PageView({
      postId: postId || undefined, // Set if provided, otherwise undefined
      timestamp: new Date(), // Automatically set to current time
    });

    await newPageView.save();

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
    const totalSiteViews = await PageView.countDocuments({});
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
    const viewsThisWeek = await PageView.countDocuments({
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
//     const viewsLastWeek = await PageView.countDocuments({
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
    const viewsThisMonth = await PageView.countDocuments({
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
    const viewsLastMonth = await PageView.countDocuments({
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

  const rawDailyViews = await PageView.aggregate([
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
