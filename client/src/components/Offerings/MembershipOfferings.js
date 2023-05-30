import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AllMembershipsContext } from '../App'

import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

const MembershipOfferings = () => {

    const history = useHistory()

    const { allMemberships } = useContext(AllMembershipsContext)

    const renderAllMemberships = allMemberships.map((membership) => {
        return (
            <Accordion.Item eventKey={membership.id} style={{marginTop:'20px'}}>
                <Accordion.Header>{membership.name}</Accordion.Header>
                <Accordion.Body>
                    Price: ${membership.price}
                    <br></br><br></br>
                    Description: {membership.description}
                    <br></br><br></br>
                    {membership.type === 'Guest' ? null 
                    : <Button onClick={() => history.push({pathname:"/confirm-membership-order", state:membership})}>Sign Up Here!</Button>
                    }
                </Accordion.Body>
            </Accordion.Item>
        )
    })
    return (
        <>
        <h1>Memberships</h1>
        <div className="offeringsDiv">
            <Accordion style={{margin:'auto', textAlign:'left', width:'75vw'}}>
                {renderAllMemberships}
            </Accordion>
        </div>
        </>
    )
}

export default MembershipOfferings