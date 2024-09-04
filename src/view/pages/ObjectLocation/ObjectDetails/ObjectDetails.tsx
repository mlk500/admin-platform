import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperConfig } from "../../../components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./ObjectDetails.scss";
import { ObjectImage } from "../../../../redux/models/Interfaces";

const ObjectDetailsHebrew = {
  Name: "שם",
  Description: "תיאור : ",
  Object_Imgs: "תמונות",
  ImagesNumber: "מספר תמונות: ",
  NoImagesAvailable: "אין תמונות",
};

const ObjectDetails: React.FC = () => {
  const object = useSelector(
    (state: RootState) => state.globalStates.selectedCard
  );

  const objectImages = object?.objectImages ?? [];

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
          <div className="object-imgs-list">
            <div className="section-title">
              {ObjectDetailsHebrew.Object_Imgs}
            </div>
            <div className="image-count">
              {ObjectDetailsHebrew.ImagesNumber}
              {objectImages.length}
            </div>
            {objectImages.length > 0 ? (
              <Swiper {...SwiperConfig}>
                {objectImages.map((img: ObjectImage) => (
                  <SwiperSlide key={img.id} className="swiper-slide">
                    <img
                      className="img-media"
                      src={img.imageUrl}
                      alt={img.name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>{ObjectDetailsHebrew.NoImagesAvailable}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectDetails;
