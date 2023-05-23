import CreateUser from "./CreateUser"
import CreateClass from './CreateClass'
import CreateMembership from "./CreateMembership"

import Accordion from 'react-bootstrap/Accordion'

const Create = ({ allUsers, setAllUsers, allClasses, setAllClasses, allMemberships, setAllMemberships }) => {

    return (
        <Accordion>
            <Accordion.Item eventKey='0' style={{marginBottom:"20px"}}>
                <Accordion.Header>Create a New User</Accordion.Header>
                <Accordion.Body>
                    <CreateUser 
                        allUsers={allUsers}
                        setAllUsers={setAllUsers}
                        />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" style={{marginBottom:"20px"}}>
                <Accordion.Header>Create a New Class</Accordion.Header>
                <Accordion.Body>
                    <CreateClass
                        allClasses={allClasses}
                        setAllClasses={setAllClasses}
                    />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" style={{marginBottom:"20px"}}>
                <Accordion.Header>Create a New Membership</Accordion.Header>
                <Accordion.Body>
                    <CreateMembership
                        allMemberships={allMemberships}
                        setAllMemberships={setAllMemberships}
                    />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default Create