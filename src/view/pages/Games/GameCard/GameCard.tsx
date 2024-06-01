import { FC } from 'react'
import './GameCard.scss'
import { Game } from '../../../../redux/models/Interfaces';
import { EditIcon, DeleteIcon } from '../../../photos';

interface GameCardProps {
    game: Game;
}
const sectionTitles = {
    userName: "שם משתמש : ",
    gamesNumber: "מספר המשחקים : ",
};
const GameCard: FC<GameCardProps> = ({ game }) => {
    return (
        <div className='game-card' >
            <div className='card-header'>
                <div className='buttons'>
                    <button className="edit-button">
                        <img className='edit-icon' src={EditIcon} />
                    </button>
                    <button className="delete-button">
                        <img className='delete-icon' src={DeleteIcon} />
                    </button>
                </div>
                <div className='title'>{game.gameName}</div>
            </div>
            <div className='game-card-content'>
                <div className='sections'>
                    <div className='section-title'>
                        {sectionTitles.userName + game.gameName}
                    </div>
                    <div className='section-title'>
                        {sectionTitles.gamesNumber + game.gameID}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default GameCard;