import { FC } from 'react';
import { Task } from '../../../../../redux/models/Interfaces';
import { useNavigate } from 'react-router-dom';
import './ChooseTaskCard.scss';

interface ChoosableTaskCardProps {
    object: Task;
    navigationPath: string;
}

const ChoosableTaskCard: FC<ChoosableTaskCardProps> = ({ object, navigationPath }) => {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        console.log("Navigating to" + navigationPath + "with state:", object);
        navigate(navigationPath, { state: { selectedTask: object } });
    };


    return (
        <div className='task-card' onClick={handleClick}>
            <div className='card-header'>
                <div className='title'>{object.name}</div>
            </div>
            <div className='task-card-content'>
                <div className='sections'>
                    <div className='section-title'>{object.description}</div>
                </div>
            </div>
        </div>
    );
}


export default ChoosableTaskCard;
