import { useContext } from 'react'
import { AllMembershipsContext } from '../App'

import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

const MembershipOfferings = () => {
    const { allMemberships } = useContext(AllMembershipsContext)
    // console.log(allMemberships)

    const renderAllMemberships = allMemberships.map((membership) => {
        return (
            <Accordion.Item eventKey={membership.id} style={{marginTop:'20px'}}>
                <Accordion.Header>{membership.name}</Accordion.Header>
                <Accordion.Body>
                    Price: ${membership.price}
                    <br></br><br></br>
                    Description: {membership.description}
                    <br></br><br></br>
                    <Button>Sign Up Here!</Button>
                </Accordion.Body>
            </Accordion.Item>
        )
    })
    return (
        <div>
            <h1>Memberships</h1>
            <Accordion style={{margin:'auto', textAlign:'left', width:'75vw'}}>
                {renderAllMemberships}
            </Accordion>
        </div>
    )
}

export default MembershipOfferings