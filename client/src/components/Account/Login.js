import { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { LoggedInUserContext, AllUsersContext } from "../App"

const Login = () => {

    const history = useHistory()

    const { currentUser, setCurrentUser } = useContext(LoggedInUserContext)
    const { setAllUsers } = useContext(AllUsersContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const fetchUserBySessionData = (sessionData) => {
        fetch(`https://peaksync-back-end.onrender.com/users/${sessionData}`)
        .then((response) => response.json())
        .then((userData) => {
            setCurrentUser(userData)
            // fetchAllUsers(currentUser)
        })
    }

    useEffect(() => {
        // fetch('https://peaksync-back-end.onrender.com/check-session')
        // .then((response) => response.json())
        // .then((sessionData) => fetchUserBySessionData(sessionData))
        const userId = localStorage.getItem("user_id")
        if (userId) {
            fetch(`https://peaksync-back-end.onrender.com/${userId}`)
            .then((response) => response.json())
            .then((loggedInUserData) => setCurrentUser(loggedInUserData))
        }
    }, [])
    
    const handleUserLogin = (event) => {
        event.preventDefault()
        fetch("https://peaksync-back-end.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
        })
        .then((response) => response.json())
        .then((userData) => {
            setCurrentUser(userData)
            localStorage.setItem("user_id", userData.id)
        })
    }

    const handleLogout = () => {
        fetch('https://peaksync-back-end.onrender.com/logout', {
            method: 'DELETE'
        })
        localStorage.removeItem("user_id")
        setCurrentUser({})
        setAllUsers([])
        history.push({pathname:"/"})
    }

    return (
        <div className="mainDiv">
            {Object.keys(currentUser).length > 0 ?
            <div id="loggedInDiv" style={{marginTop:'3rem'}}>
                <h1>Hi {currentUser.first_name}, thanks for logging in!</h1>
                <h3 style={{marginTop:'2rem', marginBottom:'3rem'}}>To view or edit your profile information, <Link to="/profile">click here</Link>.</h3>
                <Button onClick={() => handleLogout()} style={{width:'10rem', height:'3rem'}}>Logout</Button>
            </div>
            :
            <>
                <h1>Login Here:</h1>
                <div id="loginDiv" style={{width: '42.5vw', margin:'auto', marginBottom:'2rem', border: '1px solid rgba(0, 0, 0, 0.5)', borderRadius:'25px'}}>
                    <br></br>
                    <Form id="loginForm" onSubmit={handleUserLogin}
                    style={{width:'95%', height:'100%', margin:'auto'}}>
                        <Form.Control type="email" name="email" value={email} placeholder="address@email.com" onChange={(event) => setEmail(event.target.value)}></Form.Control>
                        <br></br><br></br>
                        <Form.Control type="password" name="password" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)}></Form.Control>
                        <br></br><br></br>
                        <Button type="submit" style={{marginBottom:'1rem'}}>Login!</Button>
                    </Form>
                </div>
                <div>
                    <h3>Don't have an account yet?  Sign up for one here!</h3>
                    <br></br>
                    <Button onClick={() => history.push({pathname: "/signup"})}>Create Account</Button>
                    <br></br><br></br>
                </div>
            </>
            }
        </div>
    )
}

export default Login