import { useState, useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { AllUsersContext, LoggedInUserContext } from "../App.js";

import Table from 'react-bootstrap/Table'
import Dropdown from "react-bootstrap/Dropdown"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const UserDatabase = () => {

    const { allUsers, setAllUsers } = useContext(AllUsersContext)
    const { currentUser } = useContext(LoggedInUserContext)

    const history = useHistory()

    const [searchParams, setSearchParams] = useState("")
    const [searchCategory, setSearchCategory] = useState("Customer")
    const [activeLi, setActiveLi] = useState("")
    const [selectedUserProfile, setSelectedUserProfile] = useState(null)

    const columnLabels = ["ID", "Customer", "Email", "Phone Number", "Waiver", "Address", "City", "State", "Zipcode", "Date of Birth", "Created At", "Admin"]

    const renderColumnLabels = columnLabels.map((label) => {
        if (label === 'Date of Birth') {
            return <th key={label}>{"D.O.B"}</th>
        } else {
            return <th key={label}>{label}</th>
        }
    })

    const renderDropdownItems = columnLabels.map((label) => {
        return (
            <Dropdown.Item name={label} key={label} onClick={(event) => setSearchCategory(event.target.name)}>{label}</Dropdown.Item>
        )
    })

    let convertedSearchCategory = searchCategory.split(" ").join("_").toLowerCase()
    const handleUserClick = (user) => {
        setActiveLi(user.id)
        setSelectedUserProfile(user)
    }

    const handleUserDoubleClick = (user) => {
        setSelectedUserProfile(user)
        history.push({pathname:"/profile", state:selectedUserProfile})
    }

    const filterUsers = allUsers.map((user) => {
            return (
                <tr key={user.id} onClick={() => handleUserClick(user)} onDoubleClick={() => handleUserDoubleClick(user)} style={{background: activeLi === user.id ? "lightblue" : null}}>
                    <td>{user.id}</td>
                    <td>{user.last_name}, {user.first_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.waiver ? "True" : "False"}</td>
                    <td>{user.address}</td>
                    <td>{user.city}</td>
                    <td>{user.state}</td>
                    <td>{user.zipcode}</td>
                    <td>{user.date_of_birth}</td>
                    <td>{user.created_at}</td>
                    <td>{user.admin ? "True" : "False"}</td>
                </tr>
            )
    })

    const handleFetchUsers = (event) => {
        event.preventDefault()
        fetch('https://peaksync-back-end.onrender.com/users/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "search_term": searchParams,
                "column_to_search": convertedSearchCategory
            })
        })
        .then((response) => response.json())
        .then((userData) => {
            setAllUsers(userData)
            console.log(userData)
        })
    }

    return (
        <div>
            <h1 style={{marginTop:'2rem', marginBottom:'1.5rem'}}>User Database</h1>
            <div id="adminSearchDiv" style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
            <Form onSubmit={handleFetchUsers} style={{display:'flex'}}>
                <Form.Control type="text" value={searchParams} onChange={(event) => setSearchParams(event.target.value)} 
                    style={{marginRight:"10px", width:'25vw', paddingLeft:'10px', paddingRight:'10px', border:'1px solid rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
                </Form.Control>
                <Button type="submit">Search</Button>
            </Form>
            <Dropdown style={{marginLeft:'2rem'}}>
                <span style={{marginRight:'0.75rem'}}><b>Filter By:</b></span>
                <Dropdown.Toggle>
                    {searchCategory}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {renderDropdownItems}
                </Dropdown.Menu>
            </Dropdown>
            </div>
            <div style={{width:'90vw', margin:'auto', marginTop:'2rem', marginBottom:'2.5rem', border:'1px solid rgba(0, 0, 0, 0.5)', borderRadius:'25px'}}>
            <Table id="adminDashboardTable" style={{width:'95%', marginTop:'1rem', margin:'auto'}}>
                <thead>
                    <tr>
                        {renderColumnLabels}
                    </tr>
                </thead>
                <tbody>
                    {filterUsers}
                </tbody>
            </Table>
            </div>
        </div>
    )
}

export default UserDatabase