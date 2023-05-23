import React, { useEffect, useState, Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import { RRule, RRuleSet, rrulestr } from 'rrule'

const localizer = momentLocalizer(moment);

const EventsCalendar = ({ currentUser, allClasses }) => {

  const rule = new RRule({
    freq: RRule.WEEKLY,
    byweekday: [RRule.MO, RRule.FR],
    dtstart: new Date(2023, 5, 21, 0, 0),
    until: new Date(Date(2024, 5, 21, 0, 0))
  })

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

  useEffect(() => {
    const newEvents = allClasses.map((clas) => {
      const { name, day, time, hours, minutes, recurring, category } = clas;
      const split_time = time.split(":");
      const start_hour = Number(split_time[0]);
      const start_minute = Number(split_time[1]);
      const end_hour = start_hour + hours;
      const end_minute = start_minute + minutes;
      
      let color = selectEventColor(category)

      return {
        title: name,
        start: moment().day(day).hour(start_hour).minute(start_minute).second(0).toDate(),
        end: moment().day(day).hour(end_hour).minute(end_minute).second(0).toDate(),
        color: color,
      };
    });

    setEvents(newEvents)
  }, [allClasses]);

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