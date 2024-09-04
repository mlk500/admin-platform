import React, { FC, memo } from "react";
import { StaticsIcon } from "../../../photos";
import "./MainNavbar.scss";

interface MainNavbarProps {
  activeButton: string;
}

const MainNavbar: FC<MainNavbarProps> = ({ activeButton }) => {
  return (
    <div className="main-navbar">
      <div className="statics-button">
        <img className="statics-img" src={StaticsIcon} alt="Statics" />
      </div>
      <div className="title">{activeButton}</div>
    </div>
  );
};

export default memo(MainNavbar); // Using React.memo to prevent unnecessary re-renders
