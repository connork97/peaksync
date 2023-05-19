import { useRecoilState } from "recoil"
import { userState } from "../atoms.js"

import { useState, useEffect } from "react"
import { render } from "react-dom"

// import ListGroup from "react-bootstrap/ListGroup"
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table'

const Dashboard = () => {

    const [currentUser, setCurrentUser] = useRecoilState(userState)
    const [allUsers, setAllUsers] = useState([])
    const [searchParams, setSearchParams] = useState("")
    const [searchCategeory, setSearchCategory] = useState("")

    const [activeLi, setActiveLi] = useState("")


    useEffect(() => {
        fetch("/users")
        .then((response) => response.json())
        .then((userData) => setAllUsers(userData))
    }, [])

    const columnLabels = ["ID", "Last Name", "First Name", "Email", "Phone Number", "Waiver", "Address", "City", "State", "Zipcode", "Date of Birth", "Created At"]

    const renderColumnLabels = columnLabels.map((label) => {
        return <td>{label} --- </td>
    })

    const handleClickedLi = (id) => {
        setActiveLi(id)
        console.log(id)
    }

    const handleDoubleClick = (itemId) => {
        console.log(`Item ${itemId} was double-clicked.`);
      };

    let i = 0
    const renderAllUsers = allUsers.map((user) => {
        i++
        return (
            <>
                {/* <ListGroup.Item key={user.id} onClick={() => handleClickedLi(user.id)} onDoubleClick={() => handleDoubleClick(user.id)} active={activeLi === user.id}> */}
                <tr key={user.id} onClick={() =>handleClickedLi(user.id)} style={{background: activeLi === user.id ? "lightblue" : null}}>
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
                {/* </ListGroup.Item> */}
            </>
        )
    })

    return (
        <>
            <h1>Dashboard Page</h1>
            <Table id="adminDashboardTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Waiver</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zipcode</th>
                        <th>Date Of Birth</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {renderAllUsers}
                </tbody>
            </Table>
        </>
    )
}

export default Dashboard