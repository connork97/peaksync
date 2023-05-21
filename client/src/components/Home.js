import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { userState } from "../atoms.js"
import { useState, useEffect } from 'react'

const Home = ({ currentUser }) => {

    // const [user, setUser] = useRecoilState(userState)
    
    useEffect(() => {
        console.log(currentUser)
    }, [])

    return (
        <div className="mainDiv">
            <h1>Welcome to Crux Climbing Centers!</h1>
            <form>
                <input type="text" value={currentUser.address}></input>
            </form>
        </div>
    )
}

export default Home