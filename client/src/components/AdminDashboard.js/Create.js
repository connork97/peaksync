import { useState } from 'react'

import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import UserProfile from '../UserProfile/UserProfile'
import ProfileInfo from '../UserProfile/ProfileInfo'
import CreateUser from "./CreateUser"
const Create = ({ allUsers, setAllUsers, allClasses, setAllClasses, allMemberships, setAllMemberships }) => {

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>Create a New User</Accordion.Header>
                <Accordion.Body>
                    <CreateUser 
                        allUsers={allUsers}
                        setAllUsers={setAllUsers}
                    />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default Create