import moment from "moment";
import { useMemo} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import useHabitQuery from "@/hooks/useAddHabbit";



const HabitsCalendar = () => {
const { data } = useHabitQuery("habit");

  const events = useMemo(() => {
    return data?.map((habit:IHabit) => ({
      title: `${habit.name}: ${habit.completedDates?.length}`,
      startRecur: moment(habit.createdAt).format("YYYY-MM-DD"),
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      backgroundColor: "var(--bs-primary)",
      textColor: "BLACK",
      borderColor: "var(--bs-primary)",
      extendedProps: {
        completedDates: habit.completedDates,
        habitId: habit.name,
      },
    }));
  }, [data]);

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
