import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import NavBar from "./NavBar.js";
import Home from "./Home.js";
import EventsCalendar from "./EventsCalendar.js"
import Rates from "./Rates.js"
import Login from "./Login.js"
import SignUp from "./SignUp.js"
import UserDatabase from "./AdminDashboard.js/UserDatabase.js"
import UserProfile from "./UserProfile/UserProfile.js";
import AdminDashboard from "./AdminDashboard.js/AdminDashboard.js";
import MembershipOfferings from "./Offerings/MembershipOfferings.js";
import ClassOfferings from "./Offerings/ClassOfferings.js";

export const AllUsersContext = React.createContext()
export const AllEventsContext = React.createContext()
export const AllSessionsContext = React.createContext()
export const AllMembershipsContext = React.createContext()
export const GeneralToggleContext = React.createContext()
export const LoggedInUserContext = React.createContext()

function App() {

  const [currentUser, setCurrentUser] = useState({})
  const [allUsers, setAllUsers] = useState([])
  const [allEvents, setAllEvents] = useState([])
  const [allSessions, setAllSessions] = useState([])
  const [allMemberships, setAllMemberships] = useState([])
  const [generalToggle, setGeneralToggle] = useState(false)

  const allUsersContextObject = {
    allUsers,
    setAllUsers
  }

  const allEventsContextObject = {
    allEvents,
    setAllEvents
  }

  const allSessionsContextObject = {
    allSessions,
    setAllSessions
  }

  const allMembershipsContextObject = {
    allMemberships,
    setAllMemberships
  }

  const generalToggleContextObject = {
    generalToggle,
    setGeneralToggle
  }

  const loggedInUserContextObject = {
    currentUser,
    setCurrentUser
  }

  // useEffect(() => {
  //   console.log(allUsers)
  // }, [allUsers])
  // useEffect(() => {
  //   fetch('/sessions')
  //   .then((response) => response.json())
  //   .then((allSessionsData) => {
  //       console.log(allSessionsData)
  //       setAllSessions(allSessionsData)
  //   })
  // }, [generalToggle])

  return (
    <>
    <AllUsersContext.Provider value={allUsersContextObject}>
      <AllEventsContext.Provider value={allEventsContextObject}>
        <AllSessionsContext.Provider value={allSessionsContextObject}>
          <AllMembershipsContext.Provider value={allMembershipsContextObject}>
            <GeneralToggleContext.Provider value={generalToggleContextObject}>
              <LoggedInUserContext.Provider value={loggedInUserContextObject}>
                <NavBar/>
                <Switch>
                  <Route exact path='/'>
                    <Home currentUser={currentUser} />
                  </Route>
                  <Route exact path='/rates'>
                    <Rates />
                  </Route>
                  <Route exact path='/calendar'>
                    <EventsCalendar />
                  </Route>
                  <Route exact path='/login'>
                    <Login />
                  </Route>
                  <Route exact path='/signup'>
                    <SignUp />
                  </Route>
                  <Route exact path='/admin-dashboard'>
                    <AdminDashboard />
                  </Route>
                  <Route exact path='/database'>
                    <UserDatabase />
                  </Route>
                  <Route exact path='/profile'>
                    <UserProfile />
                  </Route>
                  <Route exact path='/offerings/memberships'>
                    <MembershipOfferings />
                  </Route>
                  <Route exact path='/offerings/classes'>
                    <ClassOfferings />
                  </Route>
                </Switch>
              </LoggedInUserContext.Provider>
            </GeneralToggleContext.Provider>
          </AllMembershipsContext.Provider>
        </AllSessionsContext.Provider>
      </AllEventsContext.Provider>
    </AllUsersContext.Provider>
    </>
  )
}

export default App;
