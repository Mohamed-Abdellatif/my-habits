import useHabitQuery from "@/hooks/useHabitQuery";
import HabitCard from "../components/HabitCard";

const HabitsList = () => {
  const { data } = useHabitQuery();
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
