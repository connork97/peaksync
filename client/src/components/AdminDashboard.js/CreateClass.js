import { useState } from 'react'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateClass = ({ allClasses, setAllClasses }) => {

    const [newClass, setNewClass] = useState({
        "name": "",
        "price": "",
        "day": "",
        "time": "",
        "category": "",
        "description": "",
        "capacity": 0,
        "hours": 0,
        "minutes": 0,
        "frequency": ""
    })

    const handleDiscardClass = () => {
        setNewClass({
            "name": "",
            "price": "",
            "day": "",
            "time": "",
            "category": "",
            "description": "",
            "capacity": 0,
            "hours": 0,
            "minutes": 0,
            "frequency": ""
        })
    }

    const handleNewClassChange = (event) => {
        const {name, value} = event.target
        setNewClass((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleClassSubmit = (event) => {
        event.preventDefault()
        fetch('/classes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newClass)
        })
        .then((response) => response.json())
        .then((newClassData) => {
            console.log(newClassData)
            const updatedAllClasses = [...allClasses, newClassData]
            setAllClasses(updatedAllClasses)
        })
    }

    const frequency_options = ['Once', 'Weekly', 'Biweekly', 'Monthly', 'Biannual', 'Yearly']
    const radio_options = frequency_options.map((option) => {
        return (
            <>
                <Form.Label>{option}</Form.Label>
                <Form.Check name="frequency" value={option} type="radio" onChange={handleNewClassChange} style={{marginLeft:"1rem", marginRight:"1rem"}}></Form.Check>
            </>
        )
    })

    return (
        <Form id="createClassForm" onSubmit={handleClassSubmit}>
            <Form.Label>Name:</Form.Label>
            <Form.Control name="name" type="text" value={newClass.name} onChange={handleNewClassChange}></Form.Control>
            <br></br>
            <Form.Label>Price:</Form.Label>
            <Form.Control name="price" type="text" value={newClass.price} onChange={handleNewClassChange}></Form.Control>
            <br></br>
            <Form.Label>Day of Week:</Form.Label>
            <Form.Control name="day" type="text" value={newClass.day} onChange={handleNewClassChange}></Form.Control>
            <Form.Text>Must be a properly spelled day of the week, with the first letter capitalized.</Form.Text>
            <br></br>
            <Form.Label>Time of Day:</Form.Label>
            <Form.Control name="time" type="text" value={newClass.time} onChange={handleNewClassChange}></Form.Control>
            <Form.Text>Must be in the format HH:MM on a 24 hour time clock.</Form.Text>
            <br></br>
            <Form.Label>Category:</Form.Label>
            <Form.Control name="category" type="text" value={newClass.category} onChange={handleNewClassChange}></Form.Control>
            <Form.Text>Ex: "Climing", "Yoga", "Fitness", "Event", etc</Form.Text>
            <br></br><br></br>
            <Form.Label>Capacity:</Form.Label>
            <Form.Control name="capacity" type="number" value={newClass.capacity} onChange={handleNewClassChange}></Form.Control>
            <br></br>
            <Form.Label>Hours:</Form.Label>
            <Form.Control name="hours" type="number" value={newClass.hours} onChange={handleNewClassChange}></Form.Control>
            <br></br>
            <Form.Label>Minutes:</Form.Label>
            <Form.Control name="minutes" type="number" value={newClass.minutes} onChange={handleNewClassChange}></Form.Control>
            <br></br>
            <Form.Label>Description:</Form.Label>
            <Form.Control name="description" type="text" value={newClass.description} onChange={handleNewClassChange}></Form.Control>
            <br></br>
            <Form.Label>Frequency of Event:</Form.Label>
            <br></br>
            <div style={{display:"inline-flex"}}>
                {radio_options}
            </div>
            <br></br>
            <Button type="submit">Create Class</Button>
            <Button onClick={handleDiscardClass}>Discard Class</Button>
            <br></br><br></br>
        </Form>
    )
}

export default CreateClass