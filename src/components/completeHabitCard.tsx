import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useHabitQuery from "@/hooks/useHabitQuery";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router";

const CompleteHabitCard = ({ habit }: { habit: IHabit }) => {
  const { editHabit } = useHabitQuery();
  const navigate = useNavigate();
  const [habitObj, setHabitObj] = useState(habit);
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    if (habit.completedDates?.length === 0) {
      setHabitObj({
        ...habitObj,
        completedDates: [
          { date: moment().format().slice(0, 10), value: e.target.value },
        ],
      });
    } else {
      setHabitObj({
        ...habitObj,
        completedDates: habit.completedDates?.concat({
          date: moment().format().slice(0, 10),
          value: e.target.value,
        }),
      });
    }
  };

  const handleCompleteClick = () => {
    setValue("");
    editHabit(habitObj);
    navigate("/calendar");
  };
  return (
    <Card className="w-full mx-auto max-w-sm bg-white">
      <CardHeader>
        <CardTitle>Complete {habit?.name} Habit Today</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label>Value Finished</Label>
            <Input
              name="name"
              type="number"
              placeholder="0"
              value={value}
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 ">
        <Button
          type="submit"
          onClick={() => handleCompleteClick()}
          variant="outline"
          className="cursor-pointer"
        >
          Complete Habit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompleteHabitCard;
