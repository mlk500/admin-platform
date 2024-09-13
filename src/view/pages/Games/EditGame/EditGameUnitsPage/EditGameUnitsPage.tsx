import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./EditGameUnitsPage.scss";
import { Unit, Game } from "../../../../../redux/models/Interfaces";

const EditGameUnitsPageHeb = {
    Units: "חוליות",
    AddUnit: "הוספת חוליה",
    Duplicate: "שכפול",
    Delete: "מחיקה",
    Save: "שמירה",
    NoUnits: "אין חוליות נוספות להצגה",
};

function EditGameUnitsPage() {
    const [units, setUnits] = useState<Unit[]>([]);
    const [game, setGame] = useState<Game | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [tempUnitId, setTempUnitId] = useState<number>(0);

    useEffect(() => {
        if (location.state?.game) {
            setGame(location.state.game);
            setUnits(location.state.game.units || []);
            setTempUnitId(Math.max(...location.state.game.units.map((u: Unit) => u.unitID), 0) + 1);
        }
    }, [location.state]);

    const handleSave = () => {
        if (game) {
            const updatedGame = { ...game, units };
            navigate("/EditGame", { state: { updatedGame } });
        }
    };

    const handleDelete = (index: number) => {
        const updatedUnits = units
            .filter((_, idx) => idx !== index)
            .map((unit, idx) => ({ ...unit, unitOrder: idx + 1 }));
        setUnits(updatedUnits);
    };

    const handleDuplicate = (unit: Unit) => {
        const newUnit = {
            ...unit,
            unitID: tempUnitId,
            unitOrder: units.length + 1,
        };
        setUnits((prevUnits) => [...prevUnits, newUnit]);
        setTempUnitId((prevId) => prevId + 1);
    };

    const handleDrag = (fromIndex: number, toIndex: number) => {
        const newUnits = [...units];
        const [reorderedItem] = newUnits.splice(fromIndex, 1);
        newUnits.splice(toIndex, 0, reorderedItem);
        const updatedUnits = newUnits.map((unit, index) => ({
            ...unit,
            unitOrder: index + 1,
        }));
        setUnits(updatedUnits);
    };

    const handleEdit = (unit: Unit) => {
        localStorage.setItem('edit-editUnit', JSON.stringify(unit));
        navigate("/Edit-EditUnit");
    };

    const handleAddUnit = () => {
        navigate("/Edit-AddUnit");
    };

    return (
        <div className="main-container">
            <div className="overlay" />
            <div className="units-container" dir="rtl">
                <div className="units-title">{EditGameUnitsPageHeb.Units}</div>
                <div className="units-list">
                    {units.length === 0 ? (
                        <div className="empty-state">{EditGameUnitsPageHeb.NoUnits}</div>
                    ) : (
                        units.map((unit, index) => (
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
                                {unit.description && (
                                    <div className="unit-description">{unit.description}</div>
                                )}
                                <div className="unit-actions">
                                    <button
                                        className="duplicate-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDuplicate(unit);
                                        }}
                                    >
                                        {EditGameUnitsPageHeb.Duplicate}
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(index);
                                        }}
                                    >
                                        {EditGameUnitsPageHeb.Delete}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="options-container">
                    <div className="option-section">
                        <div className="add-buttons">
                            <button type="button" className="option-button" onClick={handleAddUnit}>
                                {EditGameUnitsPageHeb.AddUnit}
                            </button>
                        </div>
                    </div>
                </div>
                <button className="save-button" onClick={handleSave}>
                    {EditGameUnitsPageHeb.Save}
                </button>
            </div>
        </div>
    );
}

export default EditGameUnitsPage;