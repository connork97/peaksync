import React, { useEffect, useState, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { AllSessionsContext, GeneralToggleContext } from "../App"

import EventDetailsModal from "./EventDetailsModal";

import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
const localizer = momentLocalizer(moment);

const EventsCalendar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [clickedSession, setClickedSession] = useState({})

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
    const splitTime = time.split(":");
    let endSplitHours = Number(splitTime[0]) + hours;
    let endSplitMinutes = Number(splitTime[1]) + minutes;
    if (endSplitMinutes >= 60) {
      endSplitHours += Math.floor(endSplitMinutes / 60);
      endSplitMinutes %= 60;
    }
    const finalTime = endSplitHours.toString().padStart(2, "0") + ":" + endSplitMinutes.toString().padStart(2, "0");
    const endDateAndTime = date + " " + finalTime;
    return endDateAndTime;
  };
  
  useEffect(() => {
    const newEvents = allSessions.map((session) => {
      const { date, time } = session;
      const { name, hours, minutes, category } = session.event;
      
      const startDateAndTime = moment(date + " " + time, "YYYY-MM-DD HH:mm").toDate();
      const endDateAndTime = handleDateAndTimeConversion(date, time, hours, minutes);
      const endDate = moment(endDateAndTime, "YYYY-MM-DD HH:mm").toDate();
      const eventColor = selectEventColor(category);
  
      const dayOfWeek = moment(startDateAndTime).format("dddd");
  
      return {
        title: name,
        start: startDateAndTime,
        end: endDate,
        color: eventColor,
        values: {
          event_id: session.event.id,
          session_id: session.id,
          name: name,
          day: dayOfWeek,
          date: date,
          time: time,
          description: session.event.description,
          spaces: session.event.capacity - session.signups.length,
          signups: session.signups
        },
      };
    });
  
    setEvents(newEvents);
  }, [allSessions, generalToggle]);

  const handleClickedEvent = (event) => {
    console.log("clicked!")

    console.log(event)
    setClickedSession(event)
    setShow(true)
    // return <EventDetailsModal />

  }

  return (
    <div>
      {Object.keys(clickedSession).length > 0 ? 
      <EventDetailsModal clickedSession={clickedSession} setClickedSession={setClickedSession} show={show} setShow={setShow} />
      : null}
      <h1>Calendar Page</h1>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          timeslots={1}
          style={{ height: "85vh", width:"85vw", margin:"auto" }}
          eventPropGetter={eventStyleGetter}
          selectable
          onSelectEvent={handleClickedEvent}
        />
    </div>
  )
}

export default EventsCalendar