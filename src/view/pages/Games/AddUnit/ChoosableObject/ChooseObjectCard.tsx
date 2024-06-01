import { FC } from 'react';
import { ObjectLocation } from '../../../../../redux/models/Interfaces';
import './ChooseCard.scss';

interface ChoosableObjectCardProps {
    object: ObjectLocation;
}

const ChoosableObjectCard: FC<ChoosableObjectCardProps> = ({ object }) => {
    return (
        <div className='card'>
            <div className='card-header'>
                <div className='title'>{object.name}</div>
            </div>
            <div className='card-content'>
                <div className='sections'>
                    <div className='section-title'>{object.description}</div>
                </div>
            </div>
        </div>
    );
};

export default ChoosableObjectCard;
