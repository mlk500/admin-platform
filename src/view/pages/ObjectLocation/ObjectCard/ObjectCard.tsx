import { FC } from 'react'
import { ObjectLocation } from '../../../../redux/models/Interfaces';
import { EditIcon, DeleteIcon } from '../../../photos'
    ;

interface ObjectCardProps {
    object: ObjectLocation;
}

const ObjectHeb = {
    ObjectName: " שם אובייקט: "
};

const ObjectCard: FC<ObjectCardProps> = ({ object }) => {
    return (
        <div className='object-card' dir='rtl'>
            <div className='card-header'>
                <div className='buttons'>
                    <button className="edit-button">
                        <img className='edit-icon' src={EditIcon} />
                    </button>
                    <button className="delete-button">
                        <img className='delete-icon' src={DeleteIcon} />
                    </button>
                </div>
                <div className='title'>{object.name}</div>
            </div>
            <div className='object-card-content'>
                <div className='sections'>
                    <div className='section-title'>
                        {ObjectHeb.ObjectName + object.name}
                    </div>
                    {/* maybe add more */}
                </div>
            </div>
        </div>
    )
}

export default ObjectCard