import React, { useEffect, useState } from 'react';
import './EditTask.scss';
import { LeftArrowIcon, UploadFileIcon } from '../../../photos';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { MediaTask, Task } from '../../../../redux/models/Interfaces';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../../../../redux/services/TaskApi';
import MediaViewer from '../../../components/Common/MediaViewer/MediaViewer';

const AddNewTaskHebrew = {
    CreateNewTask: 'עריכת משימה ',
    Name: 'שם : ',
    Description: 'תיאור : ',
    AddMedia: 'הוספת מדיה : ',
    Q: 'שאלה : ',
    AdditionalNotes: 'הוספת טקסט',
    ToggleOnMedia: 'הצג מדיה',
    ToggleOnQuestion: 'הצג שאלה',
    ToggleOnNotes: 'הצג טקסט',
    ToggleOffMedia: 'הסתר מדיה',
    ToggleOffQuestion: 'הסתר שאלה',
    ToggleOffNotes: 'הסתר טקסט',
    Save: 'שמירה',
    HideQuestion: 'מחיקת שאלה',
    UploadFile: 'הורדת קובץ',
    HideMedia: 'מחיקת מדיה',
    DeleteAnswer: 'מחיקת תשובה',
    Answer: 'תשובה',
    HideNotes: 'מחיקת הטקסט',
    AddAnswer: 'הוספת תשובה',
    FreeText: 'טקסט חופשי :',
    Media: 'מדיה :',
    answers: 'תשובות :',
    Delete_Media: 'מחיקת תוכן',
    NoMedia: 'אין מדיה למשימה הזאת',
    Sectors: "בחירת מחלקה",
    WithMsg: "הצגת הודעת הצלחה ",
};

