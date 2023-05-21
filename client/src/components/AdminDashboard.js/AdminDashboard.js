import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/esm/ListGroup'

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
                    <ListGroup id="adminMembershipsListGroup">
                        {renderAllMemberships}
                        {/* <MembershipData
                            allMemberships={allMemberships}
                            setAllMemberships={setAllMemberships}
                        /> */}
                    </ListGroup>
                </Tab>
                <Tab eventKey="classes" title="Classes">
                    <ClassData
                        allClasses={allClasses}
                        setAllClasses={setAllClasses}
                    />
                </Tab>
            </Tabs>
        </>
    )
}

export default AdminDashboard