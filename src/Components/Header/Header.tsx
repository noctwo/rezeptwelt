import "./Header.css"

const Header = () => {
    return ( 

    <header>
        <nav>
            <div className="header-logo">
                <img src="Logo.svg" alt="company logo"/>
            </div>
            <a href="#">Home</a>
            <a href="#">Rezepte</a>
            <a href="#">Ueber uns</a>
        </nav>
        <div className="hero-img-container">
            <img src="hero-img-01.jpg" alt="hero image" />
        </div>
    </header>
    );
}

export default Header;



{/* Header empfaengt prop und zeigt entweder prop img auf detailpage an oder standard header img*/}