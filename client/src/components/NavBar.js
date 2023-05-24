import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from 'react'
import { LoggedInUserContext, AllUsersContext } from "./App"

const NavBar = () => {

    const { currentUser } = useContext(LoggedInUserContext)
    const { allUsers } = useContext(AllUsersContext)
    // useEffect(() => {
    //     console.log(currentUser)
    // }, [currentUser, allUsers])

    const renderDashboardNavLink = () => {
        if (currentUser.admin && allUsers.length !== 0) {
            return (
                <Link to="/admin-dashboard" exact="true" className="navBarLink">Dashboard</Link>
                )
        } else if (!currentUser.admin) {
            return (
                <Link to="/profile" exact="true" className="navBarLink">Dashboard</Link>
                )
        }
    }

    return (
        <div id="navBarDiv" style={{display:"flex", justifyContent:"space-evenly", textDecoration:"none"}}>
            <Link to="/" exact="true" className="navBarLink">Home</Link>
            <Link to="/rates" exact="true" className="navBarLink">Rates</Link>
            <Link to="/calendar" exact="true" className="navBarLink">Calendar</Link>
            <Link to="/about-us" exact="true" className="navBarLink">About Us</Link>
            <Link to="/login" exact="true" className="navBarLink">Login</Link>
            {Object.keys(currentUser).length !== 0 ? renderDashboardNavLink() : null}
        </div>
    )
}

export default NavBar