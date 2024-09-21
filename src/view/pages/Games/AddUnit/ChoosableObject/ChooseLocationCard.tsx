import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Location } from "../../../../../redux/models/Interfaces";
import "./ChooseCard.scss";
import AlertMessage from "../../../../components/Common/AlertMessage/AlertMessage";

interface ChoosableLocationCardProps {
  object: Location;
  navigationPath: string;
}

interface ChoosableLocationCardProps {
  object: Location;
  navigationPath: string;
}

const ChoosableLocationCard: FC<ChoosableLocationCardProps> = ({
  object,
  navigationPath,
}) => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  // const handleClick = () => {
  //   if (object.objectsList?.length === 0) {
  //   } else {
  //     const objectPagePath =
  //       navigationPath === "/EditUnit"
  //         ? "/ChooseObject-edit"
  //         : "/ChooseObject-add";
  //     navigate(`${objectPagePath}/${object.locationID}`, {
  //       state: { selectedLocation: object, fromParent: navigationPath },
  //     });
  //   }
  // };
  const handleClick = () => {
    if (object.objectsList?.length === 0) {
      setAlertMessage("אין אובייקטים עבור המיקום הזה");
    } else {
      let objectPagePath;
      switch (navigationPath) {
        case "/EditUnit":
          objectPagePath = "/ChooseObject-edit";
          break;
        case "/Edit-EditUnit":
          objectPagePath = "/edit-ChooseObject-edit";
          break;
        case "/AddUnit":
          objectPagePath = "/ChooseObject-add";
          break;
        case "/Edit-AddUnit":
          objectPagePath = "/edit-ChooseObject-add";
          break;
      }

      navigate(`${objectPagePath}/${object.locationID}`, {
        state: { selectedLocation: object, fromParent: navigationPath },
      });
    }
  };

  return (
    <div className="Location-card" onClick={handleClick} dir="rtl">
      {alertMessage && <AlertMessage message={alertMessage} />}
      <div className="card-header">
        <div className="title">{object.name}</div>
        <div className="buttons">
          <button className="edit-button"></button>
          <button className="delete-button"></button>
        </div>
      </div>
      <div className="Location-card-content">
        <div className="sections">
          <div className="section-title">
            {!!object.description && object.description}
          </div>
          <div className="section-title">
            {`מספר האוביקטים: ${object.objectsList?.length || 0}`}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChoosableLocationCard;
