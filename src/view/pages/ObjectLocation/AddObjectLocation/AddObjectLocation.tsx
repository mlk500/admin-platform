import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { UploadFileIcon } from '../../../photos';
import { SwiperConfig } from '../../../components';
import './AddObjectLocation.scss'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useDispatch } from 'react-redux';
import { setCard } from '../../../../redux/slices/GlobalStates';
import { ObjectLocation } from '../../../../redux/models/Interfaces';
import { objectAPI } from '../../../../redux/services/ObjectLocationApi';
import { Location } from '../../../../redux/models/Interfaces';

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
    Save: "שמירה"
};


const AddObjectLocation: React.FC = () => {
    const location = useSelector((state: RootState) => state.globalStates.selectedCard) as Location;
    const dispatch = useDispatch();

    const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
    const [objectName, setObjectName] = useState('');
    const [objectDescription, setObjectDescription] = useState('');
    const [pics, setPics] = useState<File[]>([]);

    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const filesWithPreview = Array.from(selectedFiles).map(file => {
                const fileWithPreview: FileWithPreview = {
                    ...file,
                    preview: URL.createObjectURL(file)
                };
                return fileWithPreview;
            });
            setSelectedFiles(prevFiles => [...prevFiles, ...filesWithPreview]);
            setPics(prevFiles => [...prevFiles, ...Array.from(selectedFiles)]);
        }
    };

    const handleSaveObject = async () => {
        if (!objectName.trim()) {
            alert("An object must have a name.");
        }
        const newObject: ObjectLocation = {
            objectID: Date.now(),
            name: objectName,
            description: objectDescription,
            // objectImages: []
        };

        const formData = new FormData();
        formData.append('locationObject', new Blob([JSON.stringify(newObject)], { type: 'application/json' }));
        if (pics.length > 0) {
            console.log("media " + pics)
            pics.forEach((pic) => {
                formData.append('images', pic);
            });
        }

        try {
            await objectAPI.createObject(location.locationID, formData);
            alert('Object created successfully');
            dispatch(setCard(location));
            navigate(`/ObjectsPage/${location.locationID}`);

        } catch (error) {
            console.error('Failed to save object:', error);
            alert("Failed to save object.");
        }


        {
            /* API add object(loctoin.id,object)*/
            // dispatch(setCard(await API Get Room By Id (location id)))
        }
        // navigate('/ObjectsPage', { state: { newObject } });
    };

    return (
        <div className='main-container-add-task'>
            <div className='add-task-header'>
                <div className='sector-name'>פיזוטרפיה</div>
            </div>
            <div className='add-task-container' dir="rtl">
                <div className='add-task-title'>{AddNewObjectHebrew.AddNewObjects}</div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewObjectHebrew.Name}</label>
                    <input type='text' className='task-input' value={objectName} onChange={e => setObjectName(e.target.value)} />
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewObjectHebrew.Description}</label>
                    <textarea className='task-textarea' value={objectDescription} onChange={e => setObjectDescription(e.target.value)} ></textarea>
                </div>

                <div className='options-container'>
                    <div className="option-section">
                        <label htmlFor="file-upload" className="input-label">{AddNewObjectHebrew.UploadImages}</label>
                        <label htmlFor="file-upload" className="file-upload-label">
                            <img src={UploadFileIcon} alt="Upload File" className="file-upload-icon" />
                        </label>
                        <input
                            type="file"
                            multiple
                            accept=".png,.jpg,.jpeg,.webp"
                            id="file-upload"
                            className="file-input"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className='task-media-list'>
                        <div className="image-count">{AddNewObjectHebrew.ImagesNumber}{selectedFiles.length}</div>
                        {selectedFiles.length > 0 && (
                            <Swiper {...SwiperConfig}>
                                {selectedFiles.map((file, index) => (
                                    <SwiperSlide key={index} className='swiper-slide'>
                                        <img className='img-media' src={file.preview} alt={`Uploaded ${index}`} />
                                        <button className='delete-image-btn' onClick={() => {
                                            const updatedFiles = selectedFiles.filter((_, idx) => idx !== index);
                                            setSelectedFiles(updatedFiles);
                                            setPics(updatedFiles); // recheck
                                        }}>
                                            {AddNewObjectHebrew.Delete_Image}</button>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </div>
                <button onClick={handleSaveObject} className='save-task-button'>{AddNewObjectHebrew.Save}</button>
            </div>
        </div>
    );
};

export default AddObjectLocation;
