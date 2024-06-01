import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './UnitsPage.scss';
import { Unit } from '../../../../redux/models/Interfaces';

const UnitsPageHeb = {
    Units: "חוליות",
    AddUnits: "הוספת חוליה",
    Duplicate: "שכפול",
    Delete: "מחיקה",
    Save: "שמירה"
};

function UnitsPage() {

    const [units, setUnits] = useState<Unit[]>([]);
    const navigate = useNavigate()
    const location = useLocation();
    const [tempUnitId, setTempUnitId] = useState<number>(() => {
        const storedUnits = JSON.parse(localStorage.getItem('units') || '[]');
        return storedUnits.reduce((maxId: number, unit: Unit) => Math.max(maxId, unit.unitID), 0) + 1;
    });

    useEffect(() => {
        console.log("set units")
        const initialUnits = JSON.parse(localStorage.getItem('units') || '[]').sort((a: Unit, b: Unit) => a.unitOrder - b.unitOrder);
        setUnits(initialUnits);
        console.log("units are " + localStorage.getItem('units'))
    }, []);

    useEffect(() => {
        if (location.state?.newUnit) {
            setUnits(prevUnits => {
                const maxOrder = prevUnits.reduce((max, unit) => Math.max(max, unit.unitOrder), 0);
                const newUnit = {
                    ...location.state.newUnit,
                    unitOrder: maxOrder + 1
                };
                const updatedUnits = [...prevUnits, newUnit];
                localStorage.setItem('units', JSON.stringify(updatedUnits));
                navigate('/UnitsPage', { replace: true });
                return updatedUnits;
            });
        }
    }, [location.state?.newUnit]);

    useEffect(() => {
        if (location.state?.updatedUnit) {
            const updatedUnit = location.state.updatedUnit;
            setUnits(currUnits => {
                const updatedUnits = currUnits.map(unit =>
                    unit.unitID === updatedUnit.unitID ? updatedUnit : unit
                );
                localStorage.setItem('units', JSON.stringify(updatedUnits));
                return updatedUnits;
            });
            navigate('/UnitsPage', { replace: true });
        }
    }, [location.state?.updatedUnit]);

    const handleSave = () => {
        console.log('Save units:', units);
        navigate('/AddGame', { state: { units } });
        // localStorage.removeItem('units');
    };

    const handleDelete = (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        const updatedUnits = units.filter((_, idx) => idx !== index).map((unit, idx) => ({ ...unit, unitOrder: idx + 1 }));
        setUnits(updatedUnits);
        localStorage.setItem('units', JSON.stringify(updatedUnits));
    };


    const handleDuplicate = (unit: Unit, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        const newUnit = { ...unit, unitID: tempUnitId, unitOrder: units.length + 1 };
        setUnits(prevUnits => {
            const updatedUnits = [...prevUnits, newUnit];
            localStorage.setItem('units', JSON.stringify(updatedUnits));
            return updatedUnits;
        });
        setTempUnitId(prevId => prevId + 1);
    };


    const handleDrag = (fromIndex: number, toIndex: number) => {
        const newUnits = [...units];
        const item = newUnits.splice(fromIndex, 1)[0];
        newUnits.splice(toIndex, 0, item);
        const updatedUnits = newUnits.map((unit, index) => ({ ...unit, unitOrder: index + 1 }));
        setUnits(updatedUnits);
        localStorage.setItem('units', JSON.stringify(updatedUnits));
    }


    const handleEdit = (unit: Unit) => {
        navigate('/EditUnit', { state: { unit } });
    };

    return (
        <div className='main-container'>
            <div className='units-container' dir="rtl">
                <div className='units-title'>{UnitsPageHeb.Units}</div>
                <div className='units-list'>
                    {units.map((unit, index) => (
                        <div
                            key={unit.unitID}
                            className="unit-card"
                            onClick={() => handleEdit(unit)}
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData("index", index.toString());
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const fromIndex = parseInt(e.dataTransfer.getData("index"));
                                const toIndex = index;
                                handleDrag(fromIndex, toIndex);
                            }}
                            title={unit.hint}
                        >
                            <div className="unit-name">{unit.name}</div>
                            {unit.description && <div className="unit-description">{unit.description}</div>}
                            <div className="unit-actions">
                                <button className="duplicate-button" onClick={(e) => { handleDuplicate(unit, e) }}>{UnitsPageHeb.Duplicate}</button>
                                <button className="delete-button" onClick={(e) => handleDelete(index, e)}>{UnitsPageHeb.Delete}</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='options-container'>
                    <div className="option-section">
                        <div className='add-buttons'>
                            <Link to='/AddUnit'>
                                <button type="button" className='option-button'>{UnitsPageHeb.AddUnits}</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <button className='save-button' onClick={handleSave}>{UnitsPageHeb.Save}</button>
            </div>
        </div>
    );
}

export default UnitsPage;