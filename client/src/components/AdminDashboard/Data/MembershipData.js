import { useState, useContext } from 'react'
import { AllMembershipsContext } from '../../App'

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/esm/Button'

const MembershipData = ({ membership }) => {
    
    const { allMemberships, setAllMemberships } = useContext(AllMembershipsContext)

    const [editMembershipToggle, setEditMembershipToggle] = useState(false)

    const [editedMembership, setEditedMembership] = useState({
        "id": membership.id,
        "name": membership.name,
        "price": membership.price,
        "type": membership.type,
        "subtype": membership.subtype,
        "description": membership.description,
        "stripe_product_id": membership.stripe_product_id,
        "stripe_price_id": membership.stripe_price_id
    })

    const handleDiscardMembershipChanges = (event) => {
        setEditedMembership({
            "id": membership.id,
            "name": membership.name,
            "price": membership.price,
            "type": membership.type,
            "subtype": membership.subtype,
            "description": membership.description,
            "stripe_product_id": membership.stripe_product_id,
            "stripe_price_id": membership.stripe_price_id
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
            console.log(editedMembershipData)
            setEditMembershipToggle(!editMembershipToggle)
        })
        console.log(editedMembership.price, membership.price)
        if (editedMembership.price != membership.price || editedMembership.name != membership.name || editedMembership.description != membership.description) {
            console.log("Editing Stripe product price...")
            fetch('/update_stripe_membership_product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editedMembership.name,
                    description: editedMembership.description,
                    stripe_product_id: membership.stripe_product_id,
                    stripe_price_id: membership.stripe_price_id,
                    price: Number(editedMembership.price) * 100
                })
            })
            .then((response) => response.json())
            .then((updatedStripeProductPriceData) => console.log(updatedStripeProductPriceData))
        }
    }
    const handleMembershipDelete = (membership_id) => {
        if (window.confirm("Are you sure you want to delete this membership?  This action cannot be undone.") === true) {

            fetch(`/memberships/${membership_id}`, {
                method: 'DELETE'
            })
            const updatedMemberships = allMemberships.filter((memb) => memb.id != membership_id)
            setAllMemberships(updatedMemberships)
        } else {
            window.alert("Okay, the membership has not been deleted.")
        }
    }
    return (
        <ListGroup.Item className="listGroupItemWithEndButtons">
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
            <Button className='listGroupEndButton' onClick={() => handleMembershipChangeSubmit(membership.id)}>Save Changes</Button>
            : null}
            {editMembershipToggle ?
            <Button className='listGroupEndButton' onClick={handleDiscardMembershipChanges}>Discard Changes</Button>
            : null}
            <Button className='listGroupEndButton' onClick={() => handleMembershipDelete(membership.id)} style={{background:"red"}}>Delete Membership</Button>

        </ListGroup.Item>
    )
}

export default MembershipData