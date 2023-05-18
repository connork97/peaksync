import { useState } from "react"

const SignUp = () => {

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
        fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
        })
        .then((response) => response.json())
        .then((newUserData) => console.log(newUserData))
    }

    return (
        <>
            <h1>Sign Up Page</h1>
            <div id="signUpDiv">
                <form id="signUpForm" onSubmit={handleCreateAccount}>
                    <input type="text" name="firstName" value={newUser.firstName} placeholder="John" onChange={handleSignUpInputChange}></input>
                    <input type="text" name="lastName" value={newUser.lastName} placeholder="Doe" onChange={handleSignUpInputChange}></input>
                    <br></br><br></br>
                    <input type="text" name="dateOfBirth" value={newUser.dateOfBirth} placeholder="YYYY-MM-DD" onChange={handleSignUpInputChange}></input>
                    <input type="number" name="phoneNumber" value={newUser.phoneNumber} placeholder="Phone Number Here (only numbers)" onChange={handleSignUpInputChange}></input>
                    <br></br><br></br>
                    <input type="email" name="email" value={newUser.email} placeholder="address@mail.com" onChange={handleSignUpInputChange}></input>
                    <input type="password" name="password" value={newUser.password} placeholder="Password" onChange={handleSignUpInputChange}></input>
                    <br></br><br></br>
                    <input type="text" name="address" value={newUser.address} placeholder="123 Your Address Street" onChange={handleSignUpInputChange}></input>
                    <input type="text" name="city" value={newUser.city} placeholder="Los Angeles" onChange={handleSignUpInputChange}></input>
                    <br></br><br></br>
                    <input type="text" name="state" value={newUser.state} placeholder="California" onChange={handleSignUpInputChange}></input>
                    <input type="number" name="zipcode" value={newUser.zipcode} placeholder="12345" onChange={handleSignUpInputChange}></input>
                    <br></br><br></br>
                    <input type="text" name="emergencyContactName" value={newUser.emergencyContactName} placeholder="Jane Doe" onChange={handleSignUpInputChange}></input>
                    <input type="number" name="emergencyContactPhoneNumber" value={newUser.emergencyContactPhoneNumber} placeholder="1234567890" onChange={handleSignUpInputChange}></input>
                    <br></br><br></br>
                    <label htmlFor="waiver">Click to accept release of liability waiver: </label>
                    <input type="checkbox" name="waiver" value={newUser.waiver} onChange={handleSignUpInputChange}></input>
                    <br></br><br></br>
                    <button type="submit">Create Account</button>
                </form>
            </div>
        </>
    )
}

export default SignUp