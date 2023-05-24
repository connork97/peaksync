import { useState, useContext } from 'react'
import { AllSessionsContext, AllEventsContext, GeneralToggleContext } from '../App'

import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateSession = () => {

    const { allSessions, setAllSessions } = useContext(AllSessionsContext)
    const { allEvents } = useContext(AllEventsContext)
    const { generalToggle, setGeneralToggle } = useContext(GeneralToggleContext)

    const [selectedDropdownEvent, setSelectedDropdownEvent] = useState("Classes and Events")

    const [newSession, setNewSession] = useState({
        "date": "",
        "time": "",
        "event_id": null
    })

    const handleDiscardSession = () => {
        setNewSession({
            "date": "",
            "time": "",
            "event_id": null
        })
    }

    const handleNewSessionChange = (event) => {
        const {name, value} = event.target
        setNewSession((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSelectDropdownEvent = (event) => {
        setSelectedDropdownEvent(event.target.name)
        console.log(event.target.id)
        setNewSession((prevState) => ({
            ...prevState,
            event_id: Number(event.target.id)
        }))
    }
    const renderEventDropdownItems = allEvents.map((ev) => {
        // console.log(ev)
        return (
            <Dropdown.Item name={ev.name} id={ev.id} onClick={(event) => handleSelectDropdownEvent(event)}>{ev.name}</Dropdown.Item>
        )
    })

    const handleSessionSubmit = (event) => {
        event.preventDefault()
        fetch('/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSession)
        })

        setGeneralToggle(!generalToggle)
    }

    return (
        <Form id="createEventForm" onSubmit={handleSessionSubmit}>
            <h4>Note! This is not for creating brand new events or classes.</h4>
            <h4>This is for adding existing options to the calendar.</h4>
            <h4>Please navigate to the "Create an Event/Class" section to create a brand new offering.</h4>
            <br></br>
            Choose a Class or Event to Add to the Calendar:
            <Dropdown>
                <br></br>
                <Dropdown.Toggle>{selectedDropdownEvent}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item name="Classes and Events" onClick={handleSelectDropdownEvent}>Classes and Events</Dropdown.Item>
                    {renderEventDropdownItems}
                </Dropdown.Menu>
            </Dropdown>
            <br></br>
            <Form.Label>Start Date:</Form.Label>
            <Form.Control name="date" value={newSession.date} onChange={handleNewSessionChange}></Form.Control>
            <Form.Text>Date must be in format of YYYY-MM-DD</Form.Text>
            <br></br><br></br>
            <Form.Label>Start Time:</Form.Label>
            <Form.Control name="time" value={newSession.time} onChange={handleNewSessionChange}></Form.Control>
            <Form.Text>Time must be in the format of HH:MM</Form.Text>
            <br></br><br></br>
            <Button type="submit">Create New Calendar Item</Button>
            <Button onClick={handleDiscardSession}>Discard Calendar Item</Button>
            <br></br><br></br>
        </Form>
    )
}

export default CreateSession