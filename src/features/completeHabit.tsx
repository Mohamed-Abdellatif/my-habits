import useHabitQuery from "@/hooks/useHabitQuery";
import CompleteHabitCard from "../components/completeHabitCard";
import { useParams } from "react-router";

const CompleteHabit = () => {
  const { habitName } = useParams();
  const { data } = useHabitQuery();
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
