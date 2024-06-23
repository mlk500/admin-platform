import { FC } from 'react';
import { HospitalIcon, ApplicationsIcon, LocationIcon, TaskIcon, LogOutIcon, WhiteLogo } from '../../../photos';
import './AdminMenu.scss';
import { buttonsName } from '../../../../redux/models/Types';
import { Link } from 'react-router-dom';
import { setPage } from '../../../../redux/slices/GlobalStates';
import { useDispatch } from 'react-redux';

interface AdminMenuProps {
    setActiveButton: (buttonName: string) => void;
    activeButton: string;
}

const AdminMenu: FC<AdminMenuProps> = ({ setActiveButton, activeButton }) => {
    const dispatch = useDispatch();

    const handlePageChange = (page: string) => {
        setActiveButton(page);
        dispatch(setPage(page));
        localStorage.setItem('page', page);
    };

    return (
        <div className='admin-menu'>
            <div className='title'> חפש את המטמון ב </div>
            <img className='logo' src={WhiteLogo} alt="logo" />
            <div className='buttons'>
                <Link className="menu-button" to="/Sectors">
                    <button
                        className={`menu-button ${activeButton === buttonsName.Sectors ? "active" : ""}`}
                        onClick={() => handlePageChange(buttonsName.Sectors)}
                    >
                        <div className='button-txt'>{buttonsName.Sectors}</div>
                        <img className="navbar-icon-sectors" src={HospitalIcon} alt="menu-icon" />
                    </button>
                </Link>
                <Link className="menu-button" to="/Games">
                    <button
                        className={`menu-button ${activeButton === buttonsName.Games ? "active" : ""}`}
                        onClick={() => handlePageChange(buttonsName.Games)}
                    >
                        <div className='button-txt'>{buttonsName.Games}</div>
                        <img className="navbar-icon" src={ApplicationsIcon} alt="menu-icon" />
                    </button>
                </Link>
                <Link className="menu-button" to="/Locations">
                    <button
                        className={`menu-button ${activeButton === buttonsName.Locations ? "active" : ""}`}
                        onClick={() => handlePageChange(buttonsName.Locations)}
                    >
                        <div className='button-txt'>{buttonsName.Locations}</div>
                        <img className="navbar-icon" src={LocationIcon} alt="menu-icon" />
                    </button>
                </Link>
                <Link className="menu-button" to="/Tasks">
                    <button
                        className={`menu-button ${activeButton === buttonsName.Tasks ? "active" : ""}`}
                        onClick={() => handlePageChange(buttonsName.Tasks)}
                    >
                        <div className='button-txt'>{buttonsName.Tasks}</div>
                        <img className="navbar-icon" src={TaskIcon} alt="menu-icon" />
                    </button>
                </Link>
                <Link className="menu-button" to="/">
                    <button
                        className={`menu-button ${activeButton === buttonsName.Logout ? "active" : ""}`}
                        onClick={() => {
                            localStorage.clear();
                            handlePageChange(buttonsName.Logout);
                        }}
                    >
                        <div className='button-txt'>{buttonsName.Logout}</div>
                        <img className="navbar-icon" src={LogOutIcon} alt="menu-icon" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AdminMenu;
