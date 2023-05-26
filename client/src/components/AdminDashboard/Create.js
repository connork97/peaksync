import CreateUser from "./CreateUser"
import CreateEvent from './CreateEvent'
import CreateSession from './CreateSession'
import CreateMembership from "./CreateMembership"

import Accordion from 'react-bootstrap/Accordion'

const Create = () => {

    return (
        <Accordion>
            <Accordion.Item eventKey='0' style={{marginBottom:"20px"}}>
                <Accordion.Header>Create a New User</Accordion.Header>
                <Accordion.Body>
                    <CreateUser />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" style={{marginBottom:"20px"}}>
                <Accordion.Header>Create a New Event or Class</Accordion.Header>
                <Accordion.Body>
                    <CreateEvent />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" style={{marginBottom:"20px"}}>
                <Accordion.Header>Create New Calendar Item for Events and Classes</Accordion.Header>
                <Accordion.Body>
                    <CreateSession/>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" style={{marginBottom:"20px"}}>
                <Accordion.Header>Create a New Membership or Offering</Accordion.Header>
                <Accordion.Body>
                    <CreateMembership />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default Create