import { useState } from 'react'

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const UserBookings = ({ selectedUser }) => {

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

    const renderBookings = selectedUserBookings.map((signup) => {
        return (
            <ListGroup.Item style={{display:"flex"}}>
                {signup.id} - {signup.session.event.name} - {signup.created_at} - {signup.paid === true ? "Paid" : <Button style={{color:"white", backgroundColor:"red", borderRadius:"15px"}}>Payment Owed</Button>}<Button onClick={() => handleCancelBooking(signup)} style={{marginLeft:"auto"}}>Cancel Booking</Button>
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