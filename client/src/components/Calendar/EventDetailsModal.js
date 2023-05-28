import { useState, useContext } from 'react'
import { LoggedInUserContext } from '../App';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const EventDetailsModal = ({ clickedSession, setClickedSession, show, setShow }) => {

    const { currentUser } = useContext(LoggedInUserContext)

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

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{clickedSession.values.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{clickedSession.values.day}, {clickedSession.values.date} at {clickedSession.values.time}</Modal.Body>
            <Modal.Body>{clickedSession.values.description}</Modal.Body>
            <Modal.Body>
                {clickedSession.values.spaces > 0 ? 
                clickedSession.values.spaces + " spaces remaining."
                : "No spaces remaining."}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {clickedSession.values.spaces > 0 && Object.keys(currentUser).length > 0 ?
                <form onSubmit={handleSignup}>
                {/* // <form onSubmit={handleSignup} action={`/create-event-checkout-session/${clickedSession.values.event_id}`} method="POST"> */}
                    <Button type="submit">Sign Up!</Button>
                </form>
                : null}
            </Modal.Footer>
      </Modal>
    );
  }

export default EventDetailsModal