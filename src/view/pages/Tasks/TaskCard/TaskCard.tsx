import { FC } from 'react'
import './TaskCard.scss'
import { Task } from '../../../../redux/models/Interfaces';
import { EditIcon, DeleteIcon } from '../../../photos';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCard } from '../../../../redux/slices/GlobalStates';
import { taskAPI } from '../../../../redux/services/TaskApi';

interface TaskCardProps {
    object: Task;
}
const sectionTitles = {
    userName: "",
    gamesNumber: "תיאור : ",
};
const TaskCard: FC<TaskCardProps> = ({ object }) => {
    const dispatch = useDispatch();
    return (
        <div className='task-card' style={{ backgroundColor: "#D9D9D9" }}>
            <div className='card-header'>
                <div className='buttons'>
                    <Link to="/EditTask">
                        <button className="edit-button" onClick={() => dispatch(setCard(object))}>
                            <img className='edit-icon' src={EditIcon} />
                        </button>
                    </Link>
                    <Link to="/Tasks">
                        <button type='button' className="delete-button" onClick={() => { (taskAPI.deleteTask(object.taskID)) }}>
                            <img className='delete-icon' src={DeleteIcon} />
                        </button>
                    </Link>
                </div>
                <div className='title'>{object.name}</div>
            </div>
            <div className='task-card-content'>
                <div className='sections'>
                    <div className='section-title'>
                        {sectionTitles.userName + object.description}
                    </div>
                    <div className='section-title'>
                        {/* {sectionTitles.gamesNumber + task.sector} */}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TaskCard;