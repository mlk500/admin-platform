import React, { FC } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCard, setPage } from "../../../../redux/slices/GlobalStates";
// import { Sector } from "../../../../redux/models/Interfaces";
import "./HomePage.scss";

interface HomePageProps {
    objects: any[];
    page: string;
    Component: React.ElementType;
    addButton?: string;
    addButtonPath?: string;
    setCardOnClick?: boolean;
}

const HomePage: FC<HomePageProps> = ({ objects, page, Component, addButton, addButtonPath, setCardOnClick = true }) => {
    const dispatch = useDispatch();
    // { console.log("objects: ") }
    // { console.log("objects: ", objects) }
    return (
        <div className="home-page" style={{ background: "#D9D9D9" }}>
            <div className="content">
                <div className="homePage-grid">
                    {objects.map((ob: any, index: number) => (

                        <Fade key={index}>
                            {setCardOnClick ? (
                                <Link
                                    to={`/${page}Details/${encodeURIComponent(ob.name)}`}

                                    // to={`/TaskDetails/${encodeURIComponent(ob.name)}`}
                                    className="link"
                                    onClick={() => {
                                        dispatch(setCard(ob));
                                        dispatch(setPage(page));
                                        // if(card typeof sector ) dispatch(setSectorColor(ob.color))
                                    }}
                                >
                                    {/* {console.log("objects ", Component)}; */}
                                    <Component object={ob} />
                                </Link>) : (<div>
                                    <Component object={ob} />
                                </div>)
                            }

                        </Fade>
                    ))}
                </div>
            </div>
            {(addButton !== undefined) && (<div className="add-new">
                <Link to={`/${addButtonPath}`} className="link">
                    <button className="add-button">{addButton}</button>
                </Link>
            </div>)}
        </div>
    );
};

export default HomePage;
