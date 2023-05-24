import React, { useContext } from 'react'
import { AllEventsContext, AllSessionsContext, AllMembershipsContext } from "./App"

const Rates = () => {

    const allEvents = useContext(AllEventsContext)
    const allSessions = useContext(AllSessionsContext)
    const allMemberships = useContext(AllMembershipsContext)
    console.log(allEvents)
    console.log(allSessions)
    console.log(allMemberships)
    
    return (
            <h1>Rates Page</h1>
    )
}

export default Rates