import { FC } from "react";
import "./ObjectCard.scss";
import { ObjectLocation } from "../../../../redux/models/Interfaces";
import { DeleteIcon, EditIcon } from "../../../photos";

interface ObjectCardProps {
    object: ObjectLocation;
    onShowConfirm: (object: ObjectLocation) => void;
    onEditObject: (object: ObjectLocation) => void;
}

const ObjectSectionTitles = {
    ObjectName: " שם האובייקט : ",
    ObjectDescription: " תיאור : ",
};

const ObjectsCard: FC<ObjectCardProps> = ({ object, onShowConfirm, onEditObject }) => {
    return (
        <div className="object-card">
            <div className="card-header">
                <div className="title">{object.name}</div>
                <div className="buttons">
                    <button
                        className="edit-button"
                        onClick={(e) => {
                            console.log("clicked on edit button");
                            e.preventDefault();
                            onEditObject(object);
                        }}
                    >
                        <img className="edit-icon" src={EditIcon} alt="Edit" />
                    </button>
                    <button
                        className="delete-button"
                        onClick={(e) => {
                            e.preventDefault();
                            onShowConfirm(object);
                        }}
                    >
                        <img className="delete-icon" src={DeleteIcon} alt="Delete" />
                    </button>
                </div>
            </div>
            <div className="object-card-content">
                <div className="sections">
                    <div className="section-title">
                        {ObjectSectionTitles.ObjectName + object.name}
                    </div>
                    {object.description && (
                        <div className="section-title">
                            {ObjectSectionTitles.ObjectDescription + object.description}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ObjectsCard;