import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useHabitQuery from "@/hooks/useAddHabbit";
import { useAtom } from "jotai";
import { chartOptionAtom } from "@/atoms/chartOption";
const FormSchema = z.object({
  type: z.enum(
    [
      "lastmonth",
      "last3months",
      "last6months",
      "last12months",
      "Last 12 Months",
    ],
    {
      error: "You need to select a notification type.",
    }
  ),
});

const ChartsFilter = () => {
  const { data, isLoading } = useHabitQuery("habit");
  const [chartOptions, setChartOptions] = useAtom(chartOptionAtom);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  if (isLoading) return <div>Loading...</div>;

  const habitNames = data?.map((habit: IHabit) => habit.name) || [];

  return (
    <Form {...form}>
      <form className=" space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={() => (
            <FormItem className="space-y-3">
              <FormLabel>Wanted Period</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setChartOptions({
                      ...chartOptions,
                      months: parseInt(value),
                    });
                  }}
                  defaultValue={"1"}
                  className="flex flex-col"
                >
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">Last Month</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="3" />
                    </FormControl>
                    <FormLabel className="font-normal">Last 3 Months</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="6" />
                    </FormControl>
                    <FormLabel className="font-normal">Last 6 Months</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="12" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Last 12 Months
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={() => (
            <FormItem className="space-y-3">
              <FormLabel>Habit:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setChartOptions({
                      ...chartOptions,
                      habit: value,
                    });
                  }}
                  defaultValue={habitNames[0] || ""}
                  className="flex flex-col"
                >
                  {habitNames.map((habitName: string) => {
                    return (
                      <FormItem
                        key={habitName}
                        className="flex items-center gap-3"
                      >
                        <FormControl>
                          <RadioGroupItem value={habitName} />
                        </FormControl>
                        <FormLabel className="font-normal capitalize">
                          {habitName}
                        </FormLabel>
                      </FormItem>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default ChartsFilter;
