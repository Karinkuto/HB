"use client";

import { TrendingUp, DollarSign } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { ChartConfig, ChartContainer } from "./ui/chart";

// Define the type for chart data
type ChartData = {
  month: string;
  desktop: number;
  mobile: number;
};

// Mock function to fetch data from an API
const fetchData = async (): Promise<{
  totalRevenue: number;
  weeklyRevenue: number;
  chartData: ChartData[];
}> => {
  // Replace this with your actual API call
  return {
    totalRevenue: 45231.89,
    weeklyRevenue: 5231.89,
    chartData: [
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
    ],
  };
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Component() {
  const [data, setData] = useState<{
    totalRevenue: number;
    weeklyRevenue: number;
    chartData: ChartData[];
  }>({
    totalRevenue: 0,
    weeklyRevenue: 0,
    chartData: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${data.totalRevenue.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
      <Separator className="my-4" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Weekly Revenue</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${data.weeklyRevenue.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground">+20.1% from last week</p>
      </CardContent>
      <Separator className="my-4" />
      
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data.chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
