import { useState } from 'react'

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/esm/Button'

const MembershipData = ({ membership }) => {
    
    const [editMembershipToggle, setEditMembershipToggle] = useState(false)

    const [editedMembership, setEditedMembership] = useState({
        "name": membership.name,
        "price": membership.price,
        "type": membership.type,
        "subtype": membership.subtype,
        "description": membership.description
    })

    // const renderAllMemberships = allMemberships.map((membership) => {
    //     return (
    //         <ListGroup.Item>
    //             {membership.id} - {editMembershipToggle ? <input value={membership.name}></input> : <span>{membership.name}</span>} - ${membership.price} - {membership.type} - {membership.subtype} - {membership.description}
    //             <Button onClick={() => setEditMembershipToggle(!editMembershipToggle)}>Edit Membership</Button>
    //         </ListGroup.Item>
    //     )
    // })
    const handleDiscardMembershipChanges = (event) => {
        setEditedMembership({
            "name": membership.name,
            "price": membership.price,
            "type": membership.type,
            "subtype": membership.subtype,
            "description": membership.description
          });
        setEditMembershipToggle(false)
    }
    const handleMembershipDetailChange = (event) => {
        const {name, value} = event.target
        setEditedMembership((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleMembershipChangeSubmit = (membership_id) => {
        fetch(`/memberships/${membership_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedMembership)
        })
        .then((response) => response.json())
        .then((editedMembershipData) => {
            setEditMembershipToggle(!editMembershipToggle)
            console.log(editedMembershipData)
        })
    }

    return (
        <ListGroup.Item>
            ID: {membership.id} 
            <br></br>
            Name: {editMembershipToggle ? <input name="name" value={editedMembership.name} onChange={handleMembershipDetailChange}></input> : <span>{editedMembership.name}</span>} 
            <br></br>
            Price: ${editMembershipToggle ? <input name="price" value={editedMembership.price} onChange={handleMembershipDetailChange}></input> : <span>{editedMembership.price}</span>} 
            <br></br>
            Type: {editMembershipToggle ? <input name="type" value={editedMembership.type} onChange={handleMembershipDetailChange}></input> : <span>{editedMembership.type}</span>} 
            <br></br>
            Subtype: {editMembershipToggle ? <input name="subtype" value={editedMembership.subtype} onChange={handleMembershipDetailChange}></input> : <span>{editedMembership.subtype}</span>} 
            <br></br>
            Description: {editMembershipToggle ? <input name="description" value={editedMembership.description} style={{width:"75%"}} onChange={handleMembershipDetailChange}></input> : <span>{editedMembership.description}</span>}
            <br></br>
            {editMembershipToggle ? null : <Button onClick={() => setEditMembershipToggle(!editMembershipToggle)}>Edit Membership</Button>}
            {editMembershipToggle ?
            <Button onClick={() => handleMembershipChangeSubmit(membership.id)}>Save Changes</Button>
            : null}
            {editMembershipToggle ?
            <Button onClick={handleDiscardMembershipChanges}>Discard Changes</Button>
            : null}
        </ListGroup.Item>
    )
}

export default MembershipData