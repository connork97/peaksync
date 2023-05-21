import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

import Button from 'react-bootstrap/Button'

const Login = ({ currentUser, setCurrentUser, allUsers, setAllUsers, setAllMemberships, setAllClasses }) => {

    const history = useHistory()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // const [currentUser, setCurrentUser] = useRecoilState(userState)
    const handleUserLogin = (event) => {
        event.preventDefault()
        fetch("/login", {
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
            fetchAllUsers(userData)
        })
    }
    
    const fetchAllClasses = () => {
        fetch("/classes")
        .then((response) => response.json())
        .then((classData) => setAllClasses(classData))
    }

    const fetchAllMemberships = () => {
        fetch("/memberships")
        .then((response) => response.json())
        .then((membershipData) => {
            setAllMemberships(membershipData)
            fetchAllClasses()
        })
    }
    
    const fetchAllUsers = (user) => {
        if (user.admin === true) {
            fetch("/users")
            .then((response) => response.json())
            .then((userData) => {
                setAllUsers(userData)
                fetchAllMemberships()
            })
        } else {
            console.log("No admin priveledges")
        }
    }

    const handleLogout = () => {
        fetch('/logout', {
            method: 'DELETE'
        })
    }

    return (
        <div className="mainDiv">
            <div id="loginDiv">
            <h1>Login Page</h1>
                <form id="loginForm" onSubmit={handleUserLogin}>
                    <input type="email" name="email" value={email} placeholder="address@email.com" onChange={(event) => setEmail(event.target.value)}></input>
                    <br></br><br></br>
                    <input type="password" name="password" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)}></input>
                    <br></br><br></br>
                    <Button type="submit">Login!</Button>
                </form>
            </div>
            <div>
                <h3>Don't have an account yet?  Sign up for one here!</h3>
                <Button onClick={() => history.push({pathname: "/signup"})}>Create Account</Button>
            </div>
            <div id="logoutDiv">
                <h3>Logout Here</h3>
                <Button onClick={() => handleLogout()}>Logout</Button>
            </div>
        </div>
    )
}

export default Login