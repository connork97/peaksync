import Card from 'react-bootstrap/Card'
import myImage from '../../images/profile-placeholder-300x237.png'
import Tab from 'react-bootstrap/Tab'

const ProfileInfo = ({ selectedUser }) => {
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

export default ProfileInfo