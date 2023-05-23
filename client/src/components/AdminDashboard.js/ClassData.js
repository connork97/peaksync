import { useState } from 'react'

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/esm/Button'

const ClassData = ({ clas, allClasses, setAllClasses }) => {
    
    console.log(allClasses)
    const [editClassToggle, setEditClassToggle] = useState(false)
    const [editedClass, setEditedClass] = useState({
        "name": clas.name,
        "price": clas.price,
        "day": clas.day,
        "time": clas.time,
        "category": clas.category,
        "capacity": clas.capacity,
        "hours": clas.hours,
        "minutes": clas.minutes,
        "description": clas.description
    })

    const handleDiscardClassChanges = () => {
        setEditedClass({
            "name": clas.name,
            "price": clas.price,
            "day": clas.day,
            "time": clas.time,
            "category": clas.category,
            "capacity": clas.capacity,
            "hours": clas.hours,
            "minutes": clas.minutes,
            "description": clas.description
          });
        setEditClassToggle(false)
    }
    const handleClassDetailChange = (event) => {
        const {name, value} = event.target
        setEditedClass((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleClassChangeSubmit = (class_id) => {
        fetch(`/classes/${class_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedClass)
        })
        .then((response) => response.json())
        .then((editedClassData) => {
            setEditClassToggle(!editClassToggle)
            console.log(editedClassData)
        })
    }

    const handleClassDelete = (class_id) => {
        fetch(`/classes/${class_id}`, {
            method: 'DELETE'
        })
        console.log(allClasses)
        const updatedClasses = allClasses.filter((cls) => cls.id != class_id)
        setAllClasses(updatedClasses)
    }

    return (
     <ListGroup.Item>
        ID: {clas.id}
        <br></br>
        Name: {editClassToggle ? <input name="name" value={editedClass.name} onChange={handleClassDetailChange}></input> : editedClass.name}
        <br></br>
        Price: ${editClassToggle ? <input name="price" value={editedClass.price} onChange={handleClassDetailChange}></input> : editedClass.price}
        <br></br>
        Day: {editClassToggle ? <input name="day" value={editedClass.day} onChange={handleClassDetailChange}></input> : editedClass.day}
        <br></br>
        Time: {editClassToggle ? <input name="time" value={editedClass.time} onChange={handleClassDetailChange}></input> : editedClass.time}
        <br></br>
        Category: {editClassToggle ? <input name="category" value={editedClass.category} onChange={handleClassDetailChange}></input> : editedClass.category}
        <br></br>
        Capacity: {editClassToggle ? <input name="capacity" value={editedClass.capacity} onChange={handleClassDetailChange}></input> : editedClass.capacity}
        <br></br>
        Hours: {editClassToggle ? <input name="hours" value={editedClass.hours} onChange={handleClassDetailChange}></input> : editedClass.hours} 
        <br></br>
        Minutes: {editClassToggle ? <input name="minutes" value={editedClass.minutes} onChange={handleClassDetailChange}></input> : editedClass.minutes}
        <br></br>
        Description: {editClassToggle ? <input name="description" value={editedClass.description} onChange={handleClassDetailChange}></input> : <span>{editedClass.description}</span>}
        <br></br><br></br>
        {editClassToggle ? null : <Button onClick={() => setEditClassToggle(!editClassToggle)}>Edit Class</Button>}
        {editClassToggle ?
        <Button onClick={() => handleClassChangeSubmit(clas.id)}>Save Changes</Button>
        : null}
        {editClassToggle ?
        <Button onClick={handleDiscardClassChanges}>Discard Changes</Button>
        : null}
        <Button onClick={() => handleClassDelete(clas.id)}>Delete Class</Button>
        <br></br>
     </ListGroup.Item>
    )
}

export default ClassData