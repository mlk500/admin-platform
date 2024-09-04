import { useEffect, useState } from "react";
import "./AddUnit.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../components/Common/ConfirmationDialog/ConfirmationDialog";
import {
  Location,
  ObjectLocation,
  Task,
  Unit,
} from "../../../../redux/models/Interfaces";

const AddUnitHebrew = {
  CreateNewUnit: "הוספת חוליה",
  Name: "שם : ",
  Description: "תיאור : ",
  Hint: "רמז:",
  SelectedTask: "משימה לחוליה: ",
  SelectedLocation: "מקום לחוליה: ",
  SelectedObject: "אובייקט לחוליה: ",
  ChooseLocation: "בחירת מקום",
  ChooseTask: "בחירת משימה",
  CreateTask: "יצירת משימה",
  Save: "שמירה",
  Cancel: "ביטול",
};

function safeParse(json: string) {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
}

function AddUnit() {
  const [name, setName] = useState(localStorage.getItem("addUnitName") || "");
  const [description, setDescription] = useState(
    localStorage.getItem("addUnitDescription") || ""
  );
  const [hint, setHint] = useState(localStorage.getItem("addUnitHint") || "");
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(
    safeParse(localStorage.getItem("selectedTask") || "null")
  );
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    safeParse(localStorage.getItem("selectedLocation") || "null")
  );
  const [selectedObject, setSelectedObject] = useState<ObjectLocation | null>(
    safeParse(localStorage.getItem("selectedObject") || "null")
  );

  useEffect(() => {
    localStorage.setItem("addUnitName", name);
    localStorage.setItem("addUnitDescription", description);
    localStorage.setItem("addUnitHint", hint);
    localStorage.setItem("selectedTask", JSON.stringify(selectedTask));
    localStorage.setItem("selectedLocation", JSON.stringify(selectedLocation));
    localStorage.setItem("selectedObject", JSON.stringify(selectedObject));
  }, [name, description, hint, selectedTask, selectedLocation, selectedObject]);

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

  function clearLocalStorage() {
    localStorage.removeItem("addUnitName");
    localStorage.removeItem("addUnitDescription");
    localStorage.removeItem("addUnitHint");
    localStorage.removeItem("selectedTask");
    localStorage.removeItem("selectedLocation");
    localStorage.removeItem("selectedObject");
  }

  const handleSaveUnit = () => {
    if (!name.trim() || !hint.trim()) {
      alert("Please provide a name and a hint for the task");
    } else {
      if (selectedTask && selectedObject && selectedLocation) {
        const createdUnit: Unit = {
          unitID: 0,
          unitOrder: 0,
          name,
          description,
          hint,
          taskID: selectedTask.taskID,
          objectID: selectedObject.objectID,
          locationID: selectedLocation.locationID,
        };
        navigate("/UnitsPage", { state: { newUnit: createdUnit } });
        clearLocalStorage();
      } else {
        alert("Please select a task, an object, and a location before saving.");
      }
    }
  };
  return (
    <div className="main-container-add-unit">
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
      <div className="overlay" />
      <div className="add-unit-container" dir="rtl">
        <div className="add-unit-title">{AddUnitHebrew.CreateNewUnit}</div>
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
            <div className="add-buttons">
              {/* ChoosableLocation */}
              <Link to="/ChooseLocation-add">
                <button type="button" className="option-button">
                  {AddUnitHebrew.ChooseLocation}
                </button>
              </Link>
              <button
                type="button"
                className="option-button"
                onClick={() => navigate("/ChooseTask-add")}
              >
                {" "}
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

export default AddUnit;
