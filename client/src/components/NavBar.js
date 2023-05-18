import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <div id="navBarDiv">
            <Link to="/" exact="true" className="navBarLink">Home</Link>
            <Link to="/rates" exact="true" className="navBarLink">Rates</Link>
            <Link to="/classes" exact="true" className="navBarLink">Classes</Link>
            <Link to="/about-us" exact="true" className="navBarLink">About Us</Link>
            <Link to="/login" exact="true" className="navBarLink">Login</Link>
            <Link to="/dashboard" exact="true" className="navBarLink">Dashboard</Link>
        </div>
    )
}

export default NavBar