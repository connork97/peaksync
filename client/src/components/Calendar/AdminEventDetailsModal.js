import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { LoggedInUserContext, AllSessionsContext, GeneralToggleContext } from '../App';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const AdminEventDetailsModal = ({ clickedSession, setClickedSession, showGuestModal, setShowGuestModal, showAdminModal, setShowAdminModal }) => {
    
    const history = useHistory()

    const handleEditSignupClick = (event) => {
        console.log(clickedSession.values.id)
        console.log(event.target.value)
        fetch(`/signups/${event.target.value}`)
        .then((response) => response.json())
        .then((signupData) => history.push({pathname:'/edit/signup', state:signupData}))
    }
    console.log(clickedSession.values.signups.length)

    const renderClickedSessionDetails = clickedSession.values.signups.map((signup) => {
        return (
            <ListGroup.Item>{signup.user.first_name} {signup.user.last_name} <Button value={signup.id} onClick={handleEditSignupClick}>Edit Signup</Button></ListGroup.Item>
        )
    })

    return (
        <Modal show={showAdminModal} onHide={() => setShowAdminModal(false)} style={{position:'relative', scale:'1.75', top:'-70vh'}}>
            <Modal.Header closeButton>
                <Modal.Title>{clickedSession.values.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {clickedSession.values.signups.length > 0 ?
                <ListGroup>
                    {renderClickedSessionDetails}
                </ListGroup>
                : <ListGroup.Item>There are no signups for this event yet.</ListGroup.Item>}
            </Modal.Body>
        </Modal>
    )
}

export default AdminEventDetailsModal