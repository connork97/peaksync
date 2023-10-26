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
        if (localStorage.getItem("user_id")) setLoadingText('Checking user privileges...')
    }, [])

    useEffect(() => {
        if (Object.keys(currentUser).length > 0 || !localStorage.getItem("user_id")) {
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
            {loadingText !== "You're ready to go!" && <h2 className={styles.loadedH2}>Please allow the web service to spin up.</h2>}   
            {loadingText !== "You're ready to go!" && <h2 className={styles.loadedH2}>This may take up to one minute.</h2>}
            <h2 className={loadingText === "You're ready to go!" ? styles.loadedH2 : styles.loadingH2}>{loadingText}</h2>
        </div>
    )
}

export default Home;