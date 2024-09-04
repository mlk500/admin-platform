import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ConfirmationDialog from "../../../components/Common/ConfirmationDialog/ConfirmationDialog";
import {
  Game,
  Location,
  ObjectLocation,
  Task,
  Unit,
} from "../../../../redux/models/Interfaces";
import { RootState } from "../../../../redux/store";
import "./EditUnit.scss";
import { setCard } from "../../../../redux/slices/GlobalStates";

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
  Cancel: "ביטול",
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
  const [unitID, setUnitID] = useState<number | null>(null);
  const [unitOrder, setUnitOrder] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hint, setHint] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const game: Game = useSelector(
    (state: RootState) => state.globalStates.selectedCard
  );
  const [selectedObject, setSelectedObject] = useState<ObjectLocation | null>(
    null
  );
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const locations = useSelector((state: RootState) => state.AllData.locations);
  const tasks = useSelector((state: RootState) => state.AllData.Tasks);

  useEffect(() => {
    const unit: Unit =
      location.state?.unit || safeParse(localStorage.getItem("editUnit"));

    if (unit) {
      setUnitID(unit.unitID);
      setUnitOrder(unit.unitOrder);
      setName(unit.name);
      setDescription(unit.description || "");
      setHint(unit.hint);

      if (unit.taskDTO) {
        setSelectedTask(unit.taskDTO);
      } else if (unit.taskID) {
        const task = tasks.find((t: Task) => t.taskID === unit.taskID);
        setSelectedTask(task || null);
      }

      if (unit.locationDTO) {
        setSelectedLocation(unit.locationDTO);
      } else if (unit.locationID) {
        const loc = locations.find(
          (l: Location) => l.locationID === unit.locationID
        );
        setSelectedLocation(loc || null);
      }

      if (unit.objectDTO) {
        setSelectedObject(unit.objectDTO);
      } else if (unit.objectID) {
        const loc =
          unit.locationDTO ||
          locations.find((l: Location) => l.locationID === unit.locationID);
        const object = loc?.objectsList?.find(
          (o: ObjectLocation) => o.objectID === unit.objectID
        );
        setSelectedObject(object || null);
      }

      updateLocalStorage(unit);
    }
  }, [location.state?.unit, tasks, locations]);

  useEffect(() => {
    if (location.state) {
      const { selectedTask, selectedLocation, selectedObject } = location.state;
      if (selectedTask) setSelectedTask(selectedTask);
      if (selectedLocation) setSelectedLocation(selectedLocation);
      if (selectedObject) setSelectedObject(selectedObject);
    }
  }, [location.state]);

  function updateLocalStorage(data: Partial<Unit>) {
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  function clearLocalStorage() {
    [
      "editUnit",
      "editUnitID",
      "editUnitOrder",
      "editUnitName",
      "editUnitDescription",
      "editUnitHint",
      "selectedTask",
      "selectedLocation",
      "selectedObject",
    ].forEach((key) => {
      localStorage.removeItem(key);
    });
  }
  const handleSaveUnit = () => {
    if (!name.trim() || !hint.trim()) {
      alert("Please provide a name and a hint for the task");
      return;
    }
    if (!(selectedTask && selectedObject && selectedLocation)) {
      alert("Please select a task, an object, and a location before saving.");
      return;
    }

    const updated: Unit = {
      unitID: unitID!,
      unitOrder: unitOrder!,
      name,
      description,
      hint,
      taskID: selectedTask.taskID,
      objectID: selectedObject.objectID,
      locationID: selectedLocation.locationID,
      taskDTO: selectedTask,
      objectDTO: selectedObject,
      locationDTO: selectedLocation,
    };

    const updatedGame = { ...game };
    updatedGame.units = [...(updatedGame.units || [])];

    updatedGame.units.push(updated);
    setCard(updatedGame);
    navigate("/UnitsPage", { state: { updatedUnit: updated } });
    clearLocalStorage();
  };

  const handleChooseLocation = () => {
    const unitToSave = {
      unitID,
      unitOrder,
      name,
      description,
      hint,
      taskID: selectedTask?.taskID,
      objectID: selectedObject?.objectID,
      locationID: selectedLocation?.locationID,
    };
    localStorage.setItem("editUnit", JSON.stringify(unitToSave));
    navigate("/ChooseLocation-edit");
  };

  const handleChooseTask = () => {
    const unitToSave = {
      unitID,
      unitOrder,
      name,
      description,
      hint,
      taskID: selectedTask?.taskID,
      objectID: selectedObject?.objectID,
      locationID: selectedLocation?.locationID,
    };
    localStorage.setItem("editUnit", JSON.stringify(unitToSave));
    navigate("/ChooseTask-edit");
  };

  return (
    <div className="main-container-edit-unit">
      {showConfirm && (
        <ConfirmationDialog
          onConfirm={() => {
            setShowConfirm(false);
            navigate("/UnitsPage");
            clearLocalStorage();
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      {/* Overlay */}
      <div className="overlay" />
      <div className="edit-unit-container" dir="rtl">
        <div className="edit-unit-title">{AddUnitHebrew.CreateNewUnit}</div>
        <div className="input-group">
          <label className="input-label">{AddUnitHebrew.Name}</label>
          <input
            type="text"
            className="unit-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">{AddUnitHebrew.Description}</label>
          <textarea
            className="unit-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="input-group">
          <label className="input-label">{AddUnitHebrew.Hint}</label>
          <textarea
            className="unit-textarea"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
          ></textarea>
        </div>
        {selectedTask && (
          <div className="input-group">
            <label className="input-label">{AddUnitHebrew.SelectedTask}</label>
            <div className="selected-task">{selectedTask.name}</div>
          </div>
        )}
        {selectedLocation && (
          <div className="input-group">
            <label className="input-label">
              {AddUnitHebrew.SelectedLocation}
            </label>
            <div className="selected-task">{selectedLocation.name}</div>
          </div>
        )}
        {selectedObject && (
          <div className="input-group">
            <label className="input-label">
              {AddUnitHebrew.SelectedObject}
            </label>
            <div className="selected-task">{selectedObject.name}</div>
          </div>
        )}
        <div className="options-container">
          <div className="option-section">
            <div className="unit-buttons">
              <button
                type="button"
                className="option-button"
                onClick={handleChooseLocation}
              >
                {AddUnitHebrew.ChooseLocation}
              </button>
              <button
                type="button"
                className="option-button"
                onClick={handleChooseTask}
              >
                {AddUnitHebrew.ChooseTask}
              </button>
            </div>
          </div>
        </div>
        <div className="options-container">
          <div className="option-section">
            <div className="button-group">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowConfirm(true)}
              >
                {AddUnitHebrew.Cancel}
              </button>
              <button
                type="button"
                className="save-button"
                onClick={handleSaveUnit}
              >
                {AddUnitHebrew.Save}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUnit;
