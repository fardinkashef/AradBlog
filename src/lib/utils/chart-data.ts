// lib/utils/chart-data.ts
import { format, subDays } from "date-fns";

interface RawDailyViewData {
  _id: string; // Represents the date in 'YYYY-MM-DD' format
  count: number; // The number of views for that day
}

export interface ChartDataPoint {
  date: string; // Date formatted as 'YYYY-MM-DD'
  views: number; // View count for that specific date
}

export function prepareDailyViewsChartData(
  rawData: RawDailyViewData[],
  days: number = 30
): ChartDataPoint[] {
  const today = new Date();
  const dataMap = new Map<string, number>();

  rawData.forEach((item) => {
    dataMap.set(item._id, item.count);
  });

  const chartData: ChartDataPoint[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const currentDay = subDays(today, i);
    const formattedDate = format(currentDay, "yyyy-MM-dd");

    const count = dataMap.get(formattedDate) || 0;

    chartData.push({
      date: formattedDate,
      views: count,
    });
  }

  return chartData;
}
