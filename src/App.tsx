import { Route, Routes } from "react-router";
import "./App.css";
import HabitsCalendar from "./features/HabitsCalendar";
import Navbar from "./layout/navbar";
import AddHabit from "./features/AddHabit";
import HabitsList from "./features/habitsList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HabitsList />} />
        <Route path="/calendar" element={<HabitsCalendar />} />
        <Route path="/add" element={<AddHabit />} />
      </Route>
    </Routes>
  );
}

export default App;
