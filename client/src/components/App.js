import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

// import { useRecoilState } from 'recoil'
// import { userState, allUsersAtomState } from "../atoms.js";

import NavBar from "./NavBar.js";
import Home from "./Home.js";
import Classes from "./Classes.js"
import Rates from "./Rates.js"
import AboutUs from "./AboutUs.js"
import Login from "./Login.js"
import SignUp from "./SignUp.js"
import Dashboard from "./Dashboard.js"
import UserProfile from "./UserProfile/UserProfile.js";

function App() {

  const [allUsers, setAllUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    console.log(allUsers)
  }, allUsers)

  // useEffect(() => {
  //   if (currentUser.admin === true) {
  //     fetch("/users")
  //     .then((response) => response.json())
  //     .then((userData) => setAllUsers(userData))
  //   } else {
  //     console.log("No admin priveledges")
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log(allUsers)
  // }, [allUsers])

  return (
    <>
      <NavBar currentUser={currentUser} />
      <Switch>
        <Route exact path='/'>
          <Home currentUser={currentUser} />
        </Route>
        <Route exact path='/rates'>
          <Rates currentUser={currentUser} />
        </Route>
        <Route exact path='/classes'>
          <Classes currentUser={currentUser} />
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
          />
        </Route>
        <Route exact path='/signup'>
          <SignUp
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path='/dashboard'>
          <Dashboard
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
