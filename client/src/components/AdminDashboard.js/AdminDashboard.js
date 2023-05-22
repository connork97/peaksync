import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/esm/ListGroup'
import Button from 'react-bootstrap/Button'

import ProfileInfo from '../UserProfile/ProfileInfo'
import MembershipData from './MembershipData'
import ClassData from './ClassData'

const AdminDashboard = ({ currentUser, allClasses, setAllClasses, allMemberships, setAllMemberships }) => {
    
    const renderAllMemberships = allMemberships.map((membership) => {
        return (
            <MembershipData
                membership={membership}
            />
        )
    })
    const renderAllClasses = allClasses.map((clas) => {
        return (
            <ClassData clas={clas} />
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
            </Tabs>
        </>
    )
}

export default AdminDashboard