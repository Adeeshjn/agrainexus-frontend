import { AboutUs } from "../constants/aboutUs"

export default function About () {
    return (
        <div id="about">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-12">
                        <div className="about-text">
                            <h2>About Us</h2>
                            <p>{AboutUs.paragraph}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}