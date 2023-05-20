import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab'

const UserBookings = ({ selectedUser }) => {
    const renderBookings = selectedUser.signups.map((signup) => {
        return (
            <ListGroup.Item>
                {signup.id} - {signup.signup_class.name} - {signup.created_at} - {signup.paid === true ? "Paid" : "Payment Owed"}
            </ListGroup.Item>
        )
    })
    return (
            <ListGroup>
                {renderBookings}
            </ListGroup>
    )
}

export default UserBookings