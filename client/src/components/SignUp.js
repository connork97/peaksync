import { useState } from "react"

const SignUp = () => {

    const [user, setUser] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "phoneNumber": null,
        "address": "",
        "city": "",
        "state": "",
        "zipcode": null,
        "dateOfBirth": null,
        "emergencyContactName": "",
        "emergencyContactPhoneNumber": null,
        "waiver": false
    })

    return (
        <>
            <h1>Sign Up Page</h1>
            <div id="signUpDiv">
                <form id="signUpForm">
                <input type="text" name="firstName" value={user.firstName} placeholder="John"></input>
                <input type="text" name="lastName" value={user.lastName} placeholder="Doe"></input>
                <input type="email" name="email" value={user.email} placeholder="address@mail.com"></input>
                <input type="password" name="password" value={user.password} placeholder="Password"></input>
                <input type="number" name="phoneNumber" value={user.phoneNumber} placeholder="Phone Number Here (only numbers)"></input>
                <input type="text" name="address" value={user.address} placeholder="123 Your Address Street"></input>
                <input type="text" name="city" value={user.city} placeholder="Los Angeles"></input>
                <input type="text" name="state" value={user.state} placeholder="California"></input>
                <input type="number" name="zipcode" value={user.zipcode} placeholder="12345"></input>
                <input type="text" name="dateOfBirth" value={user.dateOfBirth} placeholder="YYYY-MM-DD"></input>
                <input type="text" name="emergencyContactName" value={user.emergencyContactName} placeholder="Jane Doe"></input>
                <input type="number" name="emergencyContactPhoneNumber" value={user.emergencyContactPhoneNumber} placeholder="1234567890"></input>
                <input type="checkbox" name="waiver" value={user.waiver}></input>
                </form>
            </div>
        </>
    )
}

export default SignUp