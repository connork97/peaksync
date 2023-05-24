import CreateUser from "./CreateUser"
import CreateEvent from './CreateEvent'
import CreateSession from './CreateSession'
import CreateMembership from "./CreateMembership"

import Accordion from 'react-bootstrap/Accordion'

const Create = ({ allUsers, setAllUsers, allEvents, setAllEvents, allMemberships, setAllMemberships, allSessions, setAllSessions, generalToggle, setGeneralToggle }) => {

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
                <Accordion.Header>Create a New Event or Class</Accordion.Header>
                <Accordion.Body>
                    <CreateEvent
                        allEvents={allEvents}
                        setAllEvents={setAllEvents}
                    />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" style={{marginBottom:"20px"}}>
                <Accordion.Header>Create New Calendar Item for Events and Classes</Accordion.Header>
                <Accordion.Body>
                    <CreateSession
                        allSessions={allSessions}
                        setAllSessions={setAllSessions}
                        allEvents={allEvents}
                        generalToggle={generalToggle}
                        setGeneralToggle={setGeneralToggle}
                    />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" style={{marginBottom:"20px"}}>
                <Accordion.Header>Create a New Membership or Offering</Accordion.Header>
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