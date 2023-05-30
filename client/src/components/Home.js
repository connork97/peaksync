import { useContext, useEffect } from 'react'
import { LoggedInUserContext } from './App'

import moment from 'moment'

const Home = () => {

    const { currentUser } = useContext(LoggedInUserContext)

    // const dates = ['2023-05-20', '2023-05-25', '2023-05-28', '2023-05-30', '2023-06-02'];

    // const filteredDates = () => {
    //     const date = new Date('2023-05-24')
    //     const today = new Date()
    //     const sevenDaysAgo = new Date()
    //     sevenDaysAgo.setDate(today.getDate() - 7)
    //     console.log(moment(sevenDaysAgo.setDate(today.getDate() - 7)).toDate())
    //     console.log(date >= sevenDaysAgo && date <= today)
    // }
    // filteredDates()

    return (
        <div className="mainDiv">
            <br></br><br></br><br></br><br></br><br></br>
            <h1>WELCOME TO CLIMB WISE {currentUser.first_name}!</h1>
        </div>
    )
}

export default Home