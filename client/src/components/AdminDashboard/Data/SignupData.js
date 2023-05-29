import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const SignupData = ({ signup }) => {
    console.log(signup)
    const history = useHistory()


    const handleEditSignup = (signup) => {
        history.push({pathname:"/edit/signup", state:signup})
    }


    return (
        <ListGroup.Item>
            {signup.session.date}, {signup.session.time} - {signup.session ? signup.session.event.name + " - " : null} {signup.user.last_name}, {signup.user.first_name}
            Created At: {signup.created_at} 
            <Button onClick={() => handleEditSignup(signup)}>Edit Signup</Button>
        </ListGroup.Item>
    )
}

export default SignupData