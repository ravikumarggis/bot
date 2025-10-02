"use client";
import { Bar, BarChart } from "recharts";
import { ChartConfig, ChartContainer } from "../../../components/ui/chart";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProfitChart() {
  const chartData = [
    { month: "January", desktop: 186},
    { month: "February", desktop: 305},
    { month: "March", desktop: 237},
    { month: "April", desktop: 73},
    { month: "May", desktop: 209},
    { month: "June", desktop: 214},
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    }
  };

  return (
    <div className="bg-[#12121a] border border-gray-800/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-normal">
          Profit Chart <span className="text-gray-400 text-sm">(USDT)</span>
        </h3>
        {/* <Select defaultValue="month">
          <SelectTrigger className="w-32 bg-gray-800/30 border-gray-700/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      <div className="flex items-center justify-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-400">Total Profit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-400">Total Capital</span>
        </div>
      </div>

      <div className="relative h-64">
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
          <span>2</span>
          <span>1.5</span>
          <span>1</span>
          <span>0.5</span>
          <span>0</span>
        </div>
        {/* <div className="absolute left-0 top-0 bottom-8 ml-8 text-xs text-gray-500 -rotate-90 origin-left">
          Profit (USDT)
        </div> */}

        <div className="absolute right-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
          <span>2</span>
          <span>1.5</span>
          <span>1</span>
          <span>0.5</span>
          <span>0</span>
        </div>
        {/* <div className="absolute right-0 top-0 bottom-8 mr-8 text-xs text-gray-500 rotate-90 origin-right">
          Capital (USDT)
        </div> */}

        <div className="ml-16 mr-16 h-full border-b border-l border-gray-800/50">
          <div className="h-full flex items-end justify-center">
            <div className="w-full h-px bg-red-500/30"></div>
          </div>
        </div>

        <div className="absolute bottom-0 left-16 right-16 flex justify-between text-xs text-gray-500">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
