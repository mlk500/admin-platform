import { FC } from 'react'
import './LocationCard.scss';
import { Location } from '../../../../redux/models/Interfaces';
import { DeleteIconBlack, EditIconBlack } from '../../../photos';

interface LocationCardProps {
    object: Location;
}
const LocationSectionTitles = {
    LocationName: " שם החדר : ",
    LocationDescription: " תיאור : ",
    objectsNumber: " מספר האובייקטים : ",
};

const LocationCard: FC<LocationCardProps> = ({ object }) => {
    { console.log("LocationCard - objects ", object.objectsList); }
    return (
        <div className='Location-card' dir="rtl" style={{ backgroundColor: 'white' }}>
            <div className='card-header'>
                <div className='buttons'>
                    <button className="edit-button">
                        <img className='edit-icon' src={EditIconBlack} />
                    </button>
                    <button className="delete-button">
                        <img className='delete-icon' src={DeleteIconBlack} />
                    </button>
                </div>
                <div className='title' style={{ color: 'black' }}>{object.name}</div>
            </div>
            <div className='Location-card-content'>
                <div className='sections'>
                    <div className='section-title' style={{ color: 'black' }}>
                        {LocationSectionTitles.LocationName + object.name}
                    </div>
                    <div className='section-title' style={{ color: 'black' }}>
                        {LocationSectionTitles.LocationDescription + object.description}
                    </div>
                    <div className='section-title'>
                        {/* {LocationSectionTitles.objectsNumber + object.objects.length} */}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LocationCard;