import { FC } from 'react';
import './SectorCard.scss';
import { Sector } from '../../../../redux/models/Types';
import { EditIcon, DeleteIcon } from '../../../photos';

interface SectorCardProps {
    object?: Sector;
}

const sectionTitles = {
    userName: "שם משתמש : ",
    gamesNumber: "מספר המשחקים : ",
};

const SectorCard: FC<SectorCardProps> = ({ object }) => {
    return (
        <div>
            {object && (
                <div className='sector-card' style={{ backgroundColor: object.color }}>
                    <div className='card-header'>
                        <div className='buttons'>
                            <button className="edit-button">
                                <img className='edit-icon' src={EditIcon} alt="edit icon" />
                            </button>
                            <button className="delete-button">
                                <img className='delete-icon' src={DeleteIcon} alt="delete icon" />
                            </button>
                        </div>
                        <div className='title'>{object.name}</div>
                    </div>
                    <div className='sector-card-content'>
                        <div className='sections'>
                            <div className='section-title'>
                                {sectionTitles.userName + object.userName}
                            </div>
                            <div className='section-title'>
                                {sectionTitles.gamesNumber + object.gamesNumber}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SectorCard;
