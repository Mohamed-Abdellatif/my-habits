/// <reference types="vite/client" />

interface IHabit {
  id?: number;
  name: string;
  description: string;
  frequency: string;
  days?: number[];
  completedDates?: ICompletedDay[];
  createdAt: string;
  startDate: string;
}

interface ICompletedDay {
  date: string;
  value: string;
}
