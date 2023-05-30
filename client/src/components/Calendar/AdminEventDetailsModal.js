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
            <ListGroup.Item className='modalListGroupWithButton'>{signup.user.first_name} {signup.user.last_name} <Button className="modalButton" value={signup.id} onClick={handleEditSignupClick}>Edit Signup</Button></ListGroup.Item>
        )
    })

    return (
        <Modal id="adminSessionDetailsModal" show={showAdminModal} onHide={() => setShowAdminModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{clickedSession.values.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="adminModalDiv">
                    {clickedSession.values.signups.length > 0 ?
                    <ListGroup>
                        {renderClickedSessionDetails}
                    </ListGroup>
                    : <ListGroup.Item>There are no signups for this event yet.</ListGroup.Item>}
                </div>
                </Modal.Body>
            </Modal>
    )
}

export default AdminEventDetailsModal