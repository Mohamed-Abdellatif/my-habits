import moment from "moment";
import { useMemo} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";

const habits = [
  {
    id: "1", // unique identifier (string)
    name: "habit1", // name of the habit
    description: "sdfds", // optional description
    frequency: "daily", // e.g., "daily", "weekly"
    days: ["Monday", "Wednesday"], // e.g., ["Monday", "Wednesday"]
    completedDates: ["2025-07-01", "2025-07-03"], // e.g., ["2025-07-01", "2025-07-03"]
    createdAt: "2025-07-01", // creation timestamp
  },
];

const HabitsCalendar = () => {
  const events = useMemo(() => {
    return habits.map((habit) => ({
      title: `${habit.name}: ${habit.completedDates.length}`,
      startRecur: moment(habit.createdAt).format("YYYY-MM-DD"),
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      backgroundColor: "var(--bs-primary)",
      textColor: "BLACK",
      borderColor: "var(--bs-primary)",
      extendedProps: {
        completedDates: habit.completedDates,
        habitId: habit.id,
      },
    }));
  }, [habits]);

  const handleDateClick = () => {
    // const dateClicked = info.dateStr;
    // setSelectedDate(moment(dateClicked).format("MMMM Do YYYY"));
    // const filteredQuestions = questions.filter(
    //   (q: IQuestion) => moment(q.nextTest).format("YYYY-MM-DD") === dateClicked
    // );
    // setSelectedQuestions(filteredQuestions);
    // setShowModal(true);
  };

  const handleEventClick = () => {
    // const eventDate = moment(info.event.start).format("YYYY-MM-DD");
    // setSelectedDate(moment(eventDate).format("MMMM Do YYYY"));
    // const filteredQuestions = questions.filter(
    //   (q: IQuestion) => moment(q.nextTest).format("YYYY-MM-DD") === eventDate
    // );
    // setSelectedQuestions(filteredQuestions);
    // setShowModal(true);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, rrulePlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      eventBorderColor="#fff"
      height="auto"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,dayGridWeek",
      }}
    />
  );
};

export default HabitsCalendar;
