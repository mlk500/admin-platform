import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SketchPicker } from "react-color";
import { HospitalIcon, DoctorUserIcon, PasswordIcon, ViewPasswordIcon, ColorPicker, HeroPhoto } from "../../../../photos";
import "./NewSector.scss";
import { adminAPI } from "../../../../../redux/services/AdminApi";
import { AdminTBC } from "../../../../../redux/models/Interfaces";

const NewSector = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState('בחר צבע');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [sector, setSector] = useState("");
  const navigate = useNavigate();

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleSubmit = async () => {
    const newAdmin: AdminTBC = { username, password, sector };
    try {
      await adminAPI.createSectorAdmin(newAdmin);
      alert("Sector admin created successfully");
      navigate("/Sectors");
    } catch (error) {
      console.error("Failed to create sector admin:", error);
      alert("Failed to create sector admin");
    }
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
          <input className="sector-input" placeholder="סקטור" value={sector} onChange={(e) => setSector(e.target.value)} />
          <img className="hospital-icon" src={HospitalIcon} alt="hospital-icon" />
        </div>
        <div className="admin-user-name">
          <input className="admin-user-name-input" placeholder="שם משתמש" value={username} onChange={(e) => setUsername(e.target.value)} />
          <img className="navbar-icon" src={DoctorUserIcon} alt="admin-icon" />
        </div>
        <div className="admin-code">
          <input className="admin-code-input" type="password" placeholder=" קוד" value={password} onChange={(e) => setPassword(e.target.value)} />
          <img className="navbar-icon" src={PasswordIcon} alt="password-icon" />
          <img className="view-password-icon" src={ViewPasswordIcon} alt="password-icon" />
        </div>
        <div className="color-picker">
          <div className="color-container">
            {showColorPicker && (
              <SketchPicker className="color-picker-popup" color={color} onChange={handleColorChange} />
            )}
            <div className="color-input-container">
              <input className="color-picker-input" placeholder={color} />
              <img className="navbar-icon-color" src={ColorPicker} alt="admin-icon" onClick={toggleColorPicker} />
            </div>
          </div>
          <div className="final-buttons">
            <button className="button-s" onClick={handleSubmit}>הוספה</button>
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
