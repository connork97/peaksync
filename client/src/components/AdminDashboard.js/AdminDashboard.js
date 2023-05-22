import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/esm/ListGroup'
import Button from 'react-bootstrap/Button'

import ProfileInfo from '../UserProfile/ProfileInfo'
import MembershipData from './MembershipData'
import ClassData from './ClassData'
import UserDatabase from './UserDatabase'

import { useHistory } from 'react-router-dom'

const AdminDashboard = ({ currentUser, allClasses, setAllClasses, allMemberships, setAllMemberships }) => {
    
    const history = useHistory()

    const renderAllMemberships = allMemberships.map((membership) => {
        return (
            <MembershipData
                membership={membership}
                allMemberships={allMemberships}
                setAllMemberships={setAllMemberships}
            />
        )
    })
    const renderAllClasses = allClasses.map((clas) => {
        return (
            <ClassData clas={clas} allClasses={allClasses} setAllClasses={setAllClasses} />
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
                <Button>Create New Membership (not functional)</Button>
                    <ListGroup id="adminMembershipsListGroup">
                        {renderAllMemberships}
                    </ListGroup>
                </Tab>
                <Tab eventKey="classes" title="Classes">
                    <Button>Create New Class (not functional)</Button>
                    <ListGroup id="adminClassesListGroup">
                        {renderAllClasses}
                    </ListGroup>
                </Tab>
                <Tab eventKey="userDatabase" title="User Database" style={{textAlign:"center"}}>
                    {/* <UserDatabase /> */}
                    <p>To view and manage the user database, a redirect is required.</p>
                    <p>Click the button below to search and edit user profiles.</p>
                    <Button onClick={() => history.push({pathname:"/database"})}>Go to User Database</Button>
                </Tab>
            </Tabs>
        </>
    )
}

export default AdminDashboard