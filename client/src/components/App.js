import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import NavBar from "./NavBar.js";
import Home from "./Home.js";
import EventsCalendar from "./EventsCalendar.js"
import Rates from "./Rates.js"
import AboutUs from "./AboutUs.js"
import Login from "./Login.js"
import SignUp from "./SignUp.js"
import UserDatabase from "./AdminDashboard.js/UserDatabase.js"
import UserProfile from "./UserProfile/UserProfile.js";
import AdminDashboard from "./AdminDashboard.js/AdminDashboard.js";

function App() {

  const [currentUser, setCurrentUser] = useState({})
  const [allUsers, setAllUsers] = useState([])
  const [allEvents, setAllEvents] = useState([])
  const [allSessions, setAllSessions] = useState([])
  const [allMemberships, setAllMemberships] = useState([])
  const [generalToggle, setGeneralToggle] = useState(false)

  useEffect(() => {
    console.log(allUsers)
  }, [allUsers])
  useEffect(() => {
    fetch('/sessions')
    .then((response) => response.json())
    .then((allSessionsData) => {
        console.log(allSessionsData)
        setAllSessions(allSessionsData)
    })
}, [generalToggle])
  return (
    <>
      <NavBar
        currentUser={currentUser}
        allUsers={allUsers}
      />
      <Switch>
        <Route exact path='/'>
          <Home currentUser={currentUser} />
        </Route>
        <Route exact path='/rates'>
          <Rates currentUser={currentUser} />
        </Route>
        <Route exact path='/calendar'>
          <EventsCalendar
            currentUser={currentUser}
            allEvents={allEvents}
            allSessions={allSessions}
            generalToggle={generalToggle}
          />
        </Route>
        <Route exact path='/about-us'>
          <AboutUs currentUser={currentUser} />
        </Route>
        <Route exact path='/login'>
          <Login
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            allUsers={allUsers}
            setAllUsers={setAllUsers}
            setAllMemberships={setAllMemberships}
            setAllEvents={setAllEvents}
            allSessions={allSessions}
            setAllSessions={setAllSessions}
          />
        </Route>
        <Route exact path='/signup'>
          <SignUp
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path='/admin-dashboard'>
          <AdminDashboard
            currentUser={currentUser}
            allUsers={allUsers}
            setAllUsers={setAllUsers}
            allEvents={allEvents}
            setAllEvents={setAllEvents}
            allMemberships={allMemberships}
            setAllMemberships={setAllMemberships}
            allSessions={allSessions}
            setAllSessions={setAllSessions}
            generalToggle={generalToggle}
            setGeneralToggle={setGeneralToggle}
          />
        </Route>
        <Route exact path='/database'>
          <UserDatabase
            allUsers={allUsers}
            setAllUsers={setAllUsers} 
            currentUser={currentUser}
          />
        </Route>
        <Route exact path='/profile'>
          <UserProfile 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            allUsers={allUsers}
            setAllUsers={setAllUsers}
          />
        </Route>
      </Switch>
    </>
  )
}

export default App;
