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
import Dashboard from "./Dashboard.js"

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/rates'>
          <Rates />
        </Route>
        <Route exact path='/classes'>
          <Classes />
        </Route>
        <Route exact path='/about-us'>
          <AboutUs />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <SignUp />
        </Route>
        <Route exact path='/dashboard'>
          <Dashboard />
        </Route>
      </Switch>
    </>
  )
}

export default App;
