import styles from './Offerings.module.css'

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
            <Accordion.Item className={styles.accordionItem} eventKey={event.id} key={event.id}>
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
        <h1 className={styles.offeringsH1}>Classes</h1>
        <div className={styles.classOfferingsDiv}>
            <Button className={styles.calendarRedirectButton} onClick={() => history.push({pathname:'/calendar'})}>Go to Calendar</Button>
            <Accordion className={styles.accordion}>
                {renderAllEvents}
            </Accordion>
        </div>
        </>
    )
}

export default ClassOfferings