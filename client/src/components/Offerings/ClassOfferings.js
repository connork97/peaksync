import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AllEventsContext } from '../App'

import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

const ClassOfferings = () => {

    const history = useHistory()

    const { allEvents } = useContext(AllEventsContext)

    const renderAllEvents = allEvents.map((event) => {
        return (
            <Accordion.Item eventKey={event.id} key={event.id} style={{marginTop:'20px', borderTop:'1px solid rgba(0, 0, 0, 0.1)'}}>
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
        <>
        <h1>Classes</h1>
        <div className='offeringsDiv'>
            <Button onClick={() => history.push({pathname:'/calendar'})} style={{marginTop:'20px', marginRight: '25px'}}>Go to Calendar</Button>
            <Accordion style={{margin:'auto', textAlign:'left', width:'75vw'}}>
                {renderAllEvents}
            </Accordion>
        </div>
        </>
    )
}

export default ClassOfferings