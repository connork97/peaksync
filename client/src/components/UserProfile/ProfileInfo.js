import { useState, useContext } from 'react'
import { AllUsersContext, LoggedInUserContext } from '../App'

import Card from 'react-bootstrap/Card'
import myImage from '../../images/profile-placeholder-300x237.png'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'

const ProfileInfo = ({ selectedUser }) => {

    const { allUsers, setAllUsers } = useContext(AllUsersContext)
    // const { currentUser, setCurrentUser } = useContext(LoggedInUserContext)

    const [userProfileInfo, setUserProfileInfo] = useState({
        "first_name": selectedUser.first_name,
        "last_name": selectedUser.last_name,
        "email": selectedUser.email,
        "phone_number": selectedUser.phone_number,
        "address": selectedUser.address,
        "city": selectedUser.city,
        "state": selectedUser.state,
        "zipcode": selectedUser.zipcode,
        "date_of_birth": selectedUser.date_of_birth,
        "emergency_contact_name": selectedUser.emergency_contact_name,
        "emergency_contact_phone_number": selectedUser.emergency_contact_phone_number,
        "membership_id": selectedUser.membership_id
    })

    const handleProfileInfoChange = (event) => {
        const {name, value} = event.target
        setUserProfileInfo((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleDiscardChanges = () => {
        setUserProfileInfo({
            "first_name": selectedUser.first_name,
            "last_name": selectedUser.last_name,
            "email": selectedUser.email,
            "phone_number": selectedUser.phone_number,
            "address": selectedUser.address,
            "city": selectedUser.city,
            "state": selectedUser.state,
            "zipcode": selectedUser.zipcode,
            "date_of_birth": selectedUser.date_of_birth,
            "emergency_contact_name": selectedUser.emergency_contact_name,
            "emergency_contact_phone_number": selectedUser.emergency_contact_phone_number,
            "membership_id": selectedUser.membership_id
        })
    }

    const handleProfileEdit = () => {
        console.log(userProfileInfo)
        fetch(`/users/${selectedUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userProfileInfo),
        })
        .then((response) => response.json())
        .then((editedUserData) => {
            console.log(editedUserData.id)
            const updatedAllUsersState = allUsers.map((user) => {
                if (user.id == editedUserData.id) {
                    return editedUserData
                } else {
                    return user
                }
            })
            setAllUsers(updatedAllUsersState)
        })
    }

    return (
        <div id="userProfileInfoDiv" style={{display:"flex", marginLeft:"0",textAlign:"left"}}>
            <Card style={{position:"absolute", display:"flex", justifyContent:"start", marginLeft:"0", textAlign:"left"}}>
                <Card.Img src={myImage} style={{width:"250px", display:"flex", justifyContent:"center"}}></Card.Img>
                <Card.Body>
                    <Card.Title><input name="first_name" value={userProfileInfo.first_name} onChange={handleProfileInfoChange}></input> <input name="last_name" value={userProfileInfo.last_name} onChange={handleProfileInfoChange}></input> - User ID: {selectedUser.id}</Card.Title>
                    <Card.Text>Contact Information: <input name="email" value={userProfileInfo.email} onChange={handleProfileInfoChange}></input> - <input name="phone_number" value={userProfileInfo.phone_number} onChange={handleProfileInfoChange}></input></Card.Text>
                    <Card.Text>Address: <input name="address" value={userProfileInfo.address} onChange={handleProfileInfoChange}></input></Card.Text>
                    <Card.Text>City: <input name="city" value={userProfileInfo.city} onChange={handleProfileInfoChange}></input> State: <input name="state" value={userProfileInfo.state} onChange={handleProfileInfoChange}></input> Zipcode: <input name="zipcode" value={userProfileInfo.zipcode} onChange={handleProfileInfoChange}></input></Card.Text>
                    <Card.Text>Date of Birth: <input name="date_of_birth" value={userProfileInfo.date_of_birth} onChange={handleProfileInfoChange}></input></Card.Text>
                    <Card.Text>Emergency Contact: <input name="emergency_contact_name" value={userProfileInfo.emergency_contact_name} onChange={handleProfileInfoChange}></input> - <input name="emergency_contact_phone_number" value={userProfileInfo.emergency_contact_phone_number} onChange={handleProfileInfoChange}></input></Card.Text>
                    <Card.Text>Waiver Status: {userProfileInfo.waiver ? "Active" : "Inactive"}</Card.Text>
                    <Card.Text>First Contact with Customer: {selectedUser.created_at}</Card.Text>
                    <Card.Text>Most Recent Change to Customer: {selectedUser.updated_at ? selectedUser.updated_at : "N/A"}</Card.Text>
                    <Card.Text>Membership ID: {userProfileInfo.membership_id}</Card.Text>
                    <Button onClick={handleProfileEdit}>Save Changes</Button> <Button onClick={handleDiscardChanges}>Discard Changes</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ProfileInfo