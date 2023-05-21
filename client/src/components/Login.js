import { useState } from "react"
import { useHistory } from "react-router-dom"
import { userState } from "../atoms"
import { useRecoilState, setRecoilState } from "recoil"

import Button from 'react-bootstrap/Button'

const Login = () => {

    const history = useHistory()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [currentUser, setCurrentUser] = useRecoilState(userState)

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
        })
        console.log(currentUser)
        console.log(userState)
    }

    const handleLogout = () => {
        fetch('/logout', {
            method: 'DELETE'
        })
    }

    return (
        <>
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
        </>
    )
}

export default Login