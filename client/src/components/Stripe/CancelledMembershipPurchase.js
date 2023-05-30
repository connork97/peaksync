import { useContext, useEffect } from 'react'
import { LoggedInUserContext, CurrentTransactionContext } from '../App'

const CancelledMembershipPurchase = () => {

    const { currentUser } = useContext(LoggedInUserContext)
    const { setCurrentTransaction } = useContext(CurrentTransactionContext)
    
    useEffect(() => {
        setCurrentTransaction({})
    }, [])

    return (
        <>
            <h1>Unsuccessful Membership Purchase Page</h1>
            <h2>Hi {currentUser.first_name}. Looks like your transaction was unsuccessful, so your purchase did not go through. Please try again.</h2>
        </>
    )
}

export default CancelledMembershipPurchase