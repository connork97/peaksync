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
        <>
        <div>
            <h1 id="userBalanceH1">Balance: <span id="userBalanceSpan"></span></h1>
            <h1 id="userCreditH1">Credit: <span id="userCreditSpan"></span></h1>
        </div>
            <ListGroup>
                {renderUserPayments}
            </ListGroup>
        </>
    )
}

export default UserPayments