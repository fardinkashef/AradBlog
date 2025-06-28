"use client";

// Recharts components - import them directly
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer, // For responsiveness
} from "recharts";

// Import your prepared data type
import { ChartDataPoint } from "@/lib/utils/chart-data"; // Adjust path if needed

interface DailyViewsChartProps {
  data: ChartDataPoint[]; // This component expects the preprocessed data
}

export function DailyViewsChart({ data }: DailyViewsChartProps) {
  return (
    // Use plain divs with Tailwind CSS classes for styling, simulating a card
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-6">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Daily Website Views
        </h3>
        <p className="text-sm text-muted-foreground">
          Views for the last 30 days
        </p>
      </div>
      <div className="p-6 pt-0">
        {/*
          ResponsiveContainer is crucial for making Recharts responsive.
          It takes 100% of its parent's width/height.
          Make sure its parent has a defined height, or give ResponsiveContainer a height directly.
        */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />{" "}
            {/* Add grid lines, customize stroke */}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              // Format date for display on X-axis (e.g., "Jun 27")
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })
              }
            />
            <YAxis
            // You can add a label for the Y-axis if needed
            // label={{ value: 'Views', angle: -90, position: 'insideLeft' }}
            />
            {/*
              Recharts Tooltip for hover functionality.
              You can customize its content with a custom component if desired,
              but for simplicity, we'll use the default.
            */}
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} // Light gray background on hover
              formatter={(value: number, name: string, props) => [
                `${value.toLocaleString()} views`,
                "",
              ]} // Custom content: "X views"
              labelFormatter={(label: string) =>
                `Date: ${new Date(label).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}`
              }
            />
            <Bar
              dataKey="views" // The key from your ChartDataPoint that holds the view count
              fill="#8884d8" // A default blue color. You can use any hex, RGB, or CSS variable here.
              radius={[4, 4, 0, 0]} // Top corners rounded
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
