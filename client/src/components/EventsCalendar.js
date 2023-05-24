import React, { useEffect, useState, Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import { RRule, RRuleSet, rrulestr } from 'rrule'

const localizer = momentLocalizer(moment);

const EventsCalendar = ({ currentUser, allEvents, allSessions }) => {

  const [events, setEvents] = useState([])
  // const rule = new RRule({
  //   freq: RRule.WEEKLY,
  //   byweekday: [RRule.MO, RRule.FR],
  //   dtstart: new Date(2023, 5, 21, 0, 0),
  //   until: new Date(Date(2024, 5, 21, 0, 0))
  // })
  const recurrenceRule = new RRule({
    freq: RRule.WEEKLY,
    byweekday: [moment("2023-05-24 11:30").toDate().getDay()],
    dtstart: moment("2023-05-24 11:30").toDate(),
    until: moment("2023-12-31 11:30").toDate() // Adjust the end date as needed
  });

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

  // console.log(moment().isoWeekday())
  // console.log(moment().isoWeekday("Monday"))
  const getNextOccurrence = (dayOfWeek) => {
    const today = moment().isoWeekday();
    const nextOccurrence = moment().isoWeekday(dayOfWeek);
    if (today <= dayOfWeek) {
      return nextOccurrence.toDate();
    } else {
      return nextOccurrence.add(1, "week").toDate();
    }
  };

  // console.log(getNextOccurrence(5))

  const handleDateAndTimeConversion = (date, time, hours, minutes) => {
    const splitTime = time.split(":")
    let endSplitHours = Number(splitTime[0]) + hours
    let endSplitMinutes = Number(splitTime[1]) + minutes
    let finalTime
    if (endSplitMinutes > 60) {
      endSplitHours += 1
      // console.log("finalHours", finalHours)
      endSplitMinutes -= 60
      finalTime = endSplitHours + ":" + endSplitMinutes
      // console.log("finalTime", finalTime)
    } else if (endSplitMinutes === 60) {
      endSplitHours += 1
      // console.log("finalHours", finalHours)
      endSplitMinutes -= 60
      finalTime = endSplitHours + ":0" + endSplitMinutes
      // console.log("finalTime", finalTime)
    } else {
      finalTime = time
    }
    const endDateAndTime = date + " " + finalTime
    return endDateAndTime
    // console.log("FINAL DATE AND TIME", dateAndTime)
    // console.log(splitTime)
    // console.log("hours", endSplitHours)
    // console.log("minutes", endSplitMinutes)
  }

  useEffect(() => {
    const newEvents = allSessions.map((session) => {
      const { date, time } = session;
      const { name, hours, minutes, category } = session.event
      
      const startDateAndTime = date + " " + time
      const endDateAndTime = handleDateAndTimeConversion(date, time, hours, minutes)

      return {
        title: name,
        start: moment(startDateAndTime),
        end: moment(endDateAndTime),
      }
      // console.log(startDateAndTime)
      // const split_time = time.split(":");
      // const start_hour = Number(split_time[0]);
      // const start_minute = Number(split_time[1]);
      // const end_hour = start_hour + hours;
      // const end_minute = start_minute + minutes;
      
      // let color = selectEventColor(category)
      


      // return {
      //   title: name,
      //   start: moment().day(day).hour(start_hour).minute(start_minute).second(0).toDate(),
      //   end: moment().day(day).hour(end_hour).minute(end_minute).second(0).toDate(),
      //   color: color,
      // };
    });

    setEvents(newEvents)
  }, [allSessions]);

  // useEffect(() => {
  //   const newEvents = allEvents.map((event) => {
  //     const { name, day, time, hours, minutes, frequency, category } = event;
  //     const split_time = time.split(":");
  //     const start_hour = Number(split_time[0]);
  //     const start_minute = Number(split_time[1]);
  //     const end_hour = start_hour + hours;
  //     const end_minute = start_minute + minutes;
      
  //     let color = selectEventColor(category)

  //     console.log(frequency)
  //     return {
  //       title: name,
  //       start: moment().day(day).hour(start_hour).minute(start_minute).second(0).toDate(),
  //       end: moment().day(day).hour(end_hour).minute(end_minute).second(0).toDate(),
  //       color: color,
  //     };
  //   });

  //   setEvents(newEvents)
  // }, [allEvents]);

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