import React from 'react';
import './LocationDetails.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { DownloadIcon, LeftArrowIcon } from '../../../photos';
import { useNavigate } from 'react-router-dom';

const LocationDetails: React.FC = () => {
    const location = useSelector((state: RootState) => state.globalStates.selectedCard);
    const navigate = useNavigate();

    return (
        <div className='location-container' dir='rtl' style={{ background: "#E9C46A" }}>
            <div className='add-location-header'>
                <div className='sector-name'>פיזוטרפיה</div>
                <div className='arrow-icon'><img className='arrow-icon' src={LeftArrowIcon} alt="arrow" /></div>
            </div>
            <div className='location-details'>
                <div className='location-title'>{location.name}</div>
                {/* {location.locationImage.imagePath &&
                    <img src={location.locationImage.imagePath.replace("/Users/malakyehia/admin_system/ShibaProjectAdminFrontend", '../../..')}
                    alt={location.locationImage.name} className='location-image-file' /> } */}
                <div className='location-content'>
                    <div className='location-floor'>
                        <div className='location-floor-title'>
                            {"נמצא בקומה : "}
                        </div>
                        <div className='floor'>
                            {location.floor}
                        </div>
                    </div>
                    <div className='location-description'>
                        <div className='description-title'>{"תיאור"}</div>
                        <div className='description'>{location.description}</div>
                    </div>
                    <div className='location-qr-section'>
                        <div className='location-qr'>
                            <img src={location.qrcode.replace("/Users/malakyehia/admin_system/ShibaProjectAdminFrontend", '../../..')}
                                alt='QR Code' className='qr-code-image' />
                        </div>
                        <button className='download-qr-btn' onClick={() => {
                            const fileName = location.qrcode.substring(location.qrcode.lastIndexOf('/') + 1);
                            const link = document.createElement('a');
                            link.href = location.qrcode.replace("/Users/malakyehia/admin_system/ShibaProjectAdminFrontend", '../../..');
                            link.download = fileName;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}>
                            הורדת QR
                            <img className='download-icon' src={DownloadIcon}></img>
                        </button>
                    </div>
                    {location.objectsList.length == 0 ? (
                        <div> {"No Objects for this location .."}</div>
                    ) : (
                        <button className='view-objects' onClick={() => { navigate(`/ObjectsPage/${location.locationID}`); }}>
                            הצג אובייקטים של החדר
                        </button>
                    )}

                    <button className='view-objects' onClick={() => { navigate(`/AddObjectLocation`); }}>
                        הוסף אןבייקטים
                    </button>

                </div>
            </div>
        </div>
    );
};
// export interface Location {
//     locationID: number;
//     name: string;
//     description?: string;
//     floor: number;
//     qrcode: string;
//     locationImage?: LocationImage;
//     objectsList?: ObjectLocation[];
// }

export default LocationDetails;


{/* <button className='download-qr-btn' onClick={() => {
    const fileName = location.qrcode.substring(location.qrcode.lastIndexOf('/') + 1);
    const link = document.createElement('a');
    link.href = location.qrcode.replace("/Users/malakyehia/admin_system/ShibaProjectAdminFrontend", '../../..');
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}}> */}