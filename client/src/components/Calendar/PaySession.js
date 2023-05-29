import { useContext } from 'react'
import { LoggedInUserContext } from '../App'

const PaySession = () => {

    const { currentUser } = useContext(LoggedInUserContext)

    return (
        <h1>Hi {currentUser.first_name}</h1>
    )
}

export default PaySession