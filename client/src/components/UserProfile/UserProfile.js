import { useState, useEffect } from "react"
import { userState } from "../../atoms"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useHistory, useLocation } from 'react-router-dom'

import ProfileInfo from "./ProfileInfo"
import UserBookings from './UserBookings'
import UserPayments from './UserPayments'

const UserProfile = () => {

    const location = useLocation()
    const selectedUser = location.state
    console.log(selectedUser)
    const [shouldRenderBookings, setShouldRenderBookings] = useState(false)

    
    return (
        // <h1>{user.first_name}</h1>
        <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3"
            justify
        >
        <Tab eventKey="profile" title="Profile">
            <ProfileInfo selectedUser={selectedUser} />
        </Tab>
        <Tab eventKey="bookings" title="Bookings">
            <UserBookings selectedUser={selectedUser} />
        </Tab>
            {/* <UserPayments selectedUser={selectedUser} /> */}
        <Tab eventKey="payments" title="Payments">
            <UserPayments selectedUser={selectedUser} />
        </Tab>
        </Tabs>
    )
}

export default UserProfile