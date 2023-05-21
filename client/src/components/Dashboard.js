import { useRecoilState } from "recoil"
import { userState } from "../atoms.js"

import { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'

// import ListGroup from "react-bootstrap/ListGroup"
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table'
import Dropdown from "react-bootstrap/Dropdown"

import UserProfile from "./UserProfile/UserProfile.js";

const Dashboard = () => {

    const history = useHistory()

    const [currentUser, setCurrentUser] = useRecoilState(userState)
    const [allUsers, setAllUsers] = useState([])
    const [searchParams, setSearchParams] = useState("")
    const [searchCategory, setSearchCategory] = useState("Filter By")
    const [activeLi, setActiveLi] = useState("")

    const [selectedUserProfile, setSelectedUserProfile] = useState(null)

    useEffect(() => {
        fetch("/users")
        .then((response) => response.json())
        .then((userData) => setAllUsers(userData))
    }, [])

    const columnLabels = ["ID", "Last Name", "First Name", "Email", "Phone Number", "Waiver", "Address", "City", "State", "Zipcode", "Date of Birth", "Created At"]

    const renderColumnLabels = columnLabels.map((label) => {
        return <th>{label}</th>
    })

    const renderDropdownItems = columnLabels.map((label) => {
        return (
            <Dropdown.Item name={label} onClick={(event) => setSearchCategory(event.target.name)}>{label}</Dropdown.Item>
        )
    })

    const renderAllUsers = allUsers.map((user) => {
            return (
                <tr key={user.id} onClick={() => handleUserClick(user)} onDoubleClick={() => handleUserDoubleClick(user)} style={{background: activeLi === user.id ? "lightblue" : null}}>
                    <td>{user.id}</td>
                    <td>{user.last_name}</td>
                    <td>{user.first_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.waiver ? "True" : "False"}</td>
                    <td>{user.address}</td>
                    <td>{user.city}</td>
                    <td>{user.state}</td>
                    <td>{user.zipcode}</td>
                    <td>{user.date_of_birth}</td>
                    <td>{user.created_at}</td>
                </tr>
        )
    })

    let convertedSearchCategory = searchCategory.split(" ").join("_").toLowerCase()

    const handleUserClick = (user) => {
        setActiveLi(user.id)
        setSelectedUserProfile(user)
        console.log(user.signups)
    }

    const handleUserDoubleClick = (user) => {
        setSelectedUserProfile(user)
        console.log(user)
        history.push({pathname:"/profile", state:selectedUserProfile})
    }

    const filterUsers = (category) => allUsers.map((user) => {
        if (String(user[category]).toLowerCase().includes(String(searchParams).toLowerCase())) {
            return (
                <tr key={user.id} onClick={() => handleUserClick(user)} onDoubleClick={() => handleUserDoubleClick(user)} style={{background: activeLi === user.id ? "lightblue" : null}}>
                    <td>{user.id}</td>
                    <td>{user.last_name}</td>
                    <td>{user.first_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.waiver ? "True" : "False"}</td>
                    <td>{user.address}</td>
                    <td>{user.city}</td>
                    <td>{user.state}</td>
                    <td>{user.zipcode}</td>
                    <td>{user.date_of_birth}</td>
                    <td>{user.created_at}</td>
                </tr>
            )
        }
    })

    return (
        <>
            <h1>Dashboard Page</h1>
            <div id="adminSearchDiv" style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
            <input type="text" value={searchParams} onChange={(event) => setSearchParams(event.target.value)} style={{marginRight:"10px"}}></input>
            <Dropdown style={{marginLeft:"10px"}}>
                <Dropdown.Toggle>
                    {searchCategory}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {renderDropdownItems}
                </Dropdown.Menu>
            </Dropdown>
            </div>
            <Table id="adminDashboardTable">
                <thead>
                    <tr>
                        {renderColumnLabels}
                    </tr>
                </thead>
                <tbody>
                    {searchCategory === "Filter By" ? renderAllUsers : filterUsers(convertedSearchCategory)}
                </tbody>
            </Table>
        </>
    )
}

export default Dashboard