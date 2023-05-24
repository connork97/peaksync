import { useContext, useEffect } from 'react'
import { LoggedInUserContext } from './App'

const Home = () => {

    const { currentUser } = useContext(LoggedInUserContext)

    useEffect(() => {
        fetch('/lastsession')
        .then((response) => response.json())
        .then((sessionData) => console.log(sessionData))
    }, [])

    return (
        <div className="mainDiv">
            <br></br><br></br><br></br><br></br><br></br>
            <h1>Welcome to Crux Climbing Centers {currentUser.first_name}!</h1>
        </div>
    )
}

export default Home