import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {
    return ( 

    <header>
        <nav>
            <Link to={"/"}>
            <div className="header-logo">
                <img src="Logo.svg" alt="company logo"/>
            </div>
            </Link>
            <div className="nav-link-container">
            <Link to={"/"}>Home</Link>
            <a href="#">Rezepte</a>
            <a href="#">Ueber uns</a>
            </div>
        </nav>
    </header>
    );
}

export default Header;