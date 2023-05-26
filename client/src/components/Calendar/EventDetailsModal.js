import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const EventDetailsModal = ({ clickedSession, show, setShow }) => {

    const handleClose = () => setShow(false);
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{clickedSession.values.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{clickedSession.values.day}, {clickedSession.values.date} at {clickedSession.values.time}</Modal.Body>
            <Modal.Body>{clickedSession.values.description}</Modal.Body>
            <Modal.Body>
                {clickedSession.values.spaces > 0 ? 
                clickedSession.values.spaces + "spaces remaining."
                : "No spaces remaining."}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {clickedSession.values.spaces > 0 ?
                <form action={`/create-event-checkout-session/${clickedSession.values.id}`} method="POST">
                    <Button type="submit">Sign Up!</Button>
                </form>
                : null}
            </Modal.Footer>
      </Modal>
    );
  }

export default EventDetailsModal