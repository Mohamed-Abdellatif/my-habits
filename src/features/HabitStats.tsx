import ChartsFilter from "@/components/chartsFilter";
import HabitsChart from "@/components/HabitsChart";

const HabitStats = () => {
  return (
    <div className="grid grid-cols-8 gap-4">
      <div className="col-span-1">
        <ChartsFilter />
      </div>
      <div className="col-span-7">
        <HabitsChart />
      </div>
    </div>
  );
};

export default HabitStats;
