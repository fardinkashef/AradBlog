import { connectToDatabase } from "@/lib/database/db-connection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { startOfWeek } from "date-fns";
import PageView from "@/lib/database/models/PageView";
import {
  getAllViews,
  getLast30DaysDailyViews,
  getLastMonthViews,
  // getLastWeekViews,
  getThisMonthViews,
  getThisWeekViews,
} from "@/lib/server-actions/views";
import { prepareDailyViewsChartData } from "@/lib/utils/chart-data";
import { DailyViewsChart } from "../_components/DailyViewsChart";

export default async function AdminAnalyticsPage() {
  await connectToDatabase();
  const now = new Date(); // Current date/time

  // --- Date Range Definitions (relative to 'now') ---
  const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }); // Monday as start of week

  // --- Fetching Data using Aggregation and countDocuments ---

  // 1. Total Website Views (All Time)
  const totalSiteViews = await getAllViews();

  // 2. Website Views This Week
  const viewsThisWeek = await getThisWeekViews();

  // 3. Website Views Last Week
  // const viewsLastWeek = await getLastWeekViews();

  // 4. Website Views This Month
  const viewsThisMonth = await getThisMonthViews();

  // 5. Website Views Last Month
  const viewsLastMonth = await getLastMonthViews();

  // 6. Daily Views for a Chart (Last 30 Days)
  const last30DaysDailyViews = await getLast30DaysDailyViews();

  // 7. Top Blog Posts (All Time)
  const topPostsAllTime = await PageView.aggregate([
    { $match: { blogPostId: { $ne: null } } }, // Only count views linked to a blog post
    {
      $group: {
        _id: "$blogPostId", // Group by blog post ID
        count: { $sum: 1 }, // Count total views for each post
      },
    },
    { $sort: { count: -1 } }, // Sort by most views first
    { $limit: 10 }, // Top 10 posts
    {
      $lookup: {
        // Join with the Post collection to get post titles/slugs
        from: "posts", // IMPORTANT: This must be the actual name of your posts collection in MongoDB (usually lowercase plural of model name)
        localField: "_id",
        foreignField: "_id",
        as: "postDetails",
      },
    },
    { $unwind: "$postDetails" }, // Deconstruct the array created by $lookup
    {
      $project: {
        // Reshape the output documents
        _id: 0,
        title: "$postDetails.title",
        views: "$count",
        slug: "$postDetails.slug", // Include slug for linking if needed
      },
    },
  ]);

  // 8. Top Blog Posts (This Week)
  const topPostsThisWeek = await PageView.aggregate([
    {
      $match: {
        blogPostId: { $ne: null },
        timestamp: { $gte: startOfThisWeek }, // Filter for current week
      },
    },
    {
      $group: {
        _id: "$blogPostId",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 5 }, // Top 5 posts for this week
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "_id",
        as: "postDetails",
      },
    },
    { $unwind: "$postDetails" },
    {
      $project: {
        _id: 0,
        title: "$postDetails.title",
        views: "$count",
      },
    },
  ]);

  const chartDataFor30Days = prepareDailyViewsChartData(
    last30DaysDailyViews,
    30
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Analytics</h1>
      <p className="text-lg text-gray-600 mb-8">
        Detailed insights into your blog&apos;s performance.
      </p>

      {/* Overview Cards: Website Views */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Views (All Time)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalSiteViews}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Views This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{viewsThisWeek}</p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle>Views Last Week</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{viewsLastWeek}</p>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader>
            <CardTitle>Views This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{viewsThisMonth}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Views Last Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{viewsLastMonth}</p>
          </CardContent>
        </Card>
      </div>
      {/* Daily Views Chart Data (You'd typically pass this to a client-side charting library) */}
      <DailyViewsChart data={chartDataFor30Days} />
      {/* Top Posts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Posts (All Time)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {topPostsAllTime.map((post: any) => (
                <li
                  key={post.slug}
                  className="flex justify-between items-center text-lg"
                >
                  <span>{post.title}</span>
                  <span className="font-semibold">
                    {post.views.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Posts (This Week)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {topPostsThisWeek.map((post: any) => (
                <li
                  key={post.title}
                  className="flex justify-between items-center text-lg"
                >
                  <span>{post.title}</span>
                  <span className="font-semibold">
                    {post.views.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
