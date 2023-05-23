import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/esm/ListGroup'
import Button from 'react-bootstrap/Button'

import ProfileInfo from '../UserProfile/ProfileInfo'
import MembershipData from './MembershipData'
import ClassData from './ClassData'
import Create from './Create'

import { useHistory } from 'react-router-dom'
import AccordionItem from 'react-bootstrap/esm/AccordionItem'

const AdminDashboard = ({ currentUser, allUsers, setAllUsers, allClasses, setAllClasses, allMemberships, setAllMemberships }) => {
    
    const history = useHistory()

    const renderAllMemberships = (type) => allMemberships.map((membership) => {
        if (membership.type === type) {
            return (
                <MembershipData
                membership={membership}
                allMemberships={allMemberships}
                setAllMemberships={setAllMemberships}
                />
            )
        }
    })
    const renderClasses = (category) => allClasses.map((clas) => {
        if (clas.category === (category)) {
            return (
                <ClassData
                clas={clas}
                allClasses={allClasses}
                setAllClasses={setAllClasses}
                />
            )
        }
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
                <Tab eventKey="classes" title="Classes">
                    <Accordion>
                        <Accordion.Item eventKey='0'style={{marginBottom:"20px"}}>
                            <Accordion.Header>Climbing Classes</Accordion.Header>
                            <Accordion.Body id="adminClassesListGroup">
                                {renderClasses('Climbing')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='1' style={{marginBottom:"20px"}}>
                            <Accordion.Header>Yoga Classes</Accordion.Header>
                            <Accordion.Body id="adminClassesListGroup">
                                {renderClasses('Yoga')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='2' style={{marginBottom:"20px"}}>
                            <Accordion.Header>Fitness Classes</Accordion.Header>
                            <Accordion.Body id="adminClassesListGroup">
                                {renderClasses('Fitness')}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='3' style={{marginBottom:"20px"}}>
                            <Accordion.Header>Other Classes</Accordion.Header>
                            <Accordion.Body id="adminClassesListGroup">
                                {renderClasses('Misc')}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Tab>
                <Tab eventKey="create" title="Create" style={{textAlign:"center"}}>
                    <Create
                        allUsers={allUsers}
                        setAllUsers={setAllUsers}
                        allClasses={allClasses}
                        setAllClasses={setAllClasses}
                        allMemberships={allMemberships}
                        setAllMemberships={setAllMemberships}
                    />
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