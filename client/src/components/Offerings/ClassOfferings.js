import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AllEventsContext } from '../App'

import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

const ClassOfferings = () => {

    const history = useHistory()

    const { allEvents } = useContext(AllEventsContext)
    // console.log(allEvents)

    const renderAllEvents = allEvents.map((event) => {
        return (
            <Accordion.Item eventKey={event.id} style={{marginTop:'20px'}}>
                <Accordion.Header>{event.name}</Accordion.Header>
                <Accordion.Body>
                    Price: ${event.price}
                    <br></br><br></br>
                    Description: {event.description}
                </Accordion.Body>
            </Accordion.Item>
        )
    })
    return (
        <div style={{margin:'auto', textAlign:'center'}}>
            <h1>Classes</h1>
            <Button onClick={() => history.push({pathname:'/calendar'})}>Go to Calendar</Button>
            <Accordion style={{margin:'auto', textAlign:'left', width:'75vw'}}>
                {renderAllEvents}
            </Accordion>
        </div>
    )
}

export default ClassOfferings