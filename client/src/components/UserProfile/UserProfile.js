import { useState, useEffect } from "react"
import { userState } from "../../atoms"
import { useRecoilState } from 'recoil'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useHistory, useLocation } from 'react-router-dom'

import ProfileInfo from "./ProfileInfo"
import UserBookings from './UserBookings'
import UserPayments from './UserPayments'

const UserProfile = () => {

    const location = useLocation()
    
    const [currentUser, setCurrentUser] = useRecoilState(userState)

    let selectedUser
    if (currentUser.admin === true) {
        selectedUser = location.state
    } else {
        selectedUser = currentUser
    }
    // const selectedUser = location.state
    console.log(selectedUser)

    return (
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