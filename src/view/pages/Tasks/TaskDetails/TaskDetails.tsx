import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import './TaskDetails.scss';
import { Task } from '../../../../redux/models/Interfaces';
import { LeftArrowIcon } from '../../../photos';
import MediaViewer from '../../../components/Common/MediaViewer/MediaViewer';

const TaskDetailsHebrew = {
    Description: "תיאור : ",
    FreeText: "טקסט חופשי :",
    Q: "שאלה : ",
    Media: "מדיה :",
    answers: "תשובות :",
    sector: "מחלקה",
    withMsg: "הצגת הודעת הצלחה",
    noMsg: "ללא הצגת הודעת הצלחה"
};

const TaskDetails: React.FC = () => {
    const task: Task = useSelector((state: RootState) => state.globalStates.selectedCard);
    const sectors = useSelector((state: RootState) => state.AllData.Sectors);
    const sectorName = sectors.find(sector => sector.adminID === task.adminIDAPI)?.sector;

    return (
        <div className='task-container' dir='rtl' style={{ background: "" }}>
            <div className='add-task-header'>
                <div className='sector-name'>{sectorName}</div>
                <div className='arrow-icon'><img className='arrow-icon' src={LeftArrowIcon} alt="arrow" /></div>
            </div>
            <div className='task-details'>
                <div className='task-title'>{task.name}</div>
                {task.description && (
                    <div className='section-title'>{TaskDetailsHebrew.Description}</div>
                )}
                <div className='task-desc'>{task.description}</div>
                <div className='task-content'>
                    {task.taskFreeTexts && (
                        <div className='task-free-text'>
                            <div className='section-title'>{TaskDetailsHebrew.FreeText}</div>
                            {task.taskFreeTexts.map((text: string, index: number) => (
                                <div className='text-free' key={index}>{text}</div>
                            ))}
                        </div>
                    )}
                    <div className='task-ques'>
                        {task.questionTask && (
                            <div className='question-section'>
                                <div className='q-head'>
                                    <div className='section-title'>{TaskDetailsHebrew.Q}</div>
                                    <div className='q-task-text'>{task.questionTask.question}</div>
                                </div>
                                <div className='section-title'>{TaskDetailsHebrew.answers}</div>
                                <div className='answers'>
                                    {task.questionTask.answers.map((answer: string, index: number) => (
                                        <div key={index} className={index === task?.questionTask?.correctAnswer ? 'correct-answer' : ''}>
                                            {answer}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {task.mediaList && task.mediaList.length !== 0 && (
                        <div className='task-media-list'>
                            <div className='section-title'>{TaskDetailsHebrew.Media}</div>
                            <MediaViewer mediaList={task.mediaList || []} />
                        </div>
                    )}
                </div>
                {task.withMsg ? (
                    <div className='section-title'>
                        {TaskDetailsHebrew.withMsg}
                    </div>
                ) : (
                    <div className='section-title'>
                        {TaskDetailsHebrew.noMsg}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskDetails;
