import { useContext, useState } from 'react'
import { LoggedInUserContext, CurrentTransactionContext, GeneralToggleContext } from '../App'

const SuccessfulMembershipPurchase = () => {

    const { currentUser, setCurrentUser } = useContext(LoggedInUserContext)
    const { currentTransaction, setCurrentTransaction } = useContext(CurrentTransactionContext)
    const { generalToggle, setGeneralToggle } = useContext(GeneralToggleContext)
    const [fetchCompleted, setFetchCompleted] = useState(false)

    if (!fetchCompleted && Object.keys(currentUser).length > 0) {
        fetch(`/last-user-membership-purchase/${currentUser.id}`)
        .then((response) => response.json())
        .then((updatedUserData) => {
            console.log(updatedUserData)
            setGeneralToggle(!generalToggle)
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