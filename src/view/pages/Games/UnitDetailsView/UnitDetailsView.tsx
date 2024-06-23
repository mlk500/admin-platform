import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UnitDetailsView.scss';
import { Unit } from '../../../../redux/models/Interfaces';
import './UnitDetailsView.scss';

const UnitDetailsHebrew = {
    UnitDetails: "פרטי החוליה",
    Name: "שם : ",
    Description: "תיאור : ",
    Hint: "רמז:",
    Task: "משימה לחוליה: ",
    Location: "מקום לחוליה: ",
    Object: "אובייקט לחוליה: ",
    Back: "חזרה"
};

const UnitDetailsView: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const unit: Unit = location.state.unit;

    const handleNavigateToTask = () => {
        navigate(`/TaskDetails/${unit.taskID}`);
    };

    const handleNavigateToObject = () => {
        navigate(`/ObjectDetails/${unit.objectID}`);
    };

    return (
        <div className='main-container-unit-details'>
            <div className='unit-details-container' dir="rtl">
                <div className='unit-details-title'>{UnitDetailsHebrew.UnitDetails}</div>
                <div className='input-group'>
                    <label className='input-label'>{UnitDetailsHebrew.Name}</label>
                    <div className='unit-value'>{unit.name}</div>
                </div>
                <div className='input-group'>
                    <label className='input-label'>{UnitDetailsHebrew.Description}</label>
                    <div className='unit-value'>{unit.description}</div>
                </div>
                <div className='input-group'>
                    <label className='input-label'>{UnitDetailsHebrew.Hint}</label>
                    <div className='unit-value'>{unit.hint}</div>
                </div>
                <div className='input-group'>
                    <label className='input-label'>{UnitDetailsHebrew.Task}</label>
                    <div className='unit-value' onClick={handleNavigateToTask} style={{ cursor: 'pointer', color: 'blue' }}>
                        {unit.taskID}
                    </div>
                </div>
                <div className='input-group'>
                    <label className='input-label'>{UnitDetailsHebrew.Location}</label>
                    <div className='unit-value'>{unit.locationID}</div>
                </div>
                <div className='input-group'>
                    <label className='input-label'>{UnitDetailsHebrew.Object}</label>
                    <div className='unit-value' onClick={handleNavigateToObject} style={{ cursor: 'pointer', color: 'blue' }}>
                        {unit.objectID}
                    </div>
                </div>
                <button className='back-button' onClick={() => navigate(-1)}>{UnitDetailsHebrew.Back}</button>
            </div>
        </div>
    );
};

export default UnitDetailsView;
