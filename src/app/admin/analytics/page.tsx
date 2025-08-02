// import { connectToDatabase } from "@/lib/database/db-connection";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   getAllViews,
//   getLast30DaysDailyViews,
//   getLastMonthViews,
//   // getLastWeekViews,
//   getThisMonthViews,
//   getThisWeekViews,
// } from "@/lib/server-actions/views";
// import { prepareDailyViewsChartData } from "@/lib/utils/chart-data";
// import { DailyViewsChart } from "../_components/DailyViewsChart";

// export default async function AdminAnalyticsPage() {
//   await connectToDatabase();

//   // --- Fetching Data using Aggregation and countDocuments ---

//   // 1. Total Website Views (All Time)
//   const totalSiteViews = await getAllViews();

//   // 2. Website Views This Week
//   const viewsThisWeek = await getThisWeekViews();

//   // 3. Website Views Last Week
//   // const viewsLastWeek = await getLastWeekViews();

//   // 4. Website Views This Month
//   const viewsThisMonth = await getThisMonthViews();

//   // 5. Website Views Last Month
//   const viewsLastMonth = await getLastMonthViews();

//   // 6. Daily Views for a Chart (Last 30 Days)
//   const last30DaysDailyViews = await getLast30DaysDailyViews();

//   const chartDataFor30Days = prepareDailyViewsChartData(
//     last30DaysDailyViews,
//     30
//   );

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-4xl font-bold mb-6">Analytics</h1>
//       <p className="text-lg text-gray-600 mb-8">
//         Detailed insights into your blog&apos;s performance.
//       </p>

//       {/* Overview Cards: Website Views */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Total Views (All Time)</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-4xl font-bold">{totalSiteViews}</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Views This Week</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-4xl font-bold">{viewsThisWeek}</p>
//           </CardContent>
//         </Card>
//         {/* <Card>
//           <CardHeader>
//             <CardTitle>Views Last Week</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-4xl font-bold">{viewsLastWeek}</p>
//           </CardContent>
//         </Card> */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Views This Month</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-4xl font-bold">{viewsThisMonth}</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Views Last Month</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-4xl font-bold">{viewsLastMonth}</p>
//           </CardContent>
//         </Card>
//       </div>
//       {/* Daily Views Chart Data (You'd typically pass this to a client-side charting library) */}
//       <DailyViewsChart data={chartDataFor30Days} />
//     </div>
//   );
// }

export default function AdminAnalyticsPage() {
  return <div>This page is empty for now</div>;
}
