import moment from "moment";
import { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { RRule } from "rrule";
import useHabitQuery from "@/hooks/useAddHabbit";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const today = moment().format().slice(0, 10);

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
      const recurrence = getRecurrenceOptions(habit.frequency, habit.startDate);

      return {
        title: `${habit.name}`,
        startRecur: moment(habit.startDate).format("YYYY-MM-DD"),
        daysOfWeek: recurrence.daysOfWeek,
        rrule: recurrence.rrule,
        backgroundColor: "white",
        textColor: "BLACK",
        borderColor: "black",
        extendedProps: {
          completedDates: habit.completedDates,
          habitName: habit.name,
        },
      };
    });
  }, [data]);

  const handleEventClick = (info: any) => {
    const isCompletedToday = info.event.extendedProps.completedDates
      ?.map((completedDate: ICompletedDay) => completedDate.date)
      .includes(today);

    const isEventClickedInValidDay =
      moment(info.event.start).format().slice(0, 10) === today;

    if (!isEventClickedInValidDay) {
      alert("You can only complete habits for today.");
    } else if (!isCompletedToday) {
      navigate(`/check/${info.event.extendedProps.habitName}`);
    } else {
      alert("You have already completed this habit today.");
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, rrulePlugin]}
      initialView="dayGridMonth"
      events={events}
      eventClick={(info) => handleEventClick(info)}
      eventBorderColor="#fff"
      height="auto"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,dayGridWeek",
      }}
      eventContent={(arg) => {
        const event = arg.event;

        const eventDay = moment(event.start).format().slice(0, 10);

        const value =
          event.extendedProps.completedDates?.find(
            (completedDate: ICompletedDay) => completedDate.date === eventDay
          )?.value || 0;

        return (
          <div className="flex justify-center font-bold px-1 rounded relative cursor-pointer">
            {value !== 0 && new Date(today) >= new Date(eventDay) && (
              <div className="absolute top-1/2 left-0 w-full border-t-2 border-green-500 transform -translate-y-1/2"></div>
            )}
            {value === 0 && new Date(today) > new Date(eventDay) && (
              <div className="absolute top-1/2 left-0 w-full border-t-2 border-red-500 transform -translate-y-1/2"></div>
            )}
            <div className=" capitalize mr-2">{event.title}</div>:
            <div className="ml-2">
              {today === eventDay || today > eventDay ? value : "Not Yet"}
            </div>
          </div>
        );
      }}
    />
  );
};

export default HabitsCalendar;
