import { useContext } from 'react'
import { LoggedInUserContext } from '../App'

const SuccessfulSignup = () => {

    const { currentUser } = useContext(LoggedInUserContext)

    return (
        <h1>Thanks for your purchase!</h1>
    )
}

export default SuccessfulSignup