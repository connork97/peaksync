import styles from './SignUp.module.css'

import { useState, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { LoggedInUserContext } from "../App"

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignUp = () => {

    const history = useHistory()

    const { setCurrentUser } = useContext(LoggedInUserContext)

    const [newUser, setNewUser] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "phoneNumber": "",
        "address": "",
        "city": "",
        "state": "",
        "zipcode": "",
        "dateOfBirth": "",
        "emergencyContactName": "",
        "emergencyContactPhoneNumber": "",
        "waiver": false
    })

    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSignUpInputChange = (event) => {
        const {name, value} = event.target
        if (name !== "waiver") {
            setNewUser((prevState) => ({
                ...prevState,
                [name]: value
            }))
        } else {
            setNewUser((prevState) => ({
                ...prevState,
                [name]: event.target.checked
              }));
        }
    }

    const handleCreateAccount = (event) => {
        event.preventDefault()
        if (newUser.password === confirmPassword) {
            fetch("https://peaksync-back-end.onrender.com/create-account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
            .then((response) => response.json())
            .then((newUserData) => {
                setCurrentUser(newUserData)
            })
            history.push({pathname:'/login'})
            
        } else {
            window.alert("Please make sure your passwords match.")
        }
    }

    return (
        <>
        <h1 className={styles.signUpPageH1}>Sign Up Page</h1>
        <div className={styles.signupHeaderDiv}>
            <h4>If you already have an account, go back to the login page.</h4>
            <h4>Otherwise, create your account here to sign up for classes, memberships, and access your profile information!</h4>
        </div>
            <div className={styles.signupFormDiv}>
                <Form className={styles.signupForm} onSubmit={handleCreateAccount}>
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control type="text" name="firstName" value={newUser.firstName} placeholder="John" required onChange={handleSignUpInputChange}></Form.Control>
                    <br></br>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control type="text" name="lastName" value={newUser.lastName} placeholder="Doe" required onChange={handleSignUpInputChange}></Form.Control>
                    <br></br><br></br>
                    <Form.Label>Date of Birth:</Form.Label>
                    <Form.Control type="text" name="dateOfBirth" value={newUser.dateOfBirth} placeholder="YYYY-MM-DD" required onChange={handleSignUpInputChange}></Form.Control>
                    <br></br>
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control type="number" name="phoneNumber" value={newUser.phoneNumber} placeholder="Phone Number" required onChange={handleSignUpInputChange}></Form.Control>
                    <br></br>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" value={newUser.email} placeholder="address@mail.com" required onChange={handleSignUpInputChange}></Form.Control>
                    <br></br>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" name="password" value={newUser.password} placeholder="Password" required onChange={handleSignUpInputChange}></Form.Control>
                    <Form.Control type="password" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" required onChange={(event) => setConfirmPassword(event.target.value)}></Form.Control>
                    <br></br>
                    <Form.Label>Address:</Form.Label>
                    <Form.Control type="text" name="address" value={newUser.address} placeholder="123 Your Address Street" required onChange={handleSignUpInputChange}></Form.Control>
                    <Form.Control type="text" name="city" value={newUser.city} placeholder="Los Angeles" required onChange={handleSignUpInputChange}></Form.Control>
                    <Form.Control type="text" name="state" value={newUser.state} placeholder="California" required onChange={handleSignUpInputChange}></Form.Control>
                    <Form.Control type="number" name="zipcode" value={newUser.zipcode} placeholder="12345" required onChange={handleSignUpInputChange}></Form.Control>
                    <br></br>
                    <Form.Label>Emergency Contact Full Name:</Form.Label>
                    <Form.Control type="text" name="emergencyContactName" value={newUser.emergencyContactName} required placeholder="Jane Doe" onChange={handleSignUpInputChange}></Form.Control>
                    <br></br>
                    <Form.Label>Emergency Contact Phone Number:</Form.Label>
                    <Form.Control type="number" name="emergencyContactPhoneNumber" value={newUser.emergencyContactPhoneNumber} required placeholder="1234567890" onChange={handleSignUpInputChange}></Form.Control>
                    <br></br><br></br>
                    <span className={styles.waiverSpan}>
                    <Form.Label className={styles.formLabel}>Click to Acknowledge Release of Liability:</Form.Label>
                    <Form.Check
                        className={styles.formCheck}
                        type="checkbox"
                        name="waiver"
                        value={newUser.waiver}
                        required
                        onChange={handleSignUpInputChange}>
                    </Form.Check>
                    </span>
                    <br></br><br></br>
                    <Button type="submit">Create Account!</Button>
                </Form>
            </div>
        </>
    )
}

export default SignUp