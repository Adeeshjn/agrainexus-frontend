import SearchBar from "./SearchBar";
import bgImage from '../images/img-services/bg-img.jpeg'
import { HeaderData } from "../constants/headerData";

export default function Header () {
    const backgroundStyle = {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover'
    }

    return (
        <header id="header">
            <div style={backgroundStyle}>
                <div className="overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2 intro-text">
                                <h1 style={{color: 'white', fontSize:'50px'}}>
                                    {HeaderData.title}
                                    <span></span>
                                </h1>
                                <p style={{color: 'white', fontSize:'20px'}}>{HeaderData.paragraph}</p>
                                <SearchBar/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
