import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { DoctorUserIcon, HeroPhoto, PasswordIcon } from "../../../photos";
import "../Hero/Hero.scss";
import { taskAPI } from "../../../../redux/services/TaskApi";
import { locationAPI } from "../../../../redux/services/LocationApi";
import { objectAPI } from "../../../../redux/services/ObjectLocationApi";

const Hero = () => {
  return (
    <div className="hero-container">
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
                />
                <img className="navbar-icon" src={DoctorUserIcon} alt="admin-icon" />
              </div>
              <div className="admin-code">
                <input
                  className="admin-code-input"
                  type="password"
                  placeholder=" קוד"
                />
                <img className="navbar-icon" src={PasswordIcon} alt="admin-icon" />
              </div>
              <Link to="/Sectors">
                <button className="login-button" onClick={() => (taskAPI.getAllTasks(), locationAPI.getAllLocations(),
                  objectAPI.getAllObjetsOfLocation(2))}>התחבר</button>
              </Link>
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
