import useHabitQuery from "@/hooks/useAddHabbit";
import HabitCard from "./HabitCard";

const HabitsList = () => {
  const { data } = useHabitQuery("habit");
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {data?.map((habit: IHabit) => (
          <div className="" key={habit.name}>
            <HabitCard habit={habit} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HabitsList;
