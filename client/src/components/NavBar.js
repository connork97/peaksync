import { Link } from "react-router-dom"
import { userState } from "../atoms"
import { useRecoilState } from 'recoil'
import { useState, useEffect } from 'react'

const NavBar = ({ currentUser }) => {

    // const [currentUser, setCurrentUser] = useRecoilState(userState)

    const userAccess = currentUser.admin

    useEffect(() => {
        console.log(currentUser)
        console.log(userAccess)
    }, [currentUser, userAccess])

    return (
        <div id="navBarDiv" style={{display:"flex", justifyContent:"space-evenly", textDecoration:"none"}}>
            <Link to="/" exact="true" className="navBarLink">Home</Link>
            <Link to="/rates" exact="true" className="navBarLink">Rates</Link>
            <Link to="/classes" exact="true" className="navBarLink">Classes</Link>
            <Link to="/about-us" exact="true" className="navBarLink">About Us</Link>
            <Link to="/login" exact="true" className="navBarLink">Login</Link>
            {userAccess ? 
            <Link to="/dashboard" exact="true" className="navBarLink">Dashboard</Link>
            : <Link to="/profile" exact="true" className="navBarLink">Dashboard</Link>
            }
        </div>
    )
}

export default NavBar