import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useHabitQuery from "@/hooks/useHabitQuery";

const HabitCard = ({ habit }: { habit: IHabit }) => {
  const { deleteHabit } = useHabitQuery();
  return (
    <Card className="w-full max-w-sm bg-white">
      <CardHeader>
        <CardTitle className="text-2xl uppercase border-b-2 pb-2">
          {habit.name}
        </CardTitle>
        <CardDescription className=""></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 capitalize text-start truncate">
          <div className="col-span-1">Description:</div>
          <div className="col-span-2">{habit.description}</div>
        </div>
        <div className="grid grid-cols-3 gap-4 capitalize text-start">
          <div className="col-span-1">Frequency:</div>
          <div className="col-span-1">{habit.frequency}</div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="outline"
          className="w-full cursor-pointer hover:bg-red-100"
          onClick={() => deleteHabit(habit.name)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HabitCard;
