import moment from "moment";
import { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { RRule } from "rrule";
import useHabitQuery from "@/hooks/useAddHabbit";

const weekdayMap = [
  RRule.SU,
  RRule.MO,
  RRule.TU,
  RRule.WE,
  RRule.TH,
  RRule.FR,
  RRule.SA,
];
interface RecurrenceOptions {
  daysOfWeek?: number[];
  rrule?: any;
}

const HabitsCalendar = () => {
  const { data } = useHabitQuery("habit");

  function getRecurrenceOptions(
    type: string,
    createdAt: string
  ): RecurrenceOptions {
    const date =
      typeof createdAt === "string" ? new Date(createdAt) : createdAt;
    const dayOfWeek = date.getDay();

    switch (type) {
      case "daily":
        return {
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
          rrule: {
            freq: RRule.DAILY,
            dtstart: createdAt,
          },
        };
      case "weekly": {
        const date = new Date(createdAt);
        return {
          daysOfWeek: [date.getDay()],
          rrule: {
            freq: RRule.WEEKLY,
            byweekday: [weekdayMap[date.getDay()]],
            interval: 1,
            dtstart: date,
          },
        };
      }
      case "monthly":
        return {
          rrule: {
            freq: RRule.MONTHLY,
            interval: 1,
            bymonthday: new Date(createdAt).getDate(),
            dtstart: new Date(createdAt),
          },
        };
      case "custom":
        return {
          rrule: {
            freq: RRule.WEEKLY,
            interval: 2,
            byweekday: [dayOfWeek],
            dtstart: createdAt,
          },
        };
      default:
        throw new Error("Invalid recurrence type");
    }
  }

  const events = useMemo(() => {
    return data?.map((habit: IHabit) => {
      const recurrence = getRecurrenceOptions(habit.frequency, habit.createdAt);
      return {
        title: `${habit.name}: ${habit.completedDates?.length}`,
        startRecur: moment(habit.createdAt).format("YYYY-MM-DD"),
        daysOfWeek: recurrence.daysOfWeek,
        rrule: recurrence.rrule,
        backgroundColor: "white",
        textColor: "BLACK",
        borderColor: "var(--bs-primary)",
        extendedProps: {
          completedDates: habit.completedDates,
          habitId: habit.name,
        },
      };
    });
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
