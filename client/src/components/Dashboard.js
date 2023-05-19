import { useRecoilState } from "recoil"
import { userState } from "../atoms.js"

import { useState, useEffect } from "react"
import { render } from "react-dom"

// import ListGroup from "react-bootstrap/ListGroup"
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table'
import Dropdown from "react-bootstrap/Dropdown"

const Dashboard = () => {

    const [currentUser, setCurrentUser] = useRecoilState(userState)
    const [allUsers, setAllUsers] = useState([])
    const [searchParams, setSearchParams] = useState("")
    const [searchCategory, setSearchCategory] = useState("Filter By")

    const [activeLi, setActiveLi] = useState("")


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

    const handleDoubleClick = (itemId) => {
        console.log(`Item ${itemId} was double-clicked.`);
      };

    const convertSearchCategory = () => {
        let splitSearchCategory = searchCategory.split(" ")
        let joinedSearchCategory = splitSearchCategory.join("_")
        let convertedSearchCategory = joinedSearchCategory.toLowerCase()
        console.log(convertedSearchCategory)
        return convertedSearchCategory
    }

    let i = 0
    const renderAllUsers = allUsers.map((user) => {
        i++
        // convertSearchCategory()
        // if (searchCategory !== "Filter By" && user.convertedSearchCategory.includes(searchParams.toLowerCase())) {
            return (
                <>
            {/* <ListGroup.Item key={user.id} onClick={() => handleClickedLi(user.id)} onDoubleClick={() => handleDoubleClick(user.id)} active={activeLi === user.id}> */}
            <tr key={user.id} onClick={() => setActiveLi(user.id)} style={{background: activeLi === user.id ? "lightblue" : null}}>
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
        </>
        )
    // }
    })

    let convertedSearchCategory = searchCategory.split(" ").join("_").toLowerCase()
    console.log(convertedSearchCategory)

    // const filterUsers = (category) => allUsers.filter((user) => user[category].toLowerCase().includes(searchParams.toLowerCase()))
    // filterUsers(searchCategory)
    const filterUsers = (category) => allUsers.map((user) => {
        i++
        console.log(category)
        console.log(searchParams)
        // convertSearchCategory()
        // if (searchCategory !== "Filter By" && user.convertedSearchCategory.includes(searchParams.toLowerCase())) {
        if (String(user[category]).toLowerCase().includes(String(searchParams).toLowerCase())) {
            return (
                <>
            {/* <ListGroup.Item key={user.id} onClick={() => handleClickedLi(user.id)} onDoubleClick={() => handleDoubleClick(user.id)} active={activeLi === user.id}> */}
            <tr key={user.id} onClick={() => setActiveLi(user.id)} style={{background: activeLi === user.id ? "lightblue" : null}}>
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
        </>
        )
    }
    // }
    })
    return (
        <>
            <h1>Dashboard Page</h1>
            <div id="adminSearchDiv" style={{display: "flex"}}>
            <input type="text" value={searchParams} onChange={(event) => setSearchParams(event.target.value)}></input>
            <Dropdown>
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