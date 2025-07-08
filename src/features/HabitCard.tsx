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
        <CardTitle>{habit.name}</CardTitle>
        <CardDescription>{habit.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="">{habit.frequency}</div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => deleteHabit(habit.name)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HabitCard;
