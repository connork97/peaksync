import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab'

const UserPayments = ({ selectedUser }) => {
    const renderUserPayments = selectedUser.payments.map((payment) => {
        return (
            <ListGroup.Item>
                {payment.id}
            </ListGroup.Item>
        )
    })
    return (
            <ListGroup>
                {renderUserPayments}
            </ListGroup>
    )
}

export default UserPayments