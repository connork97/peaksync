import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { LoggedInUserContext } from '../App'

import moment from 'moment'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const UserBookings = ({ selectedUser }) => {

    const history = useHistory()

    const { currentUser } = useContext(LoggedInUserContext)
    const [selectedUserBookings, setSelectedUserBookings] = useState(selectedUser.signups)

    const handleCancelBooking = (signup) => {
        if (window.confirm("Are you sure you want to cancel this booking?") == true) {
            fetch(`/signups/${signup.id}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((deletedSignupData) => console.log(deletedSignupData))
            window.alert("Booking cancelled.")
            setSelectedUserBookings(selectedUserBookings.filter((booking) => booking.id !== signup.id))
        } else {
            window.alert("Okay. Your booking is still active.")
        }
    }

    const renderBookings = selectedUserBookings.reverse().map((signup) => {
        console.log(signup.session)
        const datetimeString = `${signup.session.date}T${signup.session.time}:00`

        const datetime = new Date(datetimeString)

        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }

        const formattedDateTime = datetime.toLocaleString('en-US', options)

        return (
            <ListGroup.Item className='listGroupItemWithEndButtons' style={{display:"flex"}}>
                {signup.session.event.name} - {formattedDateTime} - {signup.session.event.free_for_members === true && selectedUser.membership.type === 'Member' ? "Paid" : <Button style={{color:"white", backgroundColor:"red", borderRadius:"15px"}}>Payment Owed</Button>}
                <Button onClick={() => history.push({pathname:'/edit/signup', state:signup})} style={{marginLeft:"auto"}}>Edit Booking</Button>
            </ListGroup.Item>
        )
    })
    return (
        <ListGroup>
            {renderBookings}
        </ListGroup>
    )
}

export default UserBookings