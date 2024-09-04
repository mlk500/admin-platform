import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DoctorUserIcon, HeroPhoto, PasswordIcon } from "../../../photos";
import { loginAPI } from "../../../../redux/services/LoginApi";
import { Admin } from "../../../../redux/models/Interfaces";
import {
  setLoggedInAdmin,
  setPage,
} from "../../../../redux/slices/GlobalStates";
import { buttonsName } from "../../../../redux/models/Types";
import Loader from "../../../components/Common/LoadingSpinner/Loader";
import "../Hero/Hero.scss";

const Hero: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Provide username and password");
    } else {
      setIsLoading(true);
      try {
        const admin: Admin = await loginAPI.login(username, password);
        console.log("admin is " + admin);
        dispatch(setLoggedInAdmin(admin));
        //in here call al apis
        dispatch(setPage(buttonsName.Sectors));
        localStorage.setItem("page", buttonsName.Sectors);
        navigate("/Sectors");
      } catch (error: any) {
        alert("Login failed: " + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="hero-container">
      <Loader isLoading={isLoading} />
      <div className="hero-container-part-one">
        <div className="hero-content">
          <img className="hero-img" src={HeroPhoto} alt="hero-photo" />
          <div className="hero-right">
            <div className="title">חפש את המטמון בבית חולים שיבא</div>
            <div className="inputs-button">
              <div className="admin-user-name">
                <input
                  className="admin-user-name-input"
                  placeholder="שם משתמש"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
                <img
                  className="navbar-icon"
                  src={DoctorUserIcon}
                  alt="admin-icon"
                />
              </div>
              <div className="admin-code">
                <input
                  className="admin-code-input"
                  type="password"
                  placeholder=" קוד"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <img
                  className="navbar-icon"
                  src={PasswordIcon}
                  alt="admin-icon"
                />
              </div>
              <button
                className="login-button"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "מתחבר..." : "התחבר"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-container-part-two">
        צור מסלולים מותאמים אישית, הגדר תחנות אינטראקטיביות והסב שמחה למטופלים
        צעירים באמצעות הרפתקאות מרתקות ותכליתיות.
      </div>
    </div>
  );
};

export default Hero;
