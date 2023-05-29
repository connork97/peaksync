import { useContext, useEffect } from 'react'
import { LoggedInUserContext } from '../App'

const CancelledSignup = () => {

    const { currentUser } = useContext(LoggedInUserContext)

    if (currentUser.id !== undefined) {
        fetch(`/last_user_signup/${currentUser.id}`)
        .then((response) => response.json())
        .then((userData) => {
            const signup_id = userData.signups.reverse()[0].id
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
        .then((deletedSignupData) => console.log(deletedSignupData))
    }

    return (
        <h1>Hi there, your signup was cancelled SIMON. WITH AN EXCLAMATION POINT?</h1>
    )
}

export default CancelledSignup