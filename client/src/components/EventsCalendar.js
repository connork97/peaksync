import React, { useState, Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { RRule } from 'rrule'

const localizer = momentLocalizer(moment);

const EventsCalendar = ({ currentUser, allClasses }) => {

  const events = []

  const allClassEvents = allClasses.map((clas) => {
    const {name, day, time, hours, minutes, recurring} = clas
    const split_time = time.split(":")
    const start_hour = Number(split_time[0])
    const start_minute = Number(split_time[1])
    const end_hour = start_hour + hours
    const end_minute = start_minute + minutes
    console.log(end_minute)
    console.log(typeof Number(split_time[1]))
    const newEvent = {
      title: name,
      start: moment().day(day).hour(start_hour).minute(start_minute).second(0).toDate(),
      end: moment().day(day).hour(end_hour).minute(end_minute).second(0).toDate()
    }
    events.push(newEvent)
  })
  console.log(events)

    // const businessHours = [
    //   {
    //     title: "Business Hours",
    //     start: moment().day("Monday").hour(6).minute(0).toDate(),
    //     end: moment().day("Monday").hour(23).minute(0).toDate(),
    //   },
    //   {
    //     title: "Business Hours",
    //     start: moment().day("Tuesday").hour(6).minute(0).toDate(),
    //     end: moment().day("Tuesday").hour(23).minute(0).toDate(),
    //   },
    //   {
    //     title: "Business Hours",
    //     start: moment().day("Wednesday").hour(6).minute(0).toDate(),
    //     end: moment().day("Wednesday").hour(23).minute(0).toDate(),
    //   },
    //   {
    //     title: "Business Hours",
    //     start: moment().day("Thursday").hour(6).minute(0).toDate(),
    //     end: moment().day("Thursday").hour(23).minute(0).toDate(),
    //   },
    //   {
    //     title: "Business Hours",
    //     start: moment().day("Friday").hour(6).minute(0).toDate(),
    //     end: moment().day("Friday").hour(23).minute(0).toDate(),
    //   },
    //   {
    //     title: "Business Hours",
    //     start: moment().day("Saturday").hour(8).minute(0).toDate(),
    //     end: moment().day("Saturday").hour(20).minute(0).toDate(),
    //   },
    //   // Sunday
    //   {
    //     title: "Business Hours",
    //     start: moment().day("Sunday").hour(8).minute(0).toDate(),
    //     end: moment().day("Sunday").hour(20).minute(0).toDate(),
    //   },
    // ];

    return (
      <div>
        <h1>Calendar Page</h1>
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="week"
            events={events}
            timeslots={1}
            style={{ height: "100vh" }}
          />
      </div>
    )
}

export default EventsCalendar