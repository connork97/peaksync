import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { LoggedInUserContext, AllSessionsContext, SessionsToggleContext, SignupsToggleContext } from '../App';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import SignupData from '../AdminDashboard/Data/SignupData';
import { CurrentUserToggleContext } from '../App';

const EventDetailsModal = ({ clickedSession, setClickedSession, showGuestModal, setShowGuestModal, showAdminModal, setShowAdminModal }) => {

    const history = useHistory()
    const { currentUser } = useContext(LoggedInUserContext)
    const { setAllSessions } = useContext(AllSessionsContext)
    const { signupsToggle, setSignupsToggle } = useContext(SignupsToggleContext)
    const { sessionsToggle, setSessionsToggle } = useContext(SessionsToggleContext)
    const { currentUserToggle, setCurrentUserToggle } = useContext(CurrentUserToggleContext)

    const currentDate = new Date()

    console.log(clickedSession.values)
    const handleCloseGuestModal = () => setShowGuestModal(false);

    const renderSpacesOrAvailability = () => {
        if (currentDate > clickedSession.start === true) {
            return <span>This event's start date has already passed.  Please sign up for a future {clickedSession.values.name}.</span>
        } else if (currentDate <= clickedSession.start && clickedSession.values.spaces > 0) {
            return <span style={{marginRight:'auto'}}>{clickedSession.values.spaces} spaces remaining.</span>
        } else {
            return <span style={{marginRight:'auto'}}>No spaces remaining.</span>
        }
    }

    const handleConfirmSignup = (event) => {
        event.preventDefault()
        if (window.confirm(`Are you sure you want to signup for ${clickedSession.values.name} on ${clickedSession.values.day}, ${clickedSession.values.date} at ${clickedSession.values.time}?`) === true) {
            if (currentUser.membership.type !== 'Member') {
                event.target.submit()
            } else if (currentUser.membership.type === 'Member' && clickedSession.values.free_for_members === true) {
                fetch('/signups', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: currentUser.id,
                        session_id: clickedSession.values.session_id,
                    })
                })
                .then((response) => response.json())
                .then((newSignupData) => {
                    console.log(newSignupData)
                    setSignupsToggle(!signupsToggle)
                    setSessionsToggle(!sessionsToggle)
                    setCurrentUserToggle(!currentUserToggle)
                    window.alert("Since you're a member this one is on the house! Thanks for signing up!")
                    setShowGuestModal(false)
                })
            } else if (currentUser.membership.type === 'Member' && clickedSession.values.free_for_members === false) {
                event.target.submit()
            }
        } else {
            window.alert("Okay, signup cancelled.")
        }
    }

    // console.log(clickedSession.values.event_id, clickedSession.values.session_id, currentUser.id)
    // const formAction = () => {
    //     fetch(`/create-event-checkout-session/${clickedSession.values.event_id}/${clickedSession.values.session_id}/${currentUser.id}`, {
    //         method: 'POST'
    //     })
    // }
    // const formAction = `/create-event-checkout-session/${clickedSession.values.event_id}/${clickedSession.values.session_id}/${currentUser.id}`

    const handleShowAdminModal = () => {
        handleCloseGuestModal()
        setShowAdminModal(true)
        console.log(clickedSession)
    }

    return (
        <>
            <Modal show={showGuestModal} onHide={handleCloseGuestModal} style={{position:'relative', scale:'1.75', top:'-70vh'}}>
                <Modal.Header closeButton>
                    <Modal.Title>{clickedSession.values.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{clickedSession.values.day}, {clickedSession.values.date} at {clickedSession.values.time}</Modal.Body>
                <Modal.Body>{clickedSession.values.description}</Modal.Body>
                <Modal.Footer>
                    {renderSpacesOrAvailability()}
                    <Button variant="secondary" onClick={handleCloseGuestModal}>
                        Close
                    </Button>
                    {clickedSession.values.spaces > 0 && Object.keys(currentUser).length > 0 && currentDate < clickedSession.start ?
                    <form onSubmit={handleConfirmSignup} action={`/create-event-checkout-session/${clickedSession.values.event_id}/${clickedSession.values.session_id}/${currentUser.id}`} method='POST'>
                        <Button type="submit">Sign Up!</Button>
                    </form>
                    : null}
                    {currentUser.admin ?
                    <Button onClick={handleShowAdminModal}>View/Edit</Button>
                    : null}
                </Modal.Footer>
            </Modal>
            {/* <Modal show={showAdminModal} onHide={() => setShowAdminModal(false)} style={{position:'relative', scale:'1.75', top:'-70vh'}}>
                <Modal.Header closeButton>
                    <Modal.Title>{clickedSession.values.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {renderClickedSessionDetails}
                    </ListGroup>
                </Modal.Body>
            </Modal> */}
        </>
    );
  }

export default EventDetailsModal