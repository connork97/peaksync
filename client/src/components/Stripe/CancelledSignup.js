import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { LoggedInUserContext, SignupsToggleContext } from '../App'

const CancelledSignup = () => {

    const history = useHistory()
    const { currentUser } = useContext(LoggedInUserContext)
    const { signupsToggle, setSignupsToggle } = useContext(SignupsToggleContext)

    if (currentUser.id !== undefined) {
        fetch(`/last_user_signup/${currentUser.id}`)
        .then((response) => response.json())
        .then((userData) => {
            const signup_id = userData.signups.reverse()[0].id
            console.log(signup_id)
            deleteUnpaidSignup(signup_id)
        })
    }

    const deleteUnpaidSignup = (signup_id) => {
        fetch(`/signups/${signup_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((deletedSignupData) => {
            console.log(deletedSignupData)
            setSignupsToggle(!signupsToggle)
        })
    }

    return (
        <div>
            <h1>Hi {currentUser.first_name}, it seems like your payment did not go through, so your signup was cancelled.</h1>
            <h2>If you'd still like to create this booking, please navigate back to the calendar page and try again!</h2>
        </div>
    )
}

export default CancelledSignup