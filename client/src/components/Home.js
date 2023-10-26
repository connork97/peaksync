import { useContext, useState, useEffect } from 'react'
import { LoggedInUserContext, AllEventsContext, AllMembershipsContext, AllSessionsContext } from './App'

import styles from './Home.module.css';

const Home = () => {

    const { currentUser } = useContext(LoggedInUserContext);
    const { allEvents } = useContext(AllEventsContext);
    const { allMemberships } = useContext(AllMembershipsContext);
    const { allSessions } = useContext(AllSessionsContext);

    const [loadingText, setLoadingText] = useState('');

    useEffect(() => {
        setLoadingText('Checking user privileges...')
    }, [])

    useEffect(() => {
        if (Object.keys(currentUser).length > 0) {
            if (allEvents.length <= 0) setLoadingText('Retrieving calendar items...');
            else if (allMemberships.length <= 0) setLoadingText('Retrieving membership offerings...');
            else if (allSessions.length <= 0) setLoadingText('Retrieving event signups...');
            else setLoadingText("You're ready to go!")
        }
    }, [loadingText, currentUser, allEvents, allMemberships, allSessions])
    // console.log(currentUser.length)
    return (
        <div className="mainDiv">
            <br></br><br></br><br></br><br></br><br></br>
            <h1 className={styles.welcomeH1}>Welcome to PeakSync {currentUser.first_name}!</h1>
            <h2 className={loadingText === "You're ready to go!" ? styles.loadedH2 : styles.loadingH2}>{loadingText}</h2>
        </div>
    )
}

export default Home;