import { useState, useContext } from 'react'
import { AllEventsContext } from '../../App'

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/esm/Button'

const EventData = ({ event }) => {

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
            const updatedAllEvents = allEvents.map((event) => {
                if (event.id == event_id) {
                    return editedEventData
                } else {
                    return event
                }
            })
            setAllEvents(updatedAllEvents)
        })
        if (editedEvent.price != event.price) {
            console.log("Editing Stripe product price...")
            fetch('/update_stripe_event_product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // name: editedEvent.name,
                    // description: editedEvent.description,
                    stripe_product_id: event.stripe_product_id,
                    stripe_price_id: event.stripe_price_id,
                    price: Number(editedEvent.price) * 100
                })
            })
            .then((response) => response.json())
            .then((stripeData) => console.log(stripeData))
        }
    }

    const handleEventDelete = (event_id) => {
        fetch(`/events/${event_id}`, {
            method: 'DELETE'
        })
        const updatedEvents = allEvents.filter((event) => event.id != event_id)
        setAllEvents(updatedEvents)
    }

    return (
        <div>
            <ListGroup.Item className="listGroupItemWithEndButtons">
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
                <Button className='listGroupEndButton' onClick={() => handleEventChangeSubmit(event.id)}>Save Changes</Button>
                : null}
                {editEventToggle ?
                <Button className='listGroupEndButton' onClick={handleDiscardEventChanges}>Discard Changes</Button>
                : null}
                <Button className='listGroupEndButton' onClick={() => handleEventDelete(event.id)} style={{background:"red"}}>Delete Event</Button>
                <br></br>
            </ListGroup.Item>
        </div>
    )
}

export default EventData