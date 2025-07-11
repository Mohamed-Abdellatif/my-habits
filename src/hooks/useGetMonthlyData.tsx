const useGetMonthlyData = (habit: IHabit, months: number = 3) => {
  type CompletedDate = {
    date: string;
    value: string;
  };

  if (!habit?.completedDates) return;

  const completedDates: CompletedDate[] = habit.completedDates;

  const monthlyDataMap: Record<string, number> = {};

  completedDates.forEach(({ date, value }: CompletedDate) => {
    const newDate = new Date(date);
    const key = `${newDate.getFullYear()}-${newDate.getMonth()}`;
    if (!monthlyDataMap[key]) {
      monthlyDataMap[key] = 0;
    }
    monthlyDataMap[key] += parseInt(value);
  });

  const now = new Date();
  const wantedPeriod: { key: string; label: string }[] = [];

  for (let wantedMonths = months - 1; wantedMonths >= 0; wantedMonths--) {
    const date = new Date(now.getFullYear(), now.getMonth() - wantedMonths, 1);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const label = `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;
    wantedPeriod.push({ key, label });
  }

  const monthlyData = wantedPeriod.map(({ key, label }) => ({
    month: label,
    habit: monthlyDataMap[key] || 0,
  }));
  const from = wantedPeriod[0]?.label;
  const to = wantedPeriod[months - 1]?.label;
  const rangeString = `${from} - ${to}`;
  return { monthlyData, rangeString };
};

export default useGetMonthlyData;
