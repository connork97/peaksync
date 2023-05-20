import { useState, useEffect } from "react"
import { userState } from "../atoms"
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

import { useHistory, useLocation } from 'react-router-dom'

import myImage from '../images/profile-placeholder-300x237.png'

const UserProfile = () => {

    const location = useLocation()
    const selectedUser = location.state
    // const [userClasses, setUserClasses] = useState([])
    const [shouldRenderBookings, setShouldRenderBookings] = useState(false)

    // let classes = ["Placeholder", "Top Rope Belay Lesson", "Lead Belay Lesson", "Begginer Yoga Class", "Intermediate Yoga Class", "Advanced Yoga Class", "Core Class", "Flexibility Friday"]

    // let classes = []
    // useEffect(() => {
    //     fetch("/classes")
    //     .then((response) => response.json())
    //     .then((classData) => console.log(classData))
    // }, [])

    // useEffect(() => {
    //     selectedUser.signups.map((signup) => {
    //         fetch(`/classes/${signup.class_id}`)
    //         .then((response) => response.json())
    //         .then((classData) => {
    //             userClasses.push(classData)
    //             console.log(userClasses)
    //             setShouldRenderBookings(true)
    //             // classData.map((class) => setUserClasses(...userClasses, class.name))
    //         })
    //     })

    // }, [])
    const renderBookings = selectedUser.signups.map((signup) => {
        console.log(signup.signup_class)
        console.log(signup.class_id)
        return (
            <ListGroup.Item>
                {signup.id} - {signup.signup_class.name} - {signup.created_at} - {signup.paid === true ? "Paid" : "Payment Owed"}
            </ListGroup.Item>
        )
    })
    
        // {
    //     console.log("User Signups:", user.signups)
    //     return (
    //         <ListGroup.Item>
    //             {user.signups.map}
    //         </ListGroup.Item>
    //     )
    // }
    const renderProfileInfo = () => {
        return (
            <Card style={{position:"absolute", display:"flex", justifyContent:"center", margin:"auto"}}>
                <Card.Img src={myImage} style={{width:"250px", display:"flex", justifyContent:"center"}}></Card.Img>
                <Card.Body>
                    <Card.Title>{selectedUser.first_name} {selectedUser.last_name}</Card.Title>
                    <Card.Text>Contact Information: {selectedUser.email} - {selectedUser.phone_number}</Card.Text>
                    <Card.Text>Address: {selectedUser.address}</Card.Text>
                    <Card.Text>{selectedUser.city}, {selectedUser.state} {selectedUser.zipcode}</Card.Text>
                    <Card.Text>Date of Birth: {selectedUser.date_of_birth}</Card.Text>
                    <Card.Text>Emergency Contact: {selectedUser.emergency_contact_name} - {selectedUser.emergency_contact_phone_number}</Card.Text>
                    <Card.Text>Waiver Status: {selectedUser.waiver ? "Active" : "Inactive"}</Card.Text>
                    <Card.Text>First Contact with Customer: {selectedUser.created_at}</Card.Text>
                    <Card.Text>Most Recent Change to Customer: {selectedUser.updated_at ? selectedUser.updated_at : "N/A"}</Card.Text>
                    <Card.Text>Membership ID: {selectedUser.membership_id}</Card.Text>


                </Card.Body>
            </Card>
        )
    }

    return (
        // <h1>{user.first_name}</h1>
        <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3"
            justify
        >
            <Tab eventKey="profile" title="Profile">{renderProfileInfo()}</Tab>
            <Tab eventKey="bookings" title="Bookings">
                <ListGroup>
                    {/* {shouldRenderBookings ? renderBookings : null} */}
                    {renderBookings}
                </ListGroup>
            </Tab>

        </Tabs>
    )
}

export default UserProfile