import { Route, Routes } from "react-router";
import "./App.css";
import HabitsCalendar from "./features/HabitsCalendar";
import Navbar from "./layout/navbar";
import AddHabit from "./features/AddHabit";
import HabitsList from "./features/HabitsList";
import CompleteHabit from "./features/CompleteHabit";
import HabitStats from "./features/HabitStats";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HabitsList />} />
        <Route path="/calendar" element={<HabitsCalendar />} />
        <Route path="/check/:habitName" element={<CompleteHabit />} />
        <Route path="/add" element={<AddHabit />} />
        <Route path="/chart" element={<HabitStats />} />
      </Route>
    </Routes>
  );
}

export default App;
