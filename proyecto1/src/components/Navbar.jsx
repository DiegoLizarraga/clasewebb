import './Navbar.css'
import {Link} from "react-router";

const Navbar = ({children}) => {
    return (
        <>
            <div className={'container-navbar'}>
                <div className={'links'}>
                    <p>
                        <Link to={'/home'}>Home</Link>
                    </p>
                    <p>
                        <Link to={'/AboutMe'}>About me</Link>
                    </p>
                    <p>
                        <Link to={'/Projects'}>Projects</Link>
                    </p>
                    <p>
                        <Link to={'/Contact'}>Contact</Link>
                    </p>
                </div>
            </div>
            {children}
        </>
    )
}

export default Navbar;