import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { userState } from "../atoms.js"
import { useState, useEffect } from 'react'

const Home = () => {

    const [user, setUser] = useRecoilState(userState)
    
    useEffect(() => {
        console.log(userState)
    }, [user])

    return (
        <div>
            <h1>Welcome to Crux Climbing Centers!</h1>
            <form>
                <input type="text" value={user.address} onChange={(event) => setUser(event.target.value)}></input>
            </form>
        </div>
    )
}

export default Home