import { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";


const Nav = ()=>{
    const auth = localStorage.getItem("user");
    const navigate = useNavigate()
    const Logout = ()=>{
        localStorage.clear()
        navigate('/signup')
    }
    return(
        <div>
            { auth ?
            <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/signup" onClick={Logout}>Logout</Link></li>
            </ul> :
                <ul className="nav-ul">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
            
        </div>
    )
}

export default Nav