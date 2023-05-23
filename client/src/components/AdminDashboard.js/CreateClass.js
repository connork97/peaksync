import { useState } from 'react'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateClass = () => {

    const [newClass, setNewClass] = useState({
        "name": "",
        "price": "",
        "category": "",
        "description": "",
        "capacity": 0,
        "hours": 0,
        "minutes": 0,
        "recurring": false
    })

    return (
        <Form id="createClassForm">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text"></Form.Control>
            <br></br>
            <Form.Label>Price:</Form.Label>
            <Form.Control type="text"></Form.Control>
            <br></br>
            <Form.Label>Category:</Form.Label>
            <Form.Control type="text"></Form.Control>
            <Form.Text>Ex: "Climing", "Yoga", "Fitness", "Event", etc</Form.Text>
            <br></br><br></br>
            <Form.Label>Capacity:</Form.Label>
            <Form.Control type="number"></Form.Control>
            <br></br>
            <Form.Label>Hours:</Form.Label>
            <Form.Control type="number"></Form.Control>
            <br></br>
            <Form.Label>Minutes:</Form.Label>
            <Form.Control type="number"></Form.Control>
            <br></br>
            <Form.Label>Recurring?</Form.Label>
            <Form.Check type="checkbox"></Form.Check>
            <br></br>
            <Button>Create Class</Button>
            <br></br><br></br>
        </Form>
    )
}

export default CreateClass