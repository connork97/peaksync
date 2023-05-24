import React, { useContext } from 'react'
import { AllUsersContext, AllEventsContext, AllSessionsContext, AllMembershipsContext } from "./App"

const Rates = ({ currentUser }) => {
    // console.log(AllUsersContext)
    const { allUsers, setAllUsers } = useContext(AllUsersContext)
    const allEvents = useContext(AllEventsContext)
    const allSessions = useContext(AllSessionsContext)
    const allMemberships = useContext(AllMembershipsContext)
    setAllUsers("test")
    console.log(allUsers)
    console.log(setAllUsers)
    console.log(allEvents)
    console.log(allSessions)
    console.log(allMemberships)
    return (
            <h1>Rates Page</h1>
    )
}

export default Rates