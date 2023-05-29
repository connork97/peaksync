import { useState, useContext } from 'react'
import { LoggedInUserContext, AllSessionsContext, GeneralToggleContext } from '../App';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const EventDetailsModal = ({ clickedSession, setClickedSession, show, setShow }) => {

    const { currentUser } = useContext(LoggedInUserContext)
    const { setAllSessions } = useContext(AllSessionsContext)
    const { generalToggle, setGeneralToggle } = useContext(GeneralToggleContext)

    const currentDate = new Date()
    console.log("Start Date", clickedSession.start)
    console.log("Current Date", currentDate)
    console.log(currentDate > clickedSession.start)

    const handleClose = () => setShow(false);

    const renderSpacesOrAvailability = () => {
        if (currentDate > clickedSession.start === true) {
            return <span>This event's start date has already passed.  Please sign up for a future {clickedSession.values.name}.</span>
        } else if (currentDate <= clickedSession.start && clickedSession.values.spaces > 0) {
            return <span style={{marginRight:'30%'}}>{clickedSession.values.spaces} spaces remaining.</span>
        } else {
            return <span style={{marginRight:'50%'}}>No spaces remaining.</span>
        }
    }

    const handleConfirmSignup = (event) => {
        event.preventDefault()
        if (window.confirm(`Are you sure you want to signup for ${clickedSession.values.name} on ${clickedSession.values.day}, ${clickedSession.values.date} at ${clickedSession.values.time}?`) === true) {
            event.target.submit()
        } else {
            window.alert("Okay, signup cancelled.")
        }
    }

    const formAction = `/create-event-checkout-session/${clickedSession.values.event_id}/${currentUser.id}/${clickedSession.values.session_id}`
    
    return (
        <Modal show={show} onHide={handleClose} style={{position:'relative', scale:'1.75', top:'-70vh'}}>
            <Modal.Header closeButton>
            <Modal.Title>{clickedSession.values.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{clickedSession.values.day}, {clickedSession.values.date} at {clickedSession.values.time}</Modal.Body>
            <Modal.Body>{clickedSession.values.description}</Modal.Body>
            <Modal.Footer>
                {renderSpacesOrAvailability()}
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {clickedSession.values.spaces > 0 && Object.keys(currentUser).length > 0 && currentDate < clickedSession.start ?
                <form onSubmit={handleConfirmSignup} action={formAction} method='POST'>
                    <Button type="submit">Sign Up!</Button>
                </form>
                : null}
            </Modal.Footer>
      </Modal>
    );
  }

export default EventDetailsModal