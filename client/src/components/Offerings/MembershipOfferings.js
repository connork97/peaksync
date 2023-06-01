import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AllMembershipsContext, LoggedInUserContext } from '../App'

import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

const MembershipOfferings = () => {

    const history = useHistory()

    const { allMemberships } = useContext(AllMembershipsContext)
    const { currentUser } = useContext(LoggedInUserContext)

    const renderAllMemberships = allMemberships.map((membership) => {
        return (
            <Accordion.Item eventKey={membership.id} style={{marginTop:'20px', borderTop:'1px solid rgba(0, 0, 0, 0.1)'}}>
                <Accordion.Header>{membership.name}</Accordion.Header>
                <Accordion.Body>
                    Price: ${membership.price}
                    <br></br><br></br>
                    Description: {membership.description}
                    <br></br><br></br>
                    {membership.type === 'Guest' ? null 
                    : Object.keys(currentUser).length > 0 ?
                        <Button onClick={() => history.push({pathname:"/confirm-membership-order", state:membership})}>Sign Up Here!</Button> 
                        : <span style={{color:'rgba(0, 0, 0, 0.5)'}}>(Must be signed in to sign up)</span>
                    }
                </Accordion.Body>
            </Accordion.Item>
        )
    })
    return (
        <div id="membershipOfferingsPage" style={{marginTop:'2rem', marginBottom:'10rem'}}>
            <h1 style={{marginBottom:'2rem'}}>Memberships and More!</h1>
            <div className="offeringsDiv">
                <Accordion style={{margin:'auto', textAlign:'left', width:'75vw'}}>
                    {renderAllMemberships}
                </Accordion>
            </div>
        </div>
    )
}

export default MembershipOfferings