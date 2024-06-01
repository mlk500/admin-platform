import React, { useEffect, useState } from 'react';
import './EditTask.scss';
import { LeftArrowIcon, UploadFileIcon } from '../../../photos';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { MediaTask, Task } from '../../../../redux/models/Interfaces';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../../../../redux/services/TaskApi';
import { SwiperConfig } from '../../../components';
import PDFViewer from '../../../components/Common/PDFViewer/PDFViewer';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ReactPlayer from 'react-player';

interface FileWithPreview extends File {
    preview: string;
}

const AddNewTaskHebrew = {
    CreateNewTask: 'עריכת משימה ',
    Name: 'שם : ',
    Description: 'תיאור : ',
    AddMedia: 'הוספת מדיה : ',
    Q: 'שאלה : ',
    AdditionalNotes: 'הוספת טקסט',
    ToggleMedia: 'הוספת מדיה',
    ToggleQuestion: 'הוספת שאלה',
    ToggleNotes: 'הוספת טקסט',
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
    NoMedia: 'אין מדיה למשימה הזאת'
};

function EditTask() {
    const task = useSelector((state: RootState) => state.globalStates.selectedCard) as Task;
    const [taskName, setTaskName] = useState<string>(task.name);
    const [description, setDescription] = useState<string>(task.description);
    const [question, setQuestion] = useState<string>(task.questionTask?.question || '');
    const [answers, setAnswers] = useState<string[]>(task.questionTask ? task.questionTask.answers : []);
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(task.questionTask ? task.questionTask.correctAnswer : null);
    const [additionalNotes, setAdditionalNotes] = useState<string>(task.taskFreeTexts?.[0] || '');
    const [showMedia, setShowMedia] = useState<boolean>(!!task.mediaList?.length);
    const [showQuestion, setShowQuestion] = useState<boolean>(!!task.questionTask);
    const [showNotes, setShowNotes] = useState<boolean>(!!task.taskFreeTexts?.length);
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [existingMediaTasks, setExistingMediaTasks] = useState<MediaTask[]>(task.mediaList || []);
    const [existingMediaPreviews, setExistingMediaPreviews] = useState<FileWithPreview[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const urlToFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], filename, { type: mimeType });
    };

    useEffect(() => {
        const fetchExistingMediaFiles = async () => {
            const toFiles = await Promise.all(
                (task.mediaList || []).map(async (media) => {
                    const file = await urlToFile(media.mediaPath, media.fileName, media.mediaType);
                    return {
                        ...file,
                        preview: URL.createObjectURL(file),
                    } as File;
                })
            );
            const filesWithPreview = await Promise.all(
                (task.mediaList || []).map(async (media) => {
                    const file = await urlToFile(media.mediaPath, media.fileName, media.mediaType);
                    return {
                        ...file,
                        preview: URL.createObjectURL(file),
                    } as FileWithPreview;
                })
            );
            setMediaFiles(toFiles);
            setExistingMediaPreviews(filesWithPreview);
        };

        if (task) {
            setAnswers(task.questionTask ? task.questionTask.answers : []);
            setCorrectAnswer(task.questionTask ? task.questionTask.correctAnswer : null);
            setAdditionalNotes(task.taskFreeTexts?.[0] || '');
            setExistingMediaTasks(task.mediaList || []);
            fetchExistingMediaFiles();
        }
    }, [task]);






    const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            const filesWithPreview = newFiles.map(file => ({
                ...file,
                preview: URL.createObjectURL(file),
            } as FileWithPreview));
            setMediaFiles(prevFiles => [...prevFiles, ...newFiles]);
            setExistingMediaPreviews(prevPreviews => [...prevPreviews, ...filesWithPreview]);
        }
    };


    const handleSubmit = async () => {
        if (!taskName.trim()) {
            alert('A task must have a name.');
            return;
        }
        if (!showQuestion && mediaFiles.length === 0 && existingMediaTasks.length === 0 && !additionalNotes.trim()) {
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
                        taskFreeTexts: additionalNotes ? [additionalNotes] : []
                    })
                ],
                { type: 'application/json' }
            )
        );

        if (showQuestion && task.questionTask) {
            formData.append(
                'question',
                new Blob(
                    [
                        JSON.stringify({
                            questionTaskID: task.questionTask.questionTaskID,
                            question,
                            answers,
                            correctAnswer,
                            taskID: task.taskID
                        })
                    ],
                    { type: 'application/json' }
                )
            );
        }

        mediaFiles.forEach((file) => {
            formData.append('media', file);
        });

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
                                {existingMediaPreviews.length > 0 ? (
                                    <Swiper {...SwiperConfig('horizontal')}>
                                        {existingMediaPreviews.map((media, index) => (
                                            <SwiperSlide key={index} className='swiper-slide'>
                                                {media.type?.includes('application/pdf') ? (
                                                    <PDFViewer fileUrl={media.preview} />
                                                ) : media.type?.includes('audio') ? (
                                                    <div dir='ltr'>
                                                        <AudioPlayer autoPlay={false} src={media.preview} onPlay={e => console.log('Playing audio', e)} />
                                                    </div>
                                                ) : media.type?.includes('video') ? (
                                                    <ReactPlayer url={media.preview} controls className='react-player' width='100%' height='100%' />
                                                ) : (
                                                    <img className='img-media' src={media.preview} alt={`Uploaded ${index}`} />
                                                )}
                                                <button
                                                    className='delete-image-btn'
                                                    onClick={() => {
                                                        setExistingMediaPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
                                                        if (index < existingMediaTasks.length) {
                                                            setExistingMediaTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
                                                        } else {
                                                            setMediaFiles(prevFiles => prevFiles.filter((_, i) => i !== (index - existingMediaTasks.length)));
                                                            URL.revokeObjectURL(media.preview);
                                                        }
                                                    }}
                                                >
                                                    {AddNewTaskHebrew.Delete_Media}
                                                </button>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                ) : (
                                    <div>{AddNewTaskHebrew.NoMedia}</div>
                                )}
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
                                <button type='button' className='delete-option-button' onClick={() => setShowQuestion(false)}>
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
                            <button type='button' className='option-button' onClick={() => setShowMedia(true)}>
                                {AddNewTaskHebrew.ToggleMedia}
                            </button>
                            <button type='button' className='option-button' onClick={() => setShowQuestion(true)}>
                                {AddNewTaskHebrew.ToggleQuestion}
                            </button>
                            <button type='button' className='option-button' onClick={() => setShowNotes(true)}>
                                {AddNewTaskHebrew.ToggleNotes}
                            </button>
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
