import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import "./ObjectDetails.scss";
import { ObjectImage } from "../../../../redux/models/Interfaces";
import { useNavigate } from "react-router-dom";

const ObjectDetailsHebrew = {
  Name: "שם",
  Description: "תיאור : ",
  Object_Imgs: "תמונות",
  ImagesNumber: "מספר תמונות: ",
  NoImagesAvailable: "אין תמונות",
  ViewGames: "צפייה במשחקים",
};

const ObjectDetails: React.FC = () => {
  const navigate = useNavigate();

  const object = useSelector(
    (state: RootState) => state.globalStates.selectedCard
  );
  const objectImages = object?.objectImages ?? [];
  const handleViewGames = () => {
    if (object?.games) {
      navigate("/ObjectGames", { state: { games: object?.games } });
    }
  };

  return (
    <div className="object-container" dir="rtl">
      <div className="overlay" />
      <div className="object-details">
        <div className="object-title">{object?.name}</div>
        {object?.description && (
          <div className="object-description">
            <div className="description-title">
              {ObjectDetailsHebrew.Description}
            </div>
            <div className="description">{object.description}</div>
          </div>
        )}
        <div className="task-content">
          {object?.games.length > 0 && (
            <button className="view-games-button" onClick={handleViewGames}>
              {ObjectDetailsHebrew.ViewGames}
            </button>
          )}
          <div className="object-imgs-list">
            <div className="section-title">
              {ObjectDetailsHebrew.Object_Imgs}
            </div>
            <div className="image-count">
              {ObjectDetailsHebrew.ImagesNumber}
              {objectImages.length}
            </div>
            {objectImages.length > 0 ? (
              <div className="image-grid">
                {objectImages.map((img: ObjectImage) => (
                  <img
                    key={img.id}
                    className="img-media"
                    src={img.imageUrl}
                    alt={img.name}
                  />
                ))}
              </div>
            ) : (
              <div>{ObjectDetailsHebrew.NoImagesAvailable}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectDetails;
