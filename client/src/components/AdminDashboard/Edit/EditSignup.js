import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AllSessionsContext, AllSignupsContext } from '../../App'

import moment from 'moment'

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const EditSignup = () => {

    const location = useLocation()
    const signupToEdit = location.state
    console.log(signupToEdit)
    const { allSessions, setAllSessions } = useContext(AllSessionsContext)
    const { allSignups, setAllSignups } = useContext(AllSignupsContext)

    const handleEditSignup = (event) => {
        if (window.confirm("Are you sure you want to relocate this signup?") === true) {
            fetch(`/signups/${signupToEdit.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({session_id: event.target.value}),
            })
            .then((response) => response.json())
            .then((editedSignupData) => console.log(editedSignupData))
        } else {
            window.alert("Okay, your signup will remain unchanged.")
        }
    }

    const renderAllAvailableSessions = allSessions.map((session) => {
        const availableSpaces = session.event.capacity - session.signups
        const availableSession = session.event.capacity > session.signups
        const sameEventName = session.event.name === signupToEdit.session.event.name
        const eventStart = moment(session.date + " " + session.time, "YYYY-MM-DD HH:mm").toDate()
        const currentDate = new Date()
        const isFutureDate = eventStart > currentDate
        // const currentTime = new Time()
        if (availableSession && sameEventName && isFutureDate) {
            return (
                <ListGroup.Item>
                    {signupToEdit.session.id} - 
                    {session.id} - 
                    {session.event.name} - 
                    {session.date} - 
                    {session.time} - 
                    Spaces Remaining: {availableSpaces} 
                    <Button value={session.id} onClick={handleEditSignup}>
                        Move Signup to this Event
                    </Button>
                </ListGroup.Item>
            )
            // console.log(session)
            // console.log(signupToEdit)
            // console.log(eventStart)
            // console.log(new Date())
            // console.log(eventStart)
            // console.log(eventStart > currentDate)
            // console.log(currentDate.getHours())
        }
    })

    return (
        <>
            <h1>Edit Signup Page</h1>
            <h4>Current Signup:</h4>
            <p>{signupToEdit.session.event.name} - Date: {signupToEdit.session.date} Time: {signupToEdit.session.time}</p>
            <h2>Available Classes/Events to Relocate Signup:</h2>
            <ListGroup>
                {renderAllAvailableSessions}
            </ListGroup>
        </>
    )
}

export default EditSignup