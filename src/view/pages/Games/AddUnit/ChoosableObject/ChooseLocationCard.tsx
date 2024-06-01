import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Location } from '../../../../../redux/models/Interfaces';
import './ChooseCard.scss';

interface ChoosableLocationCardProps {
    object: Location;
    navigationPath: string;
}

const ChoosableLocationCard: FC<ChoosableLocationCardProps> = ({ object, navigationPath }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (object.objectsList?.length === 0) {
            alert("No Objects for this location ..");
        }
        else {
            console.log("nav is " + navigationPath);
            const objectPagePath = navigationPath === "/EditUnit" ? "/ChooseObject-edit" : "/ChooseObject-add";
            navigate(`${objectPagePath}/${object.locationID}`, {
                state: { selectedLocation: object, fromParent: navigationPath },
            });
        }
    };

    return (
        <div className='location-card' onClick={handleClick}>
            <div className='card-header'>
                <div className='title'>{object.name}</div>
            </div>
            <div className='location-card-content'>
                <div className='sections'>
                    <div className='section-title'>{object.description}</div>
                </div>
            </div>
        </div>
    );
}

export default ChoosableLocationCard;
