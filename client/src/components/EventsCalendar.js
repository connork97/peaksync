import React, { useEffect, useState, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { AllSessionsContext, GeneralToggleContext } from "./App"

const localizer = momentLocalizer(moment);

const EventsCalendar = () => {

  const { allSessions } = useContext(AllSessionsContext)
  const { generalToggle } = useContext(GeneralToggleContext)

  const [events, setEvents] = useState([])
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.color,
      background: event.color,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0',
      display: 'block'
    };
    return {
      style
    };
  };

  const selectEventColor = (category) => {
    if (category === 'Climbing') {
      return 'red'
    } else if (category === 'Yoga') {
      return 'magenta'
    } else if (category === 'Fitness') {
      return 'green'
    }
  }

  const handleDateAndTimeConversion = (date, time, hours, minutes) => {
    const splitTime = time.split(":")
    let endSplitHours = Number(splitTime[0]) + hours
    let endSplitMinutes = Number(splitTime[1]) + minutes
    let finalTime
    if (endSplitMinutes > 60) {
      endSplitHours += 1
      endSplitMinutes -= 60
      finalTime = endSplitHours + ":" + endSplitMinutes
    } else if (endSplitMinutes === 60) {
      endSplitHours += 1
      endSplitMinutes -= 60
      finalTime = endSplitHours + ":0" + endSplitMinutes
    } else {
      finalTime = time
    }
    const endDateAndTime = date + " " + finalTime
    return endDateAndTime
  }

  useEffect(() => {
    const newEvents = allSessions.map((session) => {
      const { date, time } = session;
      const { name, hours, minutes, category } = session.event
      
      const startDateAndTime = date + " " + time
      const endDateAndTime = handleDateAndTimeConversion(date, time, hours, minutes)
      const eventColor = selectEventColor(category)

      return {
        title: name,
        start: moment(startDateAndTime),
        end: moment(endDateAndTime),
        // color: eventColor,
      }
    });

    setEvents(newEvents)
  }, [allSessions, generalToggle]);

    return (
      <div>
        <h1>Calendar Page</h1>
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={events}
            timeslots={1}
            style={{ height: "85vh", width:"85vw", margin:"auto" }}
            eventPropGetter={eventStyleGetter}
          />
      </div>
    )
}

export default EventsCalendar