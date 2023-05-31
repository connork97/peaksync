import { Link } from "react-router-dom"
import { useContext, useEffect } from 'react'
import { LoggedInUserContext, AllUsersContext } from "./App"

import Dropdown from 'react-bootstrap/Dropdown'

const NavBar = () => {

    const { currentUser } = useContext(LoggedInUserContext)
    const { allUsers } = useContext(AllUsersContext)

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
            <Link to="/calendar" exact="true" className="navBarLink">Calendar</Link>
            <Dropdown className="navBarLink">
                <Dropdown.Toggle style={{background:"white", color:'black', border:'none', textDecoration:'underline', fontSize:'1.9rem'}}>Rates and Offerings</Dropdown.Toggle>
                <Dropdown.Menu style={{color:'black', width:'100%', textAlign:'right'}}>
                    <Dropdown.Item style={{color:'black'}}>
                        <Link to='/offerings/memberships' exact="true" className='navBarDropdownLink' style={{color:'black', textDecoration:'none'}}>Memberships</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='/offerings/classes' exact="true" className='navBarDropdownLink' style={{color:'black', textDecoration:'none'}}>Classes</Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Link to="/login" exact="true" className="navBarLink">Account</Link>
            {Object.keys(currentUser).length !== 0 ? renderDashboardNavLink() : null}
        </div>
    )
}

export default NavBar