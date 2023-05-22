import { useState } from 'react'

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/esm/Button'

const ClassData = ({ clas, allClasses, setAllClasses }) => {
    
    const [editClassToggle, setEditClassToggle] = useState(false)
    const [editedClass, setEditedClass] = useState({
        "name": clas.name,
        "price": clas.price,
        "category": clas.category,
        "capacity": clas.capacity,
        "hours": clas.hours,
        "minutes": clas.minutes,
        "description": clas.description
    })
    // const renderAllClasses = allClasses.map((clas) => {
    //     return (
    //         <ListGroup.Item>
    //             {clas.id} - {clas.name} - ${clas.price} - {clas.category} - {clas.capacity} - {clas.hours} - {clas.minutes} - {clas.description}
    //         </ListGroup.Item>
    //     )
    // })
    const handleDiscardClassChanges = () => {
        setEditedClass({
            "name": clas.name,
            "price": clas.price,
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
    return (
     <ListGroup.Item>
        ID: {clas.id}
        <br></br>
        Name: {editClassToggle ? <input name="name" value={editedClass.name} onChange={handleClassDetailChange}></input> : clas.name}
        <br></br>
        Price: ${editClassToggle ? <input name="price" value={editedClass.price} onChange={handleClassDetailChange}></input> : clas.price}
        <br></br>
        Category: {editClassToggle ? <input name="category" value={editedClass.category} onChange={handleClassDetailChange}></input> : clas.category}
        <br></br>
        Capacity: {editClassToggle ? <input name="capacity" value={editedClass.capacity} onChange={handleClassDetailChange}></input> : clas.capacity}
        <br></br>
        Hours: {editClassToggle ? <input name="hours" value={editedClass.hours} onChange={handleClassDetailChange}></input> : clas.hours} 
        Minutes: {editClassToggle ? <input name="minutes" value={editedClass.minutes} onChange={handleClassDetailChange}></input> : clas.minutes}
        <br></br>
        Description: {editClassToggle ? <input name="description" value={editedClass.description} onChange={handleClassDetailChange}></input> : <span>clas.description</span>}
        <br></br>
        {editClassToggle ? null : <Button onClick={() => setEditClassToggle(!editClassToggle)}>Edit Class</Button>}
        {editClassToggle ?
        <Button onClick={() => handleClassChangeSubmit(clas.id)}>Save Changes</Button>
        : null}
        {editClassToggle ?
        <Button onClick={handleDiscardClassChanges}>Discard Changes</Button>
        : null}
     </ListGroup.Item>
    )
}

export default ClassData