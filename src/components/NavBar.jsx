import { Link } from "react-router-dom"
import style from "./NavBar.module.css"
import {BiLogIn} from "react-icons/bi"
import ReactTooltip from "react-tooltip"
const NavBar = ({ auth, setAuth, localStorageKEY }) => {
    console.log(auth);

    const logout = () => {
        localStorage.removeItem(localStorageKEY)
        setAuth(null)
    }

    return (
        <div className= {style.nav}>
            <nav >
                <ul className={style.navLinks}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/CompletedList">CompletedList</Link></li>
                    <li><Link to="/ReadingList">ReadingList</Link></li>
                    <li> <Link to="/BooksList">BooksList</Link> </li>
                    <li>< BiLogIn  className={style.logout} data-tip="exit" onClick={() => logout()}>logout</BiLogIn></li>
                </ul>
            </nav>
            <ReactTooltip />

        </div>

    );
}

export default NavBar;
