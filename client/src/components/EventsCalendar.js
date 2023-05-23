import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { RRule } from 'rrule'

const localizer = momentLocalizer(moment);

const ClassCalendar = ({ currentUser }) => {

    const businessHours = [
      {
        title: "Business Hours",
        start: moment().day("Monday").hour(6).minute(0).toDate(),
        end: moment().day("Monday").hour(23).minute(0).toDate(),
      },
      {
        title: "Business Hours",
        start: moment().day("Tuesday").hour(6).minute(0).toDate(),
        end: moment().day("Tuesday").hour(23).minute(0).toDate(),
      },
      {
        title: "Business Hours",
        start: moment().day("Wednesday").hour(6).minute(0).toDate(),
        end: moment().day("Wednesday").hour(23).minute(0).toDate(),
      },
      {
        title: "Business Hours",
        start: moment().day("Thursday").hour(6).minute(0).toDate(),
        end: moment().day("Thursday").hour(23).minute(0).toDate(),
      },
      {
        title: "Business Hours",
        start: moment().day("Friday").hour(6).minute(0).toDate(),
        end: moment().day("Friday").hour(23).minute(0).toDate(),
      },
      {
        title: "Business Hours",
        start: moment().day("Saturday").hour(8).minute(0).toDate(),
        end: moment().day("Saturday").hour(20).minute(0).toDate(),
      },
      // Sunday
      {
        title: "Business Hours",
        start: moment().day("Sunday").hour(8).minute(0).toDate(),
        end: moment().day("Sunday").hour(20).minute(0).toDate(),
      },
    ];

    return (
      <div>
        <h1>Calendar Page</h1>
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={businessHours}
            timeslots={1}
            style={{ height: "100vh" }}
          />
      </div>
    )
}

export default ClassCalendar