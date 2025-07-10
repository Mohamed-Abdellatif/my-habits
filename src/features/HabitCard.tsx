import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useHabitQuery from "@/hooks/useAddHabbit";

const HabitCard = ({ habit }: { habit: IHabit }) => {
  const { deleteHabit } = useHabitQuery("habit");
  return (
    <Card className="w-full max-w-sm bg-white">
      <CardHeader>
        <CardTitle className="text-2xl uppercase border-b-2 pb-2">
          {habit.name}
        </CardTitle>
        <CardDescription className=""></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 capitalize">
          <div className="text-start">Description:</div>
          <div className="">{habit.description}</div>
        </div>
        <div className="grid grid-cols-3 gap-4 capitalize">
          <div className="text-start">Frequency:</div>
          <div className="">{habit.frequency}</div>
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
