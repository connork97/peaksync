import ListGroup from 'react-bootstrap/ListGroup'

import moment from 'moment'

const UserPayments = ({ selectedUser }) => {
    const renderUserPayments = selectedUser.payments.map((payment) => {
        const date = new Date(payment.created_at.split(" ")[0])
        console.log(payment)
        if (payment.membership) {

            return (
                <ListGroup.Item>
                    {payment.created_at} - {payment.membership.name} - ${payment.membership.price}
                </ListGroup.Item>
            )
        } else if (payment.signup) {
            return (
                <ListGroup.Item>
                    {payment.created_at} - {payment.signup.session.event.name} - ${payment.signup.session.event.price}
                </ListGroup.Item>
            )
        }
    })
    return (
        <>
        <h1>{selectedUser.first_name} {selectedUser.last_name}'s Payment History</h1>
        <div>
            {/* <h1 id="userBalanceH1">Balance: <span id="userBalanceSpan"></span></h1> */}
            {/* <h1 id="userCreditH1">Credit: <span id="userCreditSpan"></span></h1> */}
        </div>
            <ListGroup>
                {renderUserPayments}
            </ListGroup>
        </>
    )
}

export default UserPayments