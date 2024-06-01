import { ReactNode, useState } from "react";
import { MainNavbar, AdminMenu } from "../..";
import './Base.scss';
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

interface BaseProps {
    children: ReactNode;
}

function Base({ children }: BaseProps) {
    const [menuActiveButton, setMenuActiveButton] = useState("סקטורים");
    const object = useSelector((state: RootState) => state.globalStates.selectedCard);
    // { console.log(object.color) }

    return (
        <div className="home-page">
            <div className="common-section-main-admin">
                <div className="left-side">
                    <div className="main-navbar">
                        <MainNavbar activeButton={menuActiveButton} />
                    </div>
                    <div className="content" style={{ backgroundColor: object != undefined ? object.color : "#D9D9D9" }}>
                        {children}
                    </div>
                </div>
                <div className="menu">
                    <AdminMenu
                        setActiveButton={setMenuActiveButton}
                        activeButton={menuActiveButton} />
                </div>
            </div>
        </div >
    );
}

export default Base;
