import { useState, useContext, useEffect } from 'react'
import { AllUsersContext, LoggedInUserContext, AllMembershipsContext } from '../App'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
// import myImage from '../../images/profile-placeholder-300x237.png'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

const ProfileInfo = ({ selectedUser }) => {
    
    const { currentUser } = useContext(LoggedInUserContext)
    const { allUsers, setAllUsers } = useContext(AllUsersContext)
    const { allMemberships } = useContext(AllMembershipsContext)
    
    const [selectedMembership, setSelectedMembership] = useState(selectedUser.membership)
    const [membershipName, setMembershipName] = useState(selectedUser.membership.name)
    const [membershipType, setMembershipType] = useState(selectedMembership.type)
    const [membershipSubtype, setMembershipSubtype] = useState(selectedMembership.subtype)
    
    const [isAdmin] = useState(selectedUser.admin)
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
        "membership_id": selectedUser.membership_id,
        "admin": selectedUser.admin
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
            "membership_id": selectedUser.membership_id,
            "admin": selectedUser.admin
        })
    }

    const handleProfileEdit = () => {
        fetch(`https://peaksync-back-end.onrender.com/users/${selectedUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userProfileInfo),
        })
        .then((response) => response.json())
        .then((editedUserData) => {
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

    const handleMembershipChange = (event) => {
        allMemberships.map((membership) => {
            if (membership.name === event.target.name) {
                setUserProfileInfo((prevState) => ({
                    ...prevState,
                    membership_id: membership.id
                }))
                setSelectedMembership(membership)
            }
        })
    }

    useEffect(() => {
        setMembershipName(selectedMembership.name)
        setMembershipType(selectedMembership.type)
        setMembershipSubtype(selectedMembership.subtype)
    }, [selectedMembership])
    
    const allMembershipNames = allMemberships.map((membership) => {
        return (
            <Dropdown.Item name={membership.name} value={membership.id} key={membership.id} onClick={(event) => handleMembershipChange(event)}>{membership.name}</Dropdown.Item>
        )
    })

    // const [expiration, setExpiration] = useState({
    //     "month": "Month",
    //     "day": "Day",
    //     "year": "Year"
    // })

    // const handleExpirationChange = (event) => {
    //     const { name, id } = event.target
    //     setExpiration((prevState) => ({
    //         ...prevState,
    //         [name]: id
    //     }))
    // }

    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    // const renderExpirationDays = () => {
    //     let i = 1;
    //     const days = [];

    //     if (['January', 'March', 'May', 'July', 'August', 'October', 'December'].includes(String(expiration.month))) {
    //       while (i <= 31) {
    //         days.push(<Dropdown.Item name="day" id={i} key={i} onClick={(event) => handleExpirationChange(event)}>{i}</Dropdown.Item>);
    //         i++;
    //       }
    //     } else if (['April', 'June', 'September', 'November'].includes(String(expiration.month))) {
    //         while (i <= 30) {
    //           days.push(<Dropdown.Item name="day" id={i} key={i} onClick={(event) => handleExpirationChange(event)}>{i}</Dropdown.Item>);
    //           i++;
    //         }
    //     } else if (String(expiration.month) === 'February') {
    //         while (i <= 29) {
    //           days.push(<Dropdown.Item name="day" id={i} key={i} onClick={(event) => handleExpirationChange(event)}>{i}</Dropdown.Item>);
    //           i++;
    //         }
    //     }
    //     return days;
    //   };
    // const renderExpirationMonth = months.map((month) => {
    //     return (
    //         <Dropdown.Item name="month" id={month} key={month} onClick={(event) => handleExpirationChange(event)}>{month}</Dropdown.Item>
    //     )
    // })

    // const renderExpirationYears = () => {
    //     let i = 2023
    //     let years = []
    //     while (i <= 2033) {
    //         years.push(<Dropdown.Item name="year" id={i} key={i} onClick={(event) => handleExpirationChange(event)}>{i}</Dropdown.Item>)
    //         i++
    //     }
    //     return years
    // }

    const setAdminStatus = () => {
        setUserProfileInfo((prevState) => ({
            ...prevState,
            admin: !prevState.admin
        }))
    }

    return (
        <>
        {currentUser.admin && <h2 style={{textAlign:'center', marginTop:'2rem'}}>Use caution whenever editing user profile information.  There is no "undo" button once you save them!</h2>}
        <h1 style={{marginTop:'2rem'}}>{selectedUser.first_name} {selectedUser.last_name}'s Profile</h1>
        <div id="userProfileInfoDiv" style={{display:"flex", marginLeft:"0", marginBottom:'3rem', textAlign:"left", justifyContent:'center', marginTop:'2rem'}}>
            <Card style={{position:"absolute", marginBottom:'3rem', display:"flex", justifyContent:"start", marginLeft:"0", textAlign:"left", width:'50vw'}}>
                {/* <Card.Img src={myImage} style={{width:"250px", display:"flex", justifyContent:"center"}}></Card.Img> */}
                <Card.Body>
                    <span style={{display:'flex'}}>
                    <Card.Title style={{marginRight:'1.5rem'}}>First Name: <input name="first_name" value={userProfileInfo.first_name} onChange={handleProfileInfoChange}></input></Card.Title>
                    <Card.Title style={{marginLeft:'1.5rem'}}>Last Name: <input name="last_name" value={userProfileInfo.last_name} onChange={handleProfileInfoChange}></input></Card.Title>
                    </span>
                    <br></br>
                    <Card.Title>Contact Information:</Card.Title>
                    <br></br>
                        <Card.Text>Email: <input name="email" value={userProfileInfo.email} onChange={handleProfileInfoChange}></input></Card.Text>
                        <Card.Text>Phone Number: <input name="phone_number" value={userProfileInfo.phone_number} onChange={handleProfileInfoChange}></input></Card.Text>
                    <Card.Text>Address: <input name="address" value={userProfileInfo.address} onChange={handleProfileInfoChange}></input></Card.Text>
                    <Card.Text>City: <input name="city" value={userProfileInfo.city} onChange={handleProfileInfoChange}></input> State: <input name="state" value={userProfileInfo.state} onChange={handleProfileInfoChange}></input> Zipcode: <input name="zipcode" value={userProfileInfo.zipcode} onChange={handleProfileInfoChange}></input></Card.Text>
                    <Card.Text>Date of Birth: <input name="date_of_birth" value={userProfileInfo.date_of_birth} onChange={handleProfileInfoChange}></input></Card.Text>
                    <Card.Text>Emergency Contact: <input name="emergency_contact_name" value={userProfileInfo.emergency_contact_name} onChange={handleProfileInfoChange}></input> - <input name="emergency_contact_phone_number" value={userProfileInfo.emergency_contact_phone_number} onChange={handleProfileInfoChange}></input></Card.Text>
                    <Card.Text>Waiver Status: {userProfileInfo.waiver ? "Active" : "Inactive"}</Card.Text>
                    <Card.Text>First Contact with Customer: {selectedUser.created_at}</Card.Text>
                    <Card.Text>Most Recent Change to Customer: {selectedUser.updated_at ? selectedUser.updated_at : "N/A"}</Card.Text>
                    {currentUser.admin === true ?
                    <div style={{display:'flex'}}>
                    <Dropdown style={{marginRight:'2rem'}}>
                        <Dropdown.Toggle>{membershipName}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {allMembershipNames}
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* <Card.Text style={{display:'flex', alignContent:'center', marginRight:'1rem', marginTop:'0.35rem'}}>Expires:</Card.Text> */}
                    {/* <Dropdown>
                    <Dropdown.Toggle style={{marginRight:'0.5rem'}}>{expiration.month}</Dropdown.Toggle>
                    <Dropdown.Menu>
                    {renderExpirationMonth}
                    </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle style={{marginRight:'0.5rem'}}>{expiration.day}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {renderExpirationDays()}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle>{expiration.year}</Dropdown.Toggle>
                        <Dropdown.Menu>
                                {renderExpirationYears()}
                            </Dropdown.Menu>
                    </Dropdown> */}
                    <br></br><br></br><br></br>
                    </div>
                    : <Card.Text>Membership: {membershipName}</Card.Text>}
                    <Card.Text>Type: {membershipType}</Card.Text>
                    <Card.Text>Subtype: {membershipSubtype}</Card.Text>
                    <br></br>
                    <Form.Label>Admin?</Form.Label>
                    <Form.Check value={isAdmin} checked={userProfileInfo.admin} onClick={setAdminStatus}></Form.Check>
                    <br></br>
                    <Button onClick={handleProfileEdit} style={{marginRight:'1rem'}}>Save Changes</Button>
                    <Button onClick={handleDiscardChanges} style={{background:'grey', marginLeft:'1rem'}}>Discard Changes</Button>
                </Card.Body>
            </Card>
        </div>
        </>
    )
}

export default ProfileInfo