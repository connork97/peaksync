import { useContext, useState, useEffect } from 'react'
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
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

const AdminDashboard = () => {
    
    const { currentUser } = useContext(LoggedInUserContext)
    const { allEvents } = useContext(AllEventsContext)
    const { allMemberships } = useContext(AllMembershipsContext)
    const { allSignups, setAllSignups } = useContext(AllSignupsContext)

    const history = useHistory()

    useEffect(() => {
        fetch('https://peaksync-back-end.onrender.com/signups')
        .then((response) => response.json())
        .then((signupData) => setAllSignups(signupData))
      }, [])

    const renderAllMemberships = (type) => allMemberships.map((membership) => {
        if (membership.type === type) {
            return (
                <MembershipData membership={membership} key={membership.id} />
            )
        }
    })
    
    const renderEvents = (category) => allEvents.map((event) => {
        if (event.category === (category)) {
            return (
                <EventData event={event} key={event.id} />
            )
        }
    })

    const [signupSearch, setSignupSearch] = useState("")
    const signupFilterCategories = ['All', 'Event', 'Customer', 'Date', 'Time', 'Created At']
    const [signupFilter, setSignupFilter] = useState("Filter By")

    const renderSignupDropdownMenu = signupFilterCategories.map((category) => {
        return <Dropdown.Item key={category} onClick={() => setSignupFilter(category)}>{category}</Dropdown.Item>
    })

    const renderSignupsByCategory = allSignups.map((signup) => {
        // console.log(signup)
        if (signupFilter === 'All' || signupFilter === 'Filter By') {
            return <SignupData signup={signup} key={signup.id} />
        } else if (signupFilter === 'Event') {
            if (signup.session.event.name.toLowerCase().includes(signupSearch.toLowerCase())) {
                return <SignupData signup={signup} key={signup.id} />
            }
        } else if (signupFilter === 'Customer') {
            if (signup.user.first_name.toLowerCase().includes(signupSearch.toLowerCase()) || signup.user.last_name.toLowerCase().includes(signupSearch.toLowerCase())) {
                return <SignupData signup={signup} key={signup.id} />
            }
        } else if (signupFilter === 'Date') {
            if (signup.session.date.includes(signupSearch)) {
                return <SignupData signup={signup} key={signup.id} />
            }
        } else if (signupFilter === 'Time') {
            if (signup.session.time.includes(signupSearch)) {
                return <SignupData signup={signup} key={signup.id} />
            }
        } else if (signupFilter === 'Created At') {
            if (signup.created_at.includes(signupSearch)) {
                return <SignupData signup={signup} key={signup.id} />
            }
        }
    })

    return (
        <>
            <h1 style={{marginTop:'2rem', marginBottom:'2rem'}}>Admin Dashboard</h1>
            <Tabs
                defaultActiveKey="profile"
                id="justify-tab-profile"
                className='mb-3'
                justify
            >
                <Tab eventKey="profile" title="Your Profile">
                    <ProfileInfo selectedUser={currentUser} />
                </Tab>
                <Tab eventKey="memberships" title="Memberships" style={{width:'75vw', margin:'auto', marginTop:'2.5rem'}}>
                    <Accordion>
                    <Accordion.Item eventKey='0' style={{marginBottom:"2rem"}}>
                            <Accordion.Header>Guest</Accordion.Header>
                            <Accordion.Body>
                                {renderAllMemberships('Guest')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='1' style={{marginBottom:"2rem", borderTop:'1px solid rgba(0, 0, 0, 0.1)'}}>
                            <Accordion.Header>Memberships</Accordion.Header>
                            <Accordion.Body>
                                {renderAllMemberships('Member')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='2' style={{marginBottom:"2rem", borderTop:'1px solid rgba(0, 0, 0, 0.1)'}}>
                            <Accordion.Header>Punch Cards</Accordion.Header>
                            <Accordion.Body>
                                {renderAllMemberships('Punch Card')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='3' style={{marginBottom:"2rem", borderTop:'1px solid rgba(0, 0, 0, 0.1)'}}>
                            <Accordion.Header>Other</Accordion.Header>
                            <Accordion.Body>
                                {renderAllMemberships('Misc')}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Tab>
                <Tab eventKey="events" title="Events" style={{width:'75vw', margin:'auto', marginTop:'2.5rem'}}>
                    <Accordion>
                        <Accordion.Item eventKey='0'style={{marginBottom:"2rem"}}>
                            <Accordion.Header>Climbing Classes</Accordion.Header>
                            <Accordion.Body id="adminEventsListGroup">
                                {renderEvents('Climbing')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='1' style={{marginBottom:"2rem", borderTop:'1px solid rgba(0, 0, 0, 0.1)'}}>
                            <Accordion.Header>Yoga Classes</Accordion.Header>
                            <Accordion.Body id="adminEventsListGroup">
                                {renderEvents('Yoga')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='2' style={{marginBottom:"2rem", borderTop:'1px solid rgba(0, 0, 0, 0.1)'}}>
                            <Accordion.Header>Fitness Classes</Accordion.Header>
                            <Accordion.Body id="adminEventsListGroup">
                                {renderEvents('Fitness')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='3' style={{marginBottom:"2rem", borderTop:'1px solid rgba(0, 0, 0, 0.1)'}}>
                            <Accordion.Header>Events</Accordion.Header>
                            <Accordion.Body id="adminEventsListGroup">
                                {renderEvents('Event')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='4' style={{marginBottom:"2rem", borderTop:'1px solid rgba(0, 0, 0, 0.1)'}}>
                            <Accordion.Header>Other Classes and Events</Accordion.Header>
                            <Accordion.Body id="adminEventsListGroup">
                                {renderEvents('Misc')}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Tab>
                <Tab eventKey="signups" title="Signups" style={{width:'75vw', margin:'auto', marginTop:'2.5rem'}}>
                    <div style={{marginTop:'2rem', marginBottom:'2rem'}}>
                        <Form style={{display:'flex', margin:'auto', justifyContent:'center', textAlign:'center'}}>
                            <Form.Control value={signupSearch} style={{width:'50%', marginRight:'1.5rem'}} onChange={(event) => setSignupSearch(event.target.value)}></Form.Control>
                            <Dropdown style={{marginLeft:'1.5rem'}}>
                                <Dropdown.Toggle>{signupFilter}</Dropdown.Toggle>
                                <Dropdown.Menu>{renderSignupDropdownMenu}</Dropdown.Menu>
                            </Dropdown>
                        </Form>
                    </div>
                            <ListGroup>
                                {renderSignupsByCategory}
                            </ListGroup>
                </Tab>
                <Tab eventKey="create" title="Create" style={{textAlign:'center', width:'75vw', margin:'auto', marginTop:'2.5rem'}}>
                    <Create />
                </Tab>
                <Tab eventKey="userDatabase" title="User Database" style={{textAlign:"center"}}>
                    <h2 style={{marginTop:'10rem', marginBottom:'3rem'}}>To view and manage the user database, a redirect is required.</h2>
                    <h3>Click the button below to search and edit user profiles.</h3>
                    <Button onClick={() => history.push({pathname:"/database"})} style={{marginTop:'3rem', width:'17.5rem', height:'3.5rem'}}>Go to User Database</Button>
                </Tab>
            </Tabs>
        </>
    )
}

export default AdminDashboard