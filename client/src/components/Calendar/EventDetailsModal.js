import { useState, useContext } from 'react'
import { LoggedInUserContext } from '../App';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const EventDetailsModal = ({ clickedSession, setClickedSession, show, setShow }) => {

    const { currentUser } = useContext(LoggedInUserContext)
    
    const currentDate = new Date()
    console.log("Start Date", clickedSession.start)
    console.log("Current Date", currentDate)
    console.log(currentDate > clickedSession.start)

    const handleClose = () => setShow(false);
  
    const handleSignup = (event) => {
        event.preventDefault()
        console.log("Test Signup")
        fetch('/signups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'user_id': currentUser.id,
                'session_id': clickedSession.values.session_id,
            })
        })
        .then((response) => response.json())
        .then((signupData) => {
            console.log(signupData)
            const spaces = clickedSession.values.spaces
            setClickedSession((prevState) => ({
                ...prevState,
                [prevState.values.spaces]: spaces - 1
            }))
        })
    }

    const renderSpacesOrAvailability = () => {
        if (currentDate > clickedSession.start === true) {
            return <span>This event's start date has already passed.  Please sign up for a future {clickedSession.values.name}.</span>
        } else if (currentDate <= clickedSession.start && clickedSession.values.spaces > 0) {
            return <span style={{marginRight:'30%'}}>{clickedSession.values.spaces} spaces remaining.</span>
        } else {
            return <span style={{marginRight:'50%'}}>No spaces remaining.</span>
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{clickedSession.values.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{clickedSession.values.day}, {clickedSession.values.date} at {clickedSession.values.time}</Modal.Body>
            <Modal.Body>{clickedSession.values.description}</Modal.Body>
            <Modal.Footer>
                {renderSpacesOrAvailability()}
                {/* {clickedSession.values.spaces > 0 ? 
                <span style={{marginRight:'30%'}}>{clickedSession.values.spaces} spaces remaining.</span>
                : <span style={{marginRight:'50%'}}>No spaces remaining.</span>} */}
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {clickedSession.values.spaces > 0 && Object.keys(currentUser).length > 0 && currentDate < clickedSession.start ?
                <form onSubmit={handleSignup}>
                    <Button type="submit">Sign Up!</Button>
                </form>
                : null}
            </Modal.Footer>
      </Modal>
    );
  }

export default EventDetailsModal