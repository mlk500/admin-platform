import { FC } from 'react';
import './TaskCard.scss';
import { Task } from '../../../../redux/models/Interfaces';
import { EditIcon, DeleteIcon } from '../../../photos';

interface TaskCardProps {
    object: Task;
    onShowConfirm: (task: Task) => void;
    onEditTask: (task: Task) => void;
}

const sectionTitles = {
    userName: "",
    gamesNumber: "תיאור : ",
};

const TaskCard: FC<TaskCardProps> = ({ object, onShowConfirm, onEditTask }) => {

    return (
        <div className='task-card' style={{ backgroundColor: "" }}>
            <div className='card-header'>
                <div className='buttons'>
                    <button className="edit-button" onClick={(e) => {
                        e.preventDefault();
                        onEditTask(object);
                    }}>
                        <img className='edit-icon' src={EditIcon} />
                    </button>
                    <button className="delete-button"
                        onClick={(e) => {
                            e.preventDefault();
                            onShowConfirm(object);
                        }}>
                        <img className='delete-icon' src={DeleteIcon} />
                    </button>
                </div>
                <div className='title'>{object.name}</div>
            </div>
            <div className='task-card-content'>
                <div className='sections'>
                    <div className='section-title'>
                        {sectionTitles.userName + object.description}
                    </div>
                    <div className='section-title'>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
