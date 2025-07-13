import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import useHabitQuery from "@/hooks/useAddHabbit";
import useGetMonthlyData from "@/hooks/useGetMonthlyData";
import { chartOptionAtom } from "@/atoms/chartOption";
import { useAtom } from "jotai";

const HabitsChart = () => {
  const { data, isLoading } = useHabitQuery("habit");
  const [chartOptions] = useAtom(chartOptionAtom);

  if (isLoading) return <div>Loading...</div>;

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Habits Found</CardTitle>
          <CardDescription>
            Please add a habit to see the chart.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const currentHabit = data?.find(
    (habit: IHabit) => habit.name === chartOptions.habit
  )
    ? data?.find((habit: IHabit) => habit.name === chartOptions.habit)
    : data?.[0];

  const { monthlyData, rangeString } = useGetMonthlyData(
    currentHabit,
    chartOptions.months
  )!;
  const chartData = monthlyData ?? [];

  const chartConfig = {
    habit: {
      label: chartOptions.habit.toUpperCase(),
      color: "lightblue",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">
          {currentHabit?.name}'s Bar Chart
        </CardTitle>
        <CardDescription>{rangeString}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="w-full h-100">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="habit"
                  fill="var(--color-habit)"
                  radius={8}
                  label={{ position: "middle", fill: "#000", fontSize: 10 }}
                />
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitsChart;
