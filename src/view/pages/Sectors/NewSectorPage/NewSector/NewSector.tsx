import { useState } from "react";
import { Link } from "react-router-dom";
import { SketchPicker } from "react-color";
import { HospitalIcon, DoctorUserIcon, PasswordIcon, ViewPasswordIcon, ColorPicker, HeroPhoto } from "../../../../photos";
import "./NewSector.scss";

const NewSector = () => {
  const [color, setColor] = useState('בחר צבע');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  return (
    <div className="new-sector-page">
      <div className="hero-container-part-one">
        <div className="hero-content">
          <img className="hero-img" src={HeroPhoto} alt="hero-photo" />
          <div className="hero-right">
            <div className="title">הוספת</div>
            <div className="title">סקטור חדש</div>
          </div>
        </div>
      </div>
      <div className="inputs-button">
        <div className="new-sector">
          <input className="sector-input" placeholder="סקטור" />
          <img
            className="hospital-icon"
            src={HospitalIcon}
            alt="hospital-icon"
          />
        </div>
        <div className="admin-user-name">
          <input className="admin-user-name-input" placeholder="שם משתמש" />
          <img className="navbar-icon" src={DoctorUserIcon} alt="admin-icon" />
        </div>
        <div className="admin-code">
          <input
            className="admin-code-input"
            type="password"
            placeholder=" קוד"
          />
          <img className="navbar-icon" src={PasswordIcon} alt="password-icon" />
          <img
            className="view-password-icon"
            src={ViewPasswordIcon}
            alt="password-icon"
          />
        </div>
        <div className="color-picker">
          <div className="color-container">
            {showColorPicker && (
              <SketchPicker className="color-picker-popup" color={color} onChange={handleColorChange} />
            )}
            <div className="color-input-container">
              <input
                className="color-picker-input"
                placeholder={color}
              />
              <img
                className="navbar-icon-color"
                src={ColorPicker}
                alt="admin-icon"
                onClick={toggleColorPicker}
              />
            </div>
          </div>
          <div className="final-buttons">
            <Link to="/Sectors">
              <button className="button-s">הוספה</button>
            </Link>
            <Link to="/Sectors">
              <button className="button-s">ביטול</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSector;
