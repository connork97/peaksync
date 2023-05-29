import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { LoggedInUserContext, AllEventsContext, AllMembershipsContext, AllSignupsContext } from '../App'

import ProfileInfo from '../UserProfile/ProfileInfo'
import MembershipData from './Data/MembershipData'
import EventData from './Data/EventData'
import Create from './Create/Create'
import SignupData from './Data/SignupData'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/esm/ListGroup'
import Button from 'react-bootstrap/Button'
import AccordionItem from 'react-bootstrap/esm/AccordionItem'

const AdminDashboard = () => {
    
    const { currentUser } = useContext(LoggedInUserContext)
    const { allEvents } = useContext(AllEventsContext)
    const { allMemberships } = useContext(AllMembershipsContext)
    const { allSignups } = useContext(AllSignupsContext)

    const history = useHistory()

    const renderAllMemberships = (type) => allMemberships.map((membership) => {
        if (membership.type === type) {
            return (
                <MembershipData membership={membership} />
            )
        }
    })
    
    const renderEvents = (category) => allEvents.map((event) => {
        if (event.category === (category)) {
            return (
                <EventData event={event} />
            )
        }
    })
    const renderAllSignups = allSignups.map((signup) => {
        console.log(signup)
        return (
            <SignupData signup={signup} />
        )
    })
    return (
        <>
            <h1>Admin Dashboard</h1>
            <Tabs
                defaultActiveKey="profile"
                id="justify-tab-profile"
                className='mb-3'
                justify
            >
                <Tab eventKey="profile" title="Your Profile">
                    <ProfileInfo selectedUser={currentUser} />
                </Tab>
                <Tab eventKey="memberships" title="Memberships">
                    <Accordion>
                    <Accordion.Item eventKey='0' style={{marginBottom:"20px"}}>
                            <Accordion.Header>Guest</Accordion.Header>
                            <Accordion.Body>
                                {renderAllMemberships('Guest')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='1' style={{marginBottom:"20px"}}>
                            <Accordion.Header>Memberships</Accordion.Header>
                            <Accordion.Body>
                                {renderAllMemberships('Member')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='2' style={{marginBottom:"20px"}}>
                            <Accordion.Header>Punch Cards</Accordion.Header>
                            <Accordion.Body>
                                {renderAllMemberships('Punch Card')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='3' style={{marginBottom:"20px"}}>
                            <Accordion.Header>Other</Accordion.Header>
                            <Accordion.Body>
                                {renderAllMemberships('Misc')}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Tab>
                <Tab eventKey="events" title="Events">
                    <Accordion>
                        <Accordion.Item eventKey='0'style={{marginBottom:"20px"}}>
                            <Accordion.Header>Climbing Classes</Accordion.Header>
                            <Accordion.Body id="adminEventsListGroup">
                                {renderEvents('Climbing')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='1' style={{marginBottom:"20px"}}>
                            <Accordion.Header>Yoga Classes</Accordion.Header>
                            <Accordion.Body id="adminEventsListGroup">
                                {renderEvents('Yoga')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='2' style={{marginBottom:"20px"}}>
                            <Accordion.Header>Fitness Classes</Accordion.Header>
                            <Accordion.Body id="adminEventsListGroup">
                                {renderEvents('Fitness')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='3' style={{marginBottom:"20px"}}>
                            <Accordion.Header>Other Classes and Events</Accordion.Header>
                            <Accordion.Body id="adminEventsListGroup">
                                {renderEvents('Misc')}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Tab>
                <Tab eventKey="signups" title="Signups">
                    
                    {/* <Accordion> */}
                        {/* <Accordion.Item eventKey='0'style={{marginBottom:"20px"}}> */}
                            {/* <Accordion.Header>Climbing Classes</Accordion.Header> */}
                            {/* <Accordion.Body id="adminSignupsListGroup"> */}
                            <ListGroup>
                                {renderAllSignups}
                            </ListGroup>
                            {/* </Accordion.Body> */}
                        {/* </Accordion.Item> */}
                    {/* </Accordion> */}
                </Tab>
                <Tab eventKey="create" title="Create" style={{textAlign:"center"}}>
                    <Create />
                </Tab>
                <Tab eventKey="userDatabase" title="User Database" style={{textAlign:"center"}}>
                    <p>To view and manage the user database, a redirect is required.</p>
                    <p>Click the button below to search and edit user profiles.</p>
                    <Button onClick={() => history.push({pathname:"/database"})}>Go to User Database</Button>
                </Tab>
            </Tabs>
        </>
    )
}

export default AdminDashboard