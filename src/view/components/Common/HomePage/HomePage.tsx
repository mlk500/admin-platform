import React, { FC } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCard, setSector } from "../../../../redux/slices/GlobalStates";
import "./HomePage.scss";

interface HomePageProps {
  objects: any[];
  page: string;
  Component: React.ElementType;
  addButton?: string;
  addButtonPath?: string;
  setCardOnClick?: boolean;
}

const HomePage: FC<HomePageProps> = ({
  objects,
  page,
  Component,
  addButton,
  addButtonPath,
  setCardOnClick = true,
}) => {
  const dispatch = useDispatch();
  // console.log("home page obj " + objects)
  return (
    <div className="home-page" dir="rtl">
      <div className="content">
        <div className="homePage-grid">
          {objects.map((ob, index) => {
            const name =
              page === "Game"
                ? ob.gameName
                : page === "Sector"
                ? ob.username
                : ob.name;
            console.log("ob name  is ", ob);

            return (
              <Fade key={index}>
                {setCardOnClick ? (
                  <Link
                    to={`/${page}Details/${encodeURIComponent(name)}`}
                    className="link"
                    onClick={() => {
                      dispatch(setCard(ob));
                      {
                        page == "Sector" && dispatch(setSector(ob));
                      }
                      // dispatch(setPage(page));
                    }}
                  >
                    <Component object={ob} />
                  </Link>
                ) : (
                  <div>
                    <Component object={ob} />
                  </div>
                )}
              </Fade>
            );
          })}
        </div>
      </div>
      {addButton && (
        <div className="add-new">
          <Link to={`/${addButtonPath}`} className="link">
            <button className="add-button">{addButton}</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
