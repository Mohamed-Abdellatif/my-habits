import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useHabitQuery from "@/hooks/useAddHabbit";
import { useEffect, useMemo } from "react";
import { DatesCheckBoxes, DatesCheckBoxesNames } from "@/utils/constants";
import { useAtom } from "jotai";
import { chartOptionAtom } from "@/atoms/chartOption";

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

const ChartsFilter = () => {
  const [chartOptions, setChartOptions] = useAtom(chartOptionAtom);
  const { data, isLoading } = useHabitQuery("habit");

  const habitsCheckBoxes = useMemo(() => {
    const habitItems = data?.map((habit: IHabit) => ({
      id: habit.name,
      label: habit.name,
    }));
    return habitItems;
  }, [data]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["lastmonth", `${data?.[0]?.name}`],
    },
  });
  useEffect(() => {
    if (data?.[0]?.name) {
      form.reset({
        items: ["lastmonth", data[0].name],
      });
    }
  }, [data]);

  const onHabitClick = (checked: boolean, field: any, item: any) => {
    setChartOptions({ ...chartOptions, habit: item.id });
    const otherHabitNames = data
      ?.map((habit: IHabit) => habit.name)
      .filter((name: string) => name !== item.id);
    if (checked) {
      field.onChange(
        [...field.value, item.id].filter(
          (value: any) => !otherHabitNames?.includes(value)
        )
      );
    } else {
      field.onChange(field.value?.filter((value: any) => value !== item.id));
    }
  };
  const onDateClick = (checked: boolean, field: any, item: any) => {
    switch (item.id) {
      case "lastmonth":
        setChartOptions({ ...chartOptions, months: 1 });
        break;
      case "last3months":
        setChartOptions({ ...chartOptions, months: 3 });
        break;
      case "last6months":
        setChartOptions({ ...chartOptions, months: 6 });
        break;
      case "last12months":
        setChartOptions({ ...chartOptions, months: 12 });
        break;
    }
    const otherDateNames = DatesCheckBoxesNames.filter(
      (name: string) => name !== item.id
    );
    if (checked) {
      field.onChange(
        [...field.value, item.id].filter(
          (value: any) => !otherDateNames?.includes(value)
        )
      );
    } else {
      field.onChange(field.value?.filter((value: any) => value !== item.id));
    }
  };
  if (isLoading) return "Loading...";

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-1">
                <FormLabel className="text-base">Sidebar</FormLabel>
              </div>
              {DatesCheckBoxes?.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center gap-2"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) =>
                              onDateClick(Boolean(checked), field, item)
                            }
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              {habitsCheckBoxes?.map((item: { id: string; label: string }) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center gap-2"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) =>
                              onHabitClick(Boolean(checked), field, item)
                            }
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal capitalize">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default ChartsFilter;
