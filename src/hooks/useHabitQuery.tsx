import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Key = import.meta.env.VITE_HABIT_KEY;



const useHabitQuery = () => {
  const queryClient = useQueryClient();

  const getLocalHabit = () => {
    const data = localStorage.getItem(Key);
    return data ? JSON.parse(data) : null;
  };

  const setLocalHabit = (data: any) => {
    localStorage.setItem(Key, JSON.stringify(data));
  };

  const { data, isLoading } = useQuery({
    queryKey: [Key],
    queryFn: () => getLocalHabit(),
    staleTime: 10,
  });

  const { mutate: updateHabit } = useMutation<IHabit[], unknown, IHabit[]>({
    mutationFn: async (newData) => {
      setLocalHabit(newData);
      return newData;
    },

    onSuccess: (data) => {
      queryClient.setQueryData([Key], data);
    },
  });

  const addHabit = (habitToAdd: IHabit) => {
    if (data.map((habit: IHabit) => habit.name).includes(habitToAdd.name)) {
      alert("Already there");
      return;
    }
    if (data?.length == 0) {
      updateHabit([habitToAdd]);
    } else {
      updateHabit(data.concat(habitToAdd));
    }
  };

  const editHabit = (habitToEdit: IHabit) => {
    if (!data.map((habit: IHabit) => habit.name).includes(habitToEdit?.name)) {
      alert("Does not exist");
      return;
    }
    if (data?.length == 1) {
      updateHabit([habitToEdit]);
    } else {
      updateHabit(
        data
          .filter((habit: IHabit) => habit.name !== habitToEdit?.name)
          .concat(habitToEdit)
      );
    }
  };

  const deleteHabit = (habitName: string) => {
    if (!data.map((habit: IHabit) => habit.name).includes(habitName)) {
      alert("Does not exist");
      return;
    }
    if (data?.length == 1) {
      updateHabit([]);
    } else {
      updateHabit(data.filter((habit: IHabit) => habit.name !== habitName));
    }
  };

  const sortedData = data?.sort(
    (a: IHabit, b: IHabit) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  return { data: sortedData, isLoading, addHabit, deleteHabit, editHabit };
};

export default useHabitQuery;
