import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from '../../../../redux/store';
import { Game } from "../../../../redux/models/Interfaces";
import { useNavigate } from "react-router-dom";
import './GameDetails.scss';
const GameHeb = {
    CreateNewGame: "הוספת משחק חדש ",
    Name: "שם : ",
    Description: "תיאור : ",
    ViewUnits: "הצגת חוליות",
    NoUnits: "עדיין אין חוליות",
    DownloadQR: "הורדת QR"
};

const GameDetails: React.FC = () => {
    const game: Game = useSelector((state: RootState) => state.globalStates.selectedCard);
    const navigate = useNavigate();

    const downloadQRCode = () => {
        const fileName = game.qrcodePath.substring(game.qrcodePath.lastIndexOf('/') + 1);
        const link = document.createElement('a');
        link.href = game.qrcodePath.replace("/Users/malakyehia/admin_system/ShibaProjectAdminFrontend", '../../..');
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    console.log("qr path is  " + game.qrcodePath)

    return (
        <div className='game-container' dir='rtl' style={{ background: "#E9C46A" }}>
            <div className='add-task-header'>
                <div className='sector-name'>פיזוטרפיה</div>
            </div>
            <div className='game-details'>
                <div className='game-title'>{game.gameName}</div>
                {game.description && (
                    <>
                        <div className='section-title'>{GameHeb.Description}</div>
                        <div className='game-desc'>{game.description}</div>
                    </>
                )}
                {game.units?.length === 0 ? (
                    <div>{GameHeb.NoUnits}</div>
                ) : (
                    <button className='view-units' onClick={() => { navigate(`/UnitsPageView`, { state: { game } }); }}>
                        {GameHeb.ViewUnits}
                    </button>
                )}
                {game.qrcodePath && (
                    <div className='qr-section'>
                        <div className='game-qr'>
                            <img src={game.qrcodePath.replace("/Users/malakyehia/admin_system/ShibaProjectAdminFrontend", '../../..')}
                                alt='QR Code' className='qr-code-image' />
                        </div>
                        <button className='download-qr-btn' onClick={downloadQRCode}>
                            {GameHeb.DownloadQR}
                            {/* <img className='download-icon' src={DownloadIcon} alt="download icon" /> */}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GameDetails;
