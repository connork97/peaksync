import { useState, useContext } from 'react'
import { AllEventsContext } from '../../App'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateEvent = () => {

    const { allEvents, setAllEvents } = useContext(AllEventsContext)

    const [newEvent, setNewEvent] = useState({
        "name": "",
        "price": "",
        "day": "",
        "time": "",
        "category": "",
        "description": "",
        "capacity": 0,
        "hours": 0,
        "minutes": 0,
        "free_for_members": false
    })

    const handleDiscardEvent = () => {
        setNewEvent({
            "name": "",
            "price": "",
            "day": "",
            "time": "",
            "category": "",
            "description": "",
            "capacity": 0,
            "hours": 0,
            "minutes": 0,
            "free_for_members": false
        })
    }

    const handleNewEventChange = (event) => {
        const {name, value} = event.target
        setNewEvent((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleFreeForMembersChange = (event) => {
        console.log(event.target.value)
        setNewEvent((prevState) => ({
            ...prevState,
            free_for_members: event.target.value
        }))
        console.log(newEvent.free_for_members)
    }

    const handleEventSubmit = (event) => {
        event.preventDefault()
        fetch('/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent)
        })
        .then((response) => response.json())
        .then((newEventData) => {
            console.log(newEventData)
            const updatedAllEvents = [...allEvents, newEventData]
            setAllEvents(updatedAllEvents)
        })
    }

    return (
        <Form id="createEventForm" onSubmit={handleEventSubmit}>
            <h4>Note! This is not for adding existing classes to the calendar.</h4>
            <h4>This is for creating brand new offerings.</h4>
            <h4>Please navigate to the "Add to Calendar" for specific occurances of a class.</h4>
            <Form.Label>Name:</Form.Label>
                <Form.Control name="name" type="text" value={newEvent.name} onChange={handleNewEventChange}></Form.Control>
            <br></br>
            <Form.Label>Price:</Form.Label>
                <Form.Control name="price" type="text" value={newEvent.price} onChange={handleNewEventChange}></Form.Control>
            <br></br>
            <Form.Label>Category:</Form.Label>
                <Form.Control name="category" type="text" value={newEvent.category} onChange={handleNewEventChange}></Form.Control>
                <Form.Text>Ex: "Climing", "Yoga", "Fitness", "Event", etc</Form.Text>
            <br></br><br></br>
            <Form.Label>Capacity:</Form.Label>
                <Form.Control name="capacity" type="number" value={newEvent.capacity} onChange={handleNewEventChange}></Form.Control>
            <br></br>
            <Form.Label>Hours:</Form.Label>
                <Form.Control name="hours" type="number" value={newEvent.hours} onChange={handleNewEventChange}></Form.Control>
            <br></br>
            <Form.Label>Minutes:</Form.Label>
                <Form.Control name="minutes" type="number" value={newEvent.minutes} onChange={handleNewEventChange}></Form.Control>
            <br></br>
            <Form.Label>Description:</Form.Label>
                <Form.Control name="description" type="text" value={newEvent.description} onChange={handleNewEventChange}></Form.Control>
            <br></br>
            <Form.Label>Free for Members?</Form.Label>
                <span style={{display:'flex', justifyContent:'center'}}>Yes
                    <Form.Check value={true} checked={newEvent.free_for_members == 'true'} type='radio' onChange={handleFreeForMembersChange}></Form.Check>
                </span>
                <span style={{display:'flex', justifyContent:'center'}}>No
                    <Form.Check value={false} checked={newEvent.free_for_members == 'false'} type='radio' onChange={handleFreeForMembersChange}></Form.Check>
                </span>
            <br></br>
            <Button type="submit">Create Event</Button>
            <Button onClick={handleDiscardEvent}>Discard Event</Button>
            <br></br><br></br>
        </Form>
    )
}

export default CreateEvent