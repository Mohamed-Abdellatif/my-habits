import useHabitQuery from "@/hooks/useAddHabbit";
import CompleteHabitCard from "./completeHabitCard";
import { useParams } from "react-router";

const CompleteHabit = () => {
  const { habitName } = useParams();
  const { data } = useHabitQuery("habit");
  const habit = data?.find((habit: IHabit) => habit.name === habitName);
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <CompleteHabitCard habit={habit} />
      </div>
    </>
  );
};

export default CompleteHabit;
