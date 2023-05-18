import { useState } from "react"
import { useHistory } from "react-router-dom"

const Login = () => {

    const history = useHistory()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <>
            <h1>Login Page</h1>
            <div id="loginDiv">
                <form id="loginForm">
                    <input type="email" name="email" value={email} placeholder="address@email.com" onChange={(event) => setEmail(event.target.value)}></input>
                    <br></br><br></br>
                    <input type="password" name="password" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)}></input>
                    <br></br><br></br>
                    <button type="submit">Login!</button>
                </form>
            </div>
            <div>
                <h3>Don't have an account yet?  Sign up for one here!</h3>
                <button onClick={() => history.push({pathname: "/signup"})}>Create Account</button>
            </div>
        </>
    )
}

export default Login