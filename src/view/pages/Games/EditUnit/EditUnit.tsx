import { useEffect, useState } from 'react';
import '../AddUnit/AddUnit.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../../../components/Common/ConfirmationDialog/ConfirmationDialog';
import { Location, ObjectLocation, Task, Unit } from '../../../../redux/models/Interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

const AddUnitHebrew = {
    CreateNewUnit: "עריכת חוליה",
    Name: "שם : ",
    Description: "תיאור : ",
    Hint: "רמז:",
    SelectedTask: "משימה לחוליה: ",
    SelectedLocation: "מקום לחוליה: ",
    SelectedObject: "אובייקט לחוליה: ",
    ChooseLocation: "בחירת מקום",
    ChooseTask: "בחירת משימה",
    Save: "שמירה",
    Cancel: "ביטול"
};

function safeParse<T>(json: string | null): T | null {
    if (json === null) return null;
    try {
        return JSON.parse(json);
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return null;
    }
}

function EditUnit() {
    const [unitID, setUnitID] = useState<number | null>(safeParse(localStorage.getItem('editUnitID')));
    const [unitOrder, setUnitOrder] = useState<number | null>(safeParse(localStorage.getItem('editUnitOrder')));
    const [name, setName] = useState(localStorage.getItem('editUnitName') || '');
    const [description, setDescription] = useState(localStorage.getItem('editUnitDescription') || '');
    const [hint, setHint] = useState(localStorage.getItem('editUnitHint') || '');
    const [selectedTask, setSelectedTask] = useState<Task | null>(safeParse(localStorage.getItem('selectedTask') || 'null'));
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(safeParse(localStorage.getItem('selectedLocation') || 'null'));
    const [selectedObject, setSelectedObject] = useState<ObjectLocation | null>(safeParse(localStorage.getItem('selectedObject') || 'null'));
    const navigate = useNavigate();
    const location = useLocation();
    const [showConfirm, setShowConfirm] = useState(false);
    const locations = useSelector((state: RootState) => state.AllData.locations);
    const tasks = useSelector((state: RootState) => state.AllData.Tasks);

    useEffect(() => {
        // console.log("in setting unit fields" + JSON.stringify(location.state?.unit));
        const unit: Unit = location.state?.unit || safeParse(localStorage.getItem('editUnit'));
        console.log("unit " + JSON.stringify(unit))
        if (unit) {
            setUnitID(unit.unitID);
            setUnitOrder(unit.unitOrder);
            setName(unit.name);
            setDescription(unit.description || '');
            setHint(unit.hint);
            const task = tasks.find((t: Task) => t.taskID === unit.taskID);
            setSelectedTask(task || null);
            const loc = locations.find((l: Location) => l.locationID === unit.locationID);
            setSelectedLocation(loc || null);
            const object = loc?.objectsList?.find((o: ObjectLocation) => o.objectID === unit.objectID);
            setSelectedObject(object || null);

            localStorage.setItem('editUnit', JSON.stringify(unit));
            console.log(" unit id is " + unit.unitID.toString());
            localStorage.setItem('editUnitID', unit.unitID?.toString());
            localStorage.setItem('editUnitOrder', unit.unitOrder.toString());
            localStorage.setItem('editUnitName', unit.name);
            localStorage.setItem('editUnitDescription', unit.description || '');
            localStorage.setItem('editUnitHint', unit.hint);
            localStorage.setItem('selectedTask', JSON.stringify(task || null));
            localStorage.setItem('selectedLocation', JSON.stringify(loc || null));
            localStorage.setItem('selectedObject', JSON.stringify(object || null));
        }
    }, [location.state?.unit, tasks, locations]);

    useEffect(() => {
        if (location.state) {
            const state = location.state;
            if (state.selectedTask) {
                setSelectedTask(state.selectedTask);
            }
            if (state.selectedLocation && state.selectedObject) {
                setSelectedLocation(state.selectedLocation);
                setSelectedObject(state.selectedObject);
            }
        }
    }, [location.state]);

    useEffect(() => {
        localStorage.setItem('editUnitID', unitID?.toString() || '');
        localStorage.setItem('editUnitOrder', unitOrder?.toString() || '');
        localStorage.setItem('editUnitName', name);
        localStorage.setItem('editUnitDescription', description);
        localStorage.setItem('editUnitHint', hint);
        localStorage.setItem('selectedTask', JSON.stringify(selectedTask));
        localStorage.setItem('selectedLocation', JSON.stringify(selectedLocation));
        localStorage.setItem('selectedObject', JSON.stringify(selectedObject));
    }, [unitID, unitOrder, name, description, hint, selectedTask, selectedLocation, selectedObject]);

    function clearLocalStorage() {
        localStorage.removeItem('editUnit');
        localStorage.removeItem('editUnitID');
        localStorage.removeItem('editUnitOrder');
        localStorage.removeItem('editUnitName');
        localStorage.removeItem('editUnitDescription');
        localStorage.removeItem('editUnitHint');
        localStorage.removeItem('selectedTask');
        localStorage.removeItem('selectedLocation');
        localStorage.removeItem('selectedObject');
    }

    const handleSaveUnit = () => {
        if (!name.trim() || !hint.trim()) {
            alert("Please provide a name and a hint for the task");
        } else {
            if (selectedTask && selectedObject && selectedLocation) {
                let unit: Unit = location.state?.unit || safeParse(localStorage.getItem('editUnit')) || {} as Unit;
                const updated: Unit = {
                    unitID: unitID || unit.unitID,
                    unitOrder: unitOrder || unit.unitOrder,
                    name,
                    description,
                    hint,
                    taskID: selectedTask.taskID,
                    objectID: selectedObject.objectID,
                    locationID: selectedLocation.locationID
                };
                console.log("updated is " + JSON.stringify(updated));
                navigate('/UnitsPage', { state: { updatedUnit: updated } });
                clearLocalStorage();
            } else {
                alert("Please select a task, an object, and a location before saving.");
            }
        }
    };



    return (
        <div className='main-container-add-unit'>
            {showConfirm && <ConfirmationDialog
                onConfirm={() => {
                    setShowConfirm(false);
                    navigate('/UnitsPage');
                    clearLocalStorage();
                }}
                onCancel={() => setShowConfirm(false)}
            />}
            <div className='add-unit-container' dir="rtl">
                <div className='add-unit-title'>{AddUnitHebrew.CreateNewUnit}</div>
                <div className='input-group'>
                    <label className='input-label'>{AddUnitHebrew.Name}</label>
                    <input type='text' className='unit-input' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddUnitHebrew.Description}</label>
                    <textarea className='unit-textarea' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddUnitHebrew.Hint}</label>
                    <textarea className='unit-textarea' value={hint} onChange={e => setHint(e.target.value)}></textarea>
                </div>
                {selectedTask && (
                    <div className='input-group'>
                        <label className='input-label'>{AddUnitHebrew.SelectedTask}</label>
                        <div className='selected-task'>{selectedTask.name}</div>
                    </div>
                )}
                {selectedLocation && (
                    <div className='input-group'>
                        <label className='input-label'>{AddUnitHebrew.SelectedLocation}</label>
                        <div className='selected-task'>{selectedLocation.name}</div>
                    </div>
                )}
                {selectedObject && (
                    <div className='input-group'>
                        <label className='input-label'>{AddUnitHebrew.SelectedObject}</label>
                        <div className='selected-task'>{selectedObject.name}</div>
                    </div>
                )}
                <div className='options-container'>
                    <div className="option-section">
                        <div className='add-buttons'>
                            <button
                                type="button"
                                className='option-button'
                                onClick={() => {
                                    const unitToSave = {
                                        unitID,
                                        unitOrder,
                                        name,
                                        description,
                                        hint,
                                        taskID: selectedTask?.taskID,
                                        objectID: selectedObject?.objectID,
                                        locationID: selectedLocation?.locationID
                                    };
                                    localStorage.setItem('editUnit', JSON.stringify(unitToSave));
                                    navigate('/ChooseLocation-edit');
                                }}
                            >
                                {AddUnitHebrew.ChooseLocation}
                            </button>
                            <button
                                type="button"
                                className='option-button'
                                onClick={() => {
                                    const unitToSave = {
                                        unitID,
                                        unitOrder,
                                        name,
                                        description,
                                        hint,
                                        taskID: selectedTask?.taskID,
                                        objectID: selectedObject?.objectID,
                                        locationID: selectedLocation?.locationID
                                    };
                                    localStorage.setItem('editUnit', JSON.stringify(unitToSave));
                                    navigate('/ChooseTask-edit');
                                }}
                            >
                                {AddUnitHebrew.ChooseTask}
                            </button>

                        </div>
                    </div>
                </div>
                <div className='options-container'>
                    <div className="option-section">
                        <div className='button-group'>
                            <button type="button" className='cancel-button' onClick={() => setShowConfirm(true)}>{AddUnitHebrew.Cancel}</button>
                            <button type="button" className='save-button' onClick={handleSaveUnit}>{AddUnitHebrew.Save}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUnit;
