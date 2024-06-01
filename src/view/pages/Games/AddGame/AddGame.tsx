import { useEffect, useState } from 'react';
import './AddGame.scss'
import { useNavigate } from 'react-router-dom';
import { Unit } from '../../../../redux/models/Interfaces';
import { useLocation } from 'react-router-dom';

const AddNewGameHeb = {
    CreateNewGame: "הוספת משחק חדש ",
    Name: "שם : ",
    Description: "תיאור : ",
    AddUnits: "הוספת חוליות",
    Save: "שמירה",
};

function AddGame() {
    const [gameName, setGameName] = useState(localStorage.getItem('gameName') || '');
    const [gameDesc, setGameDesc] = useState(localStorage.getItem('gameDesc') || '');
    const [gameUnits, setGameUnits] = useState<Unit[]>([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const units = location.state?.units || [];
        setGameUnits(units);

        const storedGameName = localStorage.getItem('gameName');
        const storedGameDesc = localStorage.getItem('gameDesc');
        if (storedGameName) setGameName(storedGameName);
        if (storedGameDesc) setGameDesc(storedGameDesc);
    }, [location.state?.units]);

    useEffect(() => {
        localStorage.setItem('gameName', gameName);
        localStorage.setItem('gameDesc', gameDesc);
    }, [gameName, gameDesc]);


    const handleSave = async () => {
        console.log("game units " + gameUnits);
    }
    return (
        <div className='main-container-add-game'>
            <div className='add-game-header'>
                <div className='sector-name' dir='rtl'>פיזוטרפיה</div>
            </div>
            <div className='add-game-container' dir="rtl">
                <div className='add-game-title'>{AddNewGameHeb.CreateNewGame}</div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewGameHeb.Name}</label>
                    <input type='text' className='game-input' value={gameName} onChange={e => setGameName(e.target.value)} />
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewGameHeb.Description}</label>
                    <textarea className='game-textarea' value={gameDesc} onChange={e => setGameDesc(e.target.value)}></textarea>
                </div>
                <div className='input-group'>
                    <button className='add-buttons' onClick={() => { navigate('/UnitsPage') }}>{AddNewGameHeb.AddUnits}</button>
                </div>
                <button className='save-button' onClick={handleSave}>{AddNewGameHeb.Save}</button>

            </div>
        </div >
    )
}

export default AddGame;