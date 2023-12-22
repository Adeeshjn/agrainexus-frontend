import SearchBar from "./SearchBar";

export const Header = (props: any) => {
    return (
        <header id="header">
            <div style={{backgroundImage: 'url(../img/img-services/bg-img.jpeg)', backgroundSize: 'cover'}}>
                <div className="overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2 intro-text">
                                <h1 style={{color: 'white', fontSize:'50px'}}>
                                    {props.data ? props.data.title : "Loading"}
                                    <span></span>
                                </h1>
                                <p style={{color: 'white', fontSize:'20px'}}>{props.data ? props.data.paragraph : "Loading"}</p>
                                <SearchBar/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
