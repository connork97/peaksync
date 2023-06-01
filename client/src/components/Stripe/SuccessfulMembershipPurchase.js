import { useContext, useState } from 'react'
import { LoggedInUserContext, CurrentUserToggleContext } from '../App'

const SuccessfulMembershipPurchase = () => {

    const { currentUser, setCurrentUser } = useContext(LoggedInUserContext)
    const { currentUserToggle, setCurrentUserToggle } = useContext(CurrentUserToggleContext)
    
    const [fetchCompleted, setFetchCompleted] = useState(false)

    if (!fetchCompleted && Object.keys(currentUser).length > 0) {
        fetch(`/last-user-membership-purchase/${currentUser.id}`)
        .then((response) => response.json())
        .then((updatedUserData) => {
            console.log(updatedUserData)
            setCurrentUserToggle(!currentUserToggle)
            setFetchCompleted(true)
        })
    }

    return (
        <>
            <h1>Successful Membership Purchase Page</h1>
            <h2>Hi {currentUser.first_name}. Thanks for making your purchase!</h2>
        </>
    )
}

export default SuccessfulMembershipPurchase