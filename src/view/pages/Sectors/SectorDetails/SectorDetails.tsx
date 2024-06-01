import { FC, useState } from 'react';
import { ColorPicker, DoctorUserIcon, HospitalIcon, PasswordIcon, LeftArrowIcon } from '../../../photos';
import { RootState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { SketchPicker } from "react-color";
import { Link } from 'react-router-dom';
import './SectorDetails.scss'
const SectorDetails: FC = () => {
    const sector = useSelector((state: RootState) => state.globalStates.selectedCard);
    const [color, setColor] = useState('בחר צבע');
    const [showColorPicker, setShowColorPicker] = useState(false);

    const handleColorChange = (newColor: any) => {
        setColor(newColor.hex);
    };

    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };
    return (
        <div className='sector-details' dir="rtl">
            <div className='edit-sector-header'>
                <div className='sector-title'>{sector.name}</div>
                <Link to="/Sectors">
                    <div className='arrow-icon'><img className='arrow-icon' src={LeftArrowIcon} alt="arrow" /></div>
                </Link>
            </div>
            <div className="inputs-button">
                <div className="new-sector">
                    <input className="sector-input" placeholder={sector.name} />
                    <img
                        className="hospital-icon"
                        src={HospitalIcon}
                        alt="hospital-icon"
                    />
                </div>
                <div className="admin-user-name">
                    <input className="admin-user-name-input" placeholder={sector.userName} />
                    <img className="navbar-icon" src={DoctorUserIcon} alt="admin-icon" />
                </div>
                <div className="admin-code">
                    <input
                        className="admin-code-input"
                        type="password"
                        placeholder=" עדכן את הסיסמה"
                    />
                    <img className="navbar-icon" src={PasswordIcon} alt="password-icon" />
                </div>
                <div className="color-picker">
                    <div className="color-container">
                        {showColorPicker && (
                            <SketchPicker className="color-picker-popup" color={color} onChange={handleColorChange} />
                        )}
                        <div className="color-input-container">
                            <input
                                className="color-picker-input"
                                placeholder={color}
                            />
                            <img
                                className="navbar-icon-color"
                                src={ColorPicker}
                                alt="admin-icon"
                                onClick={toggleColorPicker}
                            />
                        </div>
                    </div>
                    <div className="final-buttons">
                        <Link to="/Sectors">
                            <button className="button-s">עדכון</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectorDetails;
