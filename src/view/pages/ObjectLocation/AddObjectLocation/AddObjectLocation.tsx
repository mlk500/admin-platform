import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { LeftArrowIcon, UploadFileIcon } from "../../../photos";
import { SwiperConfig } from "../../../components";
import "./AddObjectLocation.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setCard } from "../../../../redux/slices/GlobalStates";
import { ObjectLocation } from "../../../../redux/models/Interfaces";
import { objectAPI } from "../../../../redux/services/ObjectLocationApi";
import { Location } from "../../../../redux/models/Interfaces";
import Loader from "../../../components/Common/LoadingSpinner/Loader";

interface FileWithPreview extends File {
  preview: string;
}

const AddNewObjectHebrew = {
  AddNewObjects: "הוספת אובייקט",
  Name: "שם : ",
  Description: "תיאור : ",
  UploadImages: "העלאת תמונות : ",
  Delete_Image: "מחיקת תמונה",
  ImagesNumber: "מספר תמונות: ",
  Save: "שמירה",
};

const AddObjectLocation: React.FC = () => {
  const location = useSelector(
    (state: RootState) => state.globalStates.selectedCard
  ) as Location;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [objectName, setObjectName] = useState("");
  const [objectDescription, setObjectDescription] = useState("");
  const [pics, setPics] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles) {
      const filesWithPreview = Array.from(newFiles).map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      }));
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);
      setPics((prevPics) => [...prevPics, ...Array.from(newFiles)]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== index));
    setPics((prevPics) => prevPics.filter((_, idx) => idx !== index));
  };

  const handleSaveObject = async () => {
    if (!objectName.trim()) {
      alert("An object must have a name.");
      return;
    }
    const newObject: ObjectLocation = {
      objectID: Date.now(),
      name: objectName,
      description: objectDescription,
    };
    setIsLoading(true);
    setLoadingMessage("שומר אובייקט ...");
    const formData = new FormData();
    formData.append(
      "locationObject",
      new Blob([JSON.stringify(newObject)], { type: "application/json" })
    );
    console.log("pics", pics);
    if (pics.length > 0) {
      pics.forEach((pic) => {
        formData.append("images", pic);
      });
    }

    try {
      await objectAPI.createObject(location.locationID, formData);
      setLoadingMessage("אובייקט נשמר בהצלחה!");
      setTimeout(() => {
        setIsLoading(false);
        setLoadingMessage("");
        dispatch(setCard(location));
        navigate(`/ObjectsPage/${location.locationID}`);
      }, 1000);
    } catch (error: any) {
      console.error(error);
      setLoadingMessage("שגיאה בשמירת אובייקט");
      setTimeout(() => {
        setIsLoading(false);
        setLoadingMessage("");
      }, 2000);
    }
  };

  return (
    <div className="main-container-add-object" dir="rtl">
      <Loader isLoading={isLoading} message={loadingMessage} />
      <a href="/Locations" className="back-link">
        <img src={LeftArrowIcon} alt="Back" className="back-arrow-icon" />
      </a>
      <div className="overlay" />
      <div className="add-object-container">
        <h2 className="add-object-title">{AddNewObjectHebrew.AddNewObjects}</h2>
        <div className="input-group">
          <label className="input-label">{AddNewObjectHebrew.Name}</label>
          <input
            type="text"
            className="object-input"
            value={objectName}
            onChange={(e) => setObjectName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">
            {AddNewObjectHebrew.Description}
          </label>
          <textarea
            className="object-textarea"
            value={objectDescription}
            onChange={(e) => setObjectDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="input-group file-upload-group">
          <label className="input-label">
            {AddNewObjectHebrew.UploadImages}
          </label>
          <label htmlFor="file-upload" className="file-upload-label">
            <img
              src={UploadFileIcon}
              alt="Upload File"
              className="file-upload-icon"
            />
          </label>
          <input
            type="file"
            multiple
            accept=".png,.jpg,.jpeg,.webp"
            id="file-upload"
            className="file-input"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div className="object-media-list">
          <div className="image-count">
            {AddNewObjectHebrew.ImagesNumber}
            {selectedFiles.length}
          </div>
          {selectedFiles.length > 0 && (
            <Swiper {...SwiperConfig}>
              {selectedFiles.map((file, index) => (
                <SwiperSlide key={index} className="swiper-slide">
                  <div className="image-wrapper">

                    <img
                      className="img-media"
                      src={file.preview}
                      alt={`Uploaded ${index}`}
                    />
                    <button
                      className="delete-image-btn"
                      onClick={() => handleDeleteImage(index)}
                    >
                      {AddNewObjectHebrew.Delete_Image}
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <button onClick={handleSaveObject} className="save-object-button">
          {AddNewObjectHebrew.Save}
        </button>
      </div>
    </div>
  );
};

export default AddObjectLocation;
