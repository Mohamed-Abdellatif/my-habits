/// <reference types="vite/client" />

interface IHabit {
  id?: number;
  name: string,
  description: string,
  frequency: string,
  days?: number[],
  completedDates?: string[],
  createdAt: string,
};