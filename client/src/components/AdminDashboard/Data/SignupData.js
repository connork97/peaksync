import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const SignupData = ({ signup }) => {
    // console.log(signup)
    const history = useHistory()


    const handleEditSignup = (signup) => {
        history.push({pathname:"/edit/signup", state:signup})
    }


    return (
        <ListGroup.Item className='inlineListGroupItemWithEndButtons' style={{alignItems:'center', marginBottom:'1rem', borderTop:'1px solid rgba(0, 0, 0, 0.1)'}}>
            <span><b>Event: </b>{signup.session ? signup.session.event.name + " " : null}<b>Customer: </b>{signup.user.last_name}, {signup.user.first_name} <b>Date/Time: </b>{signup.session.date}, {signup.session.time}
                <strong> Created At: </strong> {signup.created_at} 
            </span>
            <Button className='listGroupEndButton' onClick={() => handleEditSignup(signup)}>Edit Signup</Button>
        </ListGroup.Item>
    )
}

export default SignupData