import { useState, useContext } from 'react'
import { AllEventsContext } from '../App'

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/esm/Button'

const EventData = ({ event }) => {
    // console.log(event)
    const { allEvents, setAllEvents } = useContext(AllEventsContext)

    const [editEventToggle, setEditEventToggle] = useState(false)
    const [editedEvent, setEditedEvent] = useState({
        "name": event.name,
        "price": event.price,
        "category": event.category,
        "capacity": event.capacity,
        "hours": event.hours,
        "minutes": event.minutes,
        "description": event.description
    })

    const handleDiscardEventChanges = () => {
        setEditedEvent({
            "name": event.name,
            "price": event.price,
            "category": event.category,
            "capacity": event.capacity,
            "hours": event.hours,
            "minutes": event.minutes,
            "description": event.description
          });
        setEditEventToggle(false)
    }
    const handleEventDetailChange = (event) => {
        const {name, value} = event.target
        setEditedEvent((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleEventChangeSubmit = (event_id) => {
        fetch(`/events/${event_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedEvent)
        })
        .then((response) => response.json())
        .then((editedEventData) => {
            setEditEventToggle(!editEventToggle)
            console.log(editedEventData)
            const updatedAllEvents = allEvents.map((event) => {
                if (event.id == event_id) {
                    return editedEventData
                } else {
                    return event
                }
            })
            setAllEvents(updatedAllEvents)
        })
    }

    const handleEventDelete = (event_id) => {
        fetch(`/events/${event_id}`, {
            method: 'DELETE'
        })
        // console.log(allEvents)
        const updatedEvents = allEvents.filter((event) => event.id != event_id)
        setAllEvents(updatedEvents)
    }

    return (
    <div>
        <ListGroup.Item>
            ID: {event.id}
            <br></br>
            Name: {editEventToggle ? <input name="name" value={editedEvent.name} onChange={handleEventDetailChange}></input> : editedEvent.name}
            <br></br>
            Price: ${editEventToggle ? <input name="price" value={editedEvent.price} onChange={handleEventDetailChange}></input> : editedEvent.price}
            <br></br>
            Category: {editEventToggle ? <input name="category" value={editedEvent.category} onChange={handleEventDetailChange}></input> : editedEvent.category}
            <br></br>
            Capacity: {editEventToggle ? <input name="capacity" value={editedEvent.capacity} onChange={handleEventDetailChange}></input> : editedEvent.capacity}
            <br></br>
            Hours: {editEventToggle ? <input name="hours" value={editedEvent.hours} onChange={handleEventDetailChange}></input> : editedEvent.hours} 
            <br></br>
            Minutes: {editEventToggle ? <input name="minutes" value={editedEvent.minutes} onChange={handleEventDetailChange}></input> : editedEvent.minutes}
            <br></br>
            Description: {editEventToggle ? <input name="description" value={editedEvent.description} onChange={handleEventDetailChange}></input> : <span>{editedEvent.description}</span>}
            <br></br><br></br>
            {editEventToggle ? null : <Button onClick={() => setEditEventToggle(!editEventToggle)}>Edit Event</Button>}
            {editEventToggle ?
            <Button onClick={() => handleEventChangeSubmit(event.id)}>Save Changes</Button>
            : null}
            {editEventToggle ?
            <Button onClick={handleDiscardEventChanges}>Discard Changes</Button>
            : null}
            <Button onClick={() => handleEventDelete(event.id)} style={{background:"red"}}>Delete Event</Button>
            <br></br>
        </ListGroup.Item>
        </div>
    )
}

export default EventData