function EditTask() {
    const task = useSelector((state: RootState) => state.globalStates.selectedCard) as Task;
    const [taskName, setTaskName] = useState<string>(task.name);
    const [description, setDescription] = useState<string>(task?.description || '');
    const [question, setQuestion] = useState<string>(task.questionTask?.question || '');
    const [answers, setAnswers] = useState<string[]>(task.questionTask ? task.questionTask.answers : []);
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(task.questionTask ? task.questionTask.correctAnswer : null);
    const [additionalNotes, setAdditionalNotes] = useState<string>(task.taskFreeTexts?.[0] || '');
    const [showMedia, setShowMedia] = useState<boolean>(!!task.mediaList?.length);
    const [showQuestion, setShowQuestion] = useState<boolean>(!!task.questionTask);
    const [showNotes, setShowNotes] = useState<boolean>(!!task.taskFreeTexts?.length);
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [existingMediaTasks, setExistingMediaTasks] = useState<MediaTask[]>(task.mediaList || []);
    const [keptMediaTasks, setKeptMediaTasks] = useState<MediaTask[]>(task.mediaList || []);
    const [newMediaTasks, setNewMediaTasks] = useState<MediaTask[]>([]);
    const [deletedMediaIds, setDeletedMediaIds] = useState<number[]>([]);
    const [deletedQuestionId, setDeletedQuestionId] = useState<number | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sectors = useSelector((state: RootState) => state.AllData.Sectors);
    const [selectedSector, setSelectedSector] = useState<number | null>(task.adminIDAPI || null);
    const [, setSelectedSectorName] = useState<string>('');
    const [withMsg, setWithMsg] = useState<boolean>(task.withMsg);

    useEffect(() => {
        if (selectedSector !== null) {
            const sector = sectors.find(sector => sector.adminID === selectedSector)?.sector;
            setSelectedSectorName(sector || '');
        }
    }, [selectedSector, sectors]);

    const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            setMediaFiles(prevFiles => [...prevFiles, ...newFiles]);
            const newMediaTasks = newFiles.map((file) => ({
                mediaTaskID: Math.random(),
                fileName: file.name,
                mediaPath: URL.createObjectURL(file),
                mediaType: file.type,
                taskID: task.taskID
            }));
            setExistingMediaTasks(prevTasks => [...prevTasks, ...newMediaTasks]);
            setNewMediaTasks(prevTasks => [...prevTasks, ...newMediaTasks]);
        }
    };

    const handleDeleteMedia = (index: number) => {
        const mediaTaskId = existingMediaTasks[index].mediaTaskID;
        setKeptMediaTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
        setExistingMediaTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
        setNewMediaTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
        setDeletedMediaIds(prevIds => [...prevIds, mediaTaskId]);
        URL.revokeObjectURL(existingMediaTasks[index].mediaPath);
    };

    const handleDeleteQuestion = () => {
        if (task.questionTask) {
            setDeletedQuestionId(task.questionTask.questionTaskID);
            setShowQuestion(false);
        }
    };

    const handleSubmit = async () => {
        if (!taskName.trim()) {
            alert('A task must have a name.');
            return;
        }
        if (!showQuestion && mediaFiles.length === 0 && keptMediaTasks.length === 0 && !additionalNotes.trim()) {
            alert('A task must have at least one element (question, media, or notes).');
            return;
        }

        const formData = new FormData();
        formData.append(
            'task',
            new Blob(
                [
                    JSON.stringify({
                        taskID: task.taskID,
                        name: taskName,
                        description,
                        taskFreeTexts: additionalNotes ? [additionalNotes] : [],
                        withMsg,
                    })
                ],
                { type: 'application/json' }
            )
        );

        formData.append('admin', sectors.find(sector => sector.adminID === selectedSector)?.sector || '');
        if (showQuestion && task.questionTask) {
            const questionTask = {
                questionTaskID: task.questionTask.questionTaskID,
                question,
                answers,
                correctAnswer,
                taskID: task.taskID
            };
            formData.append(
                'question',
                new Blob(
                    [JSON.stringify(questionTask)],
                    { type: 'application/json' }
                )
            );
        }

        if (deletedQuestionId !== null) {
            formData.append('tbdQuestion', new Blob([JSON.stringify(deletedQuestionId)], { type: 'application/json' }));
        }

        mediaFiles.forEach((file) => {
            formData.append('media', file);
        });

        formData.append('toBeDeleted', new Blob([JSON.stringify(deletedMediaIds)], { type: 'application/json' }));

        try {
            const updatedTask = await taskAPI.updateTask(task.taskID, formData);
            dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: updatedTask });
            navigate('/Tasks');
            alert('Task updated successfully!');
        } catch (error) {
            console.error('Failed to update task:', error);
            alert('Failed to update the task.');
        }
    };

    return (
        <div className='main-container-edit-task'>
            <div className='edit-task-header'>
                <div className='arrow-icon'>
                    <img className='arrow-icon' src={LeftArrowIcon} alt='arrow' />
                </div>
                <div className='sector-name'>פיזוטרפיה</div>
            </div>
            <div className='edit-task-container' dir='rtl'>
                <div className='edit-task-title'>{AddNewTaskHebrew.CreateNewTask}</div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewTaskHebrew.Name}</label>
                    <input type='text' className='task-input' value={taskName} onChange={e => setTaskName(e.target.value)} />
                </div>
                <div className='input-group'>
                    <label className='input-label'>{AddNewTaskHebrew.Description}</label>
                    <textarea className='task-textarea' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className='options-container'>
                    <div className='option-section'>
                        {showMedia && (
                            <div className='input-group'>
                                <label className='input-label'>{AddNewTaskHebrew.AddMedia}</label>
                                <input
                                    type='file'
                                    multiple
                                    accept='image/*, video/*, application/pdf, audio/*'
                                    id='file-upload'
                                    className='file-input'
                                    onChange={handleMediaChange}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor='file-upload' className='file-upload-label'>
                                    <img src={UploadFileIcon} alt='Upload File' className='file-upload-icon' />
                                </label>
                                <MediaViewer mediaList={[...keptMediaTasks, ...newMediaTasks]}
                                    onDelete={handleDeleteMedia}
                                    deletable={true}
                                />
                                <button type='button' className='delete-option-button' onClick={() => setShowMedia(false)}>
                                    {AddNewTaskHebrew.HideMedia}
                                </button>
                            </div>
                        )}

                        {showQuestion && (
                            <div className='input-group'>
                                <label className='input-label'>{AddNewTaskHebrew.Q}</label>
                                <input type='text' className='task-input' placeholder='הוספת שאלה' value={question} onChange={e => setQuestion(e.target.value)} />
                                {answers.map((answer, index) => (
                                    <div key={index} className='answer-container'>
                                        <input
                                            type='text'
                                            className='task-input'
                                            value={answer}
                                            onChange={e => {
                                                const newAnswers = [...answers];
                                                newAnswers[index] = e.target.value;
                                                setAnswers(newAnswers);
                                            }}
                                            placeholder={`${AddNewTaskHebrew.Answer} ${index + 1}`}
                                        />
                                        <input type='radio' name='correctAnswer' checked={correctAnswer === index} onChange={() => setCorrectAnswer(index)} />
                                        <button
                                            type='button'
                                            className='delete-answer-button'
                                            onClick={() => {
                                                const newAnswers = answers.filter((_, i) => i !== index);
                                                setAnswers(newAnswers);
                                                if (correctAnswer === index) {
                                                    setCorrectAnswer(null);
                                                } else if (correctAnswer !== null && index < correctAnswer) {
                                                    setCorrectAnswer(correctAnswer - 1);
                                                }
                                            }}
                                        >
                                            {AddNewTaskHebrew.DeleteAnswer}
                                        </button>
                                    </div>
                                ))}
                                {answers.length < 4 && (
                                    <button type='button' className='edit-answer-button' onClick={() => setAnswers([...answers, ''])}>
                                        {AddNewTaskHebrew.AddAnswer}
                                    </button>
                                )}
                                <button type='button' className='delete-option-button' onClick={handleDeleteQuestion}>
                                    {AddNewTaskHebrew.HideQuestion}
                                </button>
                            </div>
                        )}

                        {showNotes && (
                            <div className='input-group'>
                                <label className='input-label'>{AddNewTaskHebrew.AdditionalNotes}</label>
                                <textarea className='task-textarea' value={additionalNotes} onChange={e => setAdditionalNotes(e.target.value)}></textarea>
                                <button type='button' className='delete-option-button' onClick={() => setShowNotes(false)}>
                                    {AddNewTaskHebrew.HideNotes}
                                </button>
                            </div>
                        )}

                        <div className='edit-buttons'>
                            <button type='button' className='option-button' onClick={() => setShowMedia(!showMedia)}>
                                {showMedia ? AddNewTaskHebrew.ToggleOffMedia : AddNewTaskHebrew.ToggleOnMedia}
                            </button>

                            <button type='button' className='option-button' onClick={() => setShowQuestion(!showQuestion)}>
                                {showQuestion ? AddNewTaskHebrew.ToggleOffQuestion : AddNewTaskHebrew.ToggleOnQuestion}
                            </button>

                            <button type='button' className='option-button' onClick={() => setShowNotes(!showNotes)}>
                                {showNotes ? AddNewTaskHebrew.ToggleOffNotes : AddNewTaskHebrew.ToggleOnNotes}
                            </button>

                        </div>
                        <div className='input-group'>
                            <label className='input-label'>{AddNewTaskHebrew.Sectors}</label>
                            <select value={selectedSector ?? ''} onChange={(e) => setSelectedSector(Number(e.target.value))} className='task-input'>
                                <option value='' disabled hidden>{AddNewTaskHebrew.Sectors}</option>
                                {sectors.map((sector, index) => (
                                    <option key={index} value={sector.adminID}>{sector.sector}</option>
                                ))}
                            </select>
                        </div>

                        <div className='input-group'>
                            <label className='input-label'>
                                <input type="checkbox" checked={withMsg} onChange={(e) => setWithMsg(e.target.checked)} />
                                {AddNewTaskHebrew.WithMsg}
                            </label>
                        </div>
                    </div>
                </div>

                <button className='save-task-button' onClick={handleSubmit}>
                    {AddNewTaskHebrew.Save}
                </button>
            </div>
        </div>
    );
}

export default EditTask;
