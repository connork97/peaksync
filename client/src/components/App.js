import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import NavBar from "./NavBar.js";
import Home from "./Home.js";
import Classes from "./Classes.js"
import Rates from "./Rates.js"
import AboutUs from "./AboutUs.js"
import Login from "./Login.js"
import SignUp from "./SignUp.js"
import UserDatabase from "./AdminDashboard.js/UserDatabase.js"
import UserProfile from "./UserProfile/UserProfile.js";
import AdminDashboard from "./AdminDashboard.js/AdminDashboard.js";

function App() {

  const [allUsers, setAllUsers] = useState([])
  const [allClasses, setAllClasses] = useState([])
  const [allMemberships, setAllMemberships] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    console.log(allUsers)
  }, [allUsers])

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
            setAllMemberships={setAllMemberships}
            setAllClasses={setAllClasses}
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
            allClasses={allClasses}
            setAllClasses={setAllClasses}
            allMemberships={allMemberships}
            setAllMemberships={setAllMemberships}
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
