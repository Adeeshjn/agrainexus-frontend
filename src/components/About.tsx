interface AboutProps {
    data: {
        paragraph: string;
    };
}

const About: React.FC<AboutProps> = ({ data }) => {
    return (
        <div id="about">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-12">
                        <div className="about-text">
                            <h2>About Us</h2>
                            <p>{data ? data.paragraph : "loading..."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About