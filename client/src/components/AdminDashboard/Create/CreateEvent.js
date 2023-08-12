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

    const handleMakeFreeForMembers = () => {
        setNewEvent((prevState) => ({
            ...prevState,
            free_for_members: true
        }))
        console.log(newEvent.free_for_members)
    }

    const handleMakePaidForMembers = () => {
        setNewEvent((prevState) => ({
            ...prevState,
            free_for_members: false
        }))
    }
    console.log(newEvent.price)

    const handleEventSubmit = (event) => {
        event.preventDefault()
        fetch('https://peaksync-back-end.onrender.com/events', {
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
        <div id='adminCreateEventDiv'>
            <div id='createEventDivHeader' style={{marginTop:'2rem', marginBottom:'2rem'}}>
                <h4 style={{marginBottom:'1rem'}}>Note! This is NOT for adding existing classes to the calendar. This is for creating brand new offerings.</h4>
                <h4>Please navigate to "Create New Calendar Item" below in order to create specific occurances of a class.</h4>
            </div>
            <Form id="createEventForm" onSubmit={handleEventSubmit}>
                <Form.Label>Name:</Form.Label>
                    <Form.Control name="name" type="text" value={newEvent.name} onChange={handleNewEventChange} style={{width:'75%', margin:'auto'}}></Form.Control>
                <br></br>
                <Form.Label>Price:</Form.Label>
                    <Form.Control name="price" type="text" value={newEvent.price} onChange={handleNewEventChange} style={{width:'75%', margin:'auto'}}></Form.Control>
                <br></br>
                <Form.Label>Category:</Form.Label>
                    <Form.Control name="category" type="text" value={newEvent.category} onChange={handleNewEventChange} style={{width:'75%', margin:'auto'}}></Form.Control>
                    <Form.Text>Ex: "Climing", "Yoga", "Fitness", "Event", etc</Form.Text>
                <br></br><br></br>
                <Form.Label>Capacity:</Form.Label>
                    <Form.Control name="capacity" type="number" value={newEvent.capacity} onChange={handleNewEventChange} style={{width:'75%', margin:'auto'}}></Form.Control>
                <br></br>
                <Form.Label>Hours:</Form.Label>
                    <Form.Control name="hours" type="number" value={newEvent.hours} onChange={handleNewEventChange} style={{width:'75%', margin:'auto'}}></Form.Control>
                <br></br>
                <Form.Label>Minutes:</Form.Label>
                    <Form.Control name="minutes" type="number" value={newEvent.minutes} onChange={handleNewEventChange} style={{width:'75%', margin:'auto'}}></Form.Control>
                <br></br>
                <Form.Label>Description:</Form.Label>
                    <Form.Control name="description" type="text" value={newEvent.description} onChange={handleNewEventChange} style={{width:'75%', margin:'auto'}}></Form.Control>
                <br></br>
                <Form.Label>Free for Members?</Form.Label>
                    <span style={{display:'flex', justifyContent:'space-evenly'}}>
                        <span style={{marginRight:'-22.5rem', width:'2rem'}}>Yes
                            <Form.Check value={true} checked={newEvent.free_for_members == true ? true : false} type='radio' onChange={handleMakeFreeForMembers}></Form.Check>
                        </span>
                        <span style={{marginLeft:'-22.5rem', width:'2rem'}}> No
                            <Form.Check value={false} checked={newEvent.free_for_members == false ? true : false} type='radio' onChange={handleMakePaidForMembers}></Form.Check>
                        </span>
                    </span>
                <br></br>
                <Button type="submit" style={{marginRight:'1.5rem'}}>Create Event</Button>
                <Button onClick={handleDiscardEvent} style={{marginLeft:'1.5rem', background:'gray'}}>Discard Event</Button>
                <br></br><br></br>
            </Form>
        </div>
    )
}

export default CreateEvent