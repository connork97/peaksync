import { useRecoilState } from "recoil"
import { userState } from "../atoms.js"

const Home = () => {

    const [user, setUser] = useRecoilState(userState)

    return (
        <div>
            <h1>Welcome to Crux Climbing Centers!</h1>
            <form>
                <input type="text" value={user} onChange={(event) => setUser(event.target.value)}></input>
            </form>
        </div>
    )
}

export default Home