import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const useHabitQuery = (key: string) => {
  const queryClient = useQueryClient();

  const getLocalHabit = () => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const setLocalHabit = (data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const { data } = useQuery({
    queryKey: [key],
    queryFn: () => getLocalHabit(),
    staleTime: 10,
  });

  const { mutate: updateHabit } = useMutation<IHabit[], unknown, IHabit[]>({
    mutationFn: async (newData) => {
      setLocalHabit(newData);
      return newData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData([key], data);
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
    if (!data.map((habit: IHabit) => habit.name).includes(habitToEdit.name)) {
      alert("Does not exist");
      return;
    }
    if (data?.length == 1) {
      updateHabit([habitToEdit]);
    } else {
      updateHabit(
        data
          .filter((habit: IHabit) => habit.name !== habitToEdit.name)
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
  return { data: sortedData, addHabit, deleteHabit, editHabit };
};

export default useHabitQuery;
