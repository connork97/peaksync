import styles from './NavBar.module.css'

import { Link } from "react-router-dom"
import { useContext } from 'react'
import { LoggedInUserContext } from "./App"

import Dropdown from 'react-bootstrap/Dropdown'

const NavBar = () => {

    const { currentUser } = useContext(LoggedInUserContext)
      
    return (
        <div className={styles.navBarDiv}>
            <Link to="/" exact="true" className="navBarLink">Home</Link>
            <Link to="/calendar" exact="true" className="navBarLink">Calendar</Link>
            <Dropdown className="navBarLink">
                <Dropdown.Toggle className={styles.dropdownToggle}>Rates and Offerings</Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropdownMenu}>
                    <Dropdown.Item>
                        <Link to='/offerings/memberships' exact="true" className={styles.dropdownLink}>Memberships</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='/offerings/classes' exact="true" className={styles.dropdownLink}>Classes</Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Link to="/account" exact="true" className="navBarLink">Account</Link>
            {currentUser.admin && <Link to="/admin-dashboard" exact="true" className="navBarLink">Dashboard</Link>}
        </div>
    )
}

export default NavBar