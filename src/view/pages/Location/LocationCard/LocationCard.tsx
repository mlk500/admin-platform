import { FC } from "react";
import "./LocationCard.scss";
import { Location } from "../../../../redux/models/Interfaces";
import { DeleteIcon, EditIcon } from "../../../photos";

interface LocationCardProps {
  object: Location;
  onShowConfirm: (location: Location) => void;
  onEditLocation: (location: Location) => void;
}
const LocationSectionTitles = {
  LocationName: " שם החדר : ",
  LocationDescription: " תיאור : ",
  objectsNumber: " מספר האובייקטים : ",
};

const LocationCard: FC<LocationCardProps> = ({
  object,
  onShowConfirm,
  onEditLocation,
}) => {
  // { console.log("LocationCard - objects ", object.objectsList); }
  return (
    <div className="Location-card">
      <div className="card-header">
        <div className="title">{object.name}</div>
        <div className="buttons">
          <button
            className="edit-button"
            onClick={(e) => {
              console.log("clicked on edit button");
              e.preventDefault();
              onEditLocation(object);
            }}
          >
            <img className="edit-icon" src={EditIcon} />
          </button>
          <button
            className="delete-button"
            onClick={(e) => {
              e.preventDefault();
              onShowConfirm(object);
            }}
          >
            <img className="delete-icon" src={DeleteIcon} alt="Delete" />
          </button>
        </div>
      </div>
      <div className="Location-card-content">
        <div className="sections">
          <div className="section-title">
            {LocationSectionTitles.LocationName + object.name}
          </div>
          {object.description !== "" && object.description !== undefined && (
            <div className="section-title">
              {LocationSectionTitles.LocationDescription + object.description}
            </div>
          )}
          <div className="section-title">
            {/* {LocationSectionTitles.objectsNumber + object.objects.length} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
