import React, { useState } from 'react';
import './AddLocation.scss';
import { LeftArrowIcon, UploadFileIcon } from '../../../photos';
import { useNavigate } from 'react-router-dom';
import { locationAPI } from '../../../../redux/services/LocationApi';
import { Location } from '../../../../redux/models/Interfaces';


const AddLocationHebrew = {
    AddNewRoom: "הוספת מקום חדש",
    Name: "שם : ",
    Description: "תיאור : ",
    Floor: "קומה : ",
    UploadFiles: "העלאת קבצים : ",
    AddObjects: "הוספת אובייקטים",
    Save: "שמירה"
};

interface FileWithPreview extends File {
    preview: string;
}

const AddLocation = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [floor, setFloor] = useState<number | undefined>(undefined);
    const [mediaFile, setMediaFile] = useState<FileWithPreview | null>(null);
    const [_, setMediaFileApi] = useState<File | null>(null);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const file = selectedFiles[0];
            const fileWithPreview: FileWithPreview = {
                ...file,
                preview: URL.createObjectURL(file)
            };
            if (mediaFile) {
                URL.revokeObjectURL(mediaFile.preview);
            }
            setMediaFile(fileWithPreview);
            setMediaFileApi(file);
        }
    };


    const handleSave = () => {
        if (!name.trim() || !floor) {
            alert("Name and floor are required.");
            return;
        }
        const location: Location = {
            locationID: 0,
            name,
            description,
            floor: floor!,
            qrcode: '',
        };
        const formData = new FormData();
        formData.append('location', new Blob([JSON.stringify(location)], { type: 'application/json' }));
        if (mediaFile) {
            formData.append('image', mediaFile);
        }
        locationAPI.createLocation(formData)
            .then(response => {
                console.log("Location created successfully", response);
                navigate('/Locations');
            })
            .catch(error => {
                console.error("Failed to create location", error);
                alert("Failed to save location.");
            });
    };

    return (
        <div className='main-container-add-location'>
            <div className='add-location-header'>
                <div className='arrow-icon'><img className='arrow-icon' src={LeftArrowIcon} alt="arrow" /></div>
                <div className='sector-name'>פיזוטרפיה</div>
            </div>
            <div className='add-location-container' dir="rtl">
                <div className='add-location-title'>{AddLocationHebrew.AddNewRoom}</div>
                <div className='input-group'>
                    <label className='input-label'>{AddLocationHebrew.Name}</label>
                    <input type='text' className='location-input' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddLocationHebrew.Description}</label>
                    <textarea className='location-textarea' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddLocationHebrew.Floor}</label>
                    <input type='number' className='location-input' value={floor} onChange={e => setFloor(Number(e.target.value))} />
                </div>

                <div className='input-group file-upload-group'>
                    <label className='input-label'>{AddLocationHebrew.UploadFiles}</label>
                    <label htmlFor="file-upload" className="file-upload-label">
                        <img src={UploadFileIcon} alt="Upload File" className="file-upload-icon" />
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        className="file-input"
                        onChange={handleFileChange}
                        multiple
                        style={{ display: 'none' }}
                    />
                    {mediaFile && (
                        <div>
                            <img src={mediaFile.preview} alt="Uploaded" style={{ width: 100, height: 100 }} />
                            <button className='delete-image-btn' onClick={() => {
                                URL.revokeObjectURL(mediaFile.preview);
                                setMediaFile(null);
                            }}>
                                מחיקה
                            </button>
                        </div>
                    )}
                </div>
                <div className='location-buttons'>
                    <button className='save-location-button' onClick={handleSave}>{AddLocationHebrew.Save}</button>
                </div>
            </div>
        </div >
    );
};

export default AddLocation;