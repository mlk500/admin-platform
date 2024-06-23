import { FC, useEffect, useState } from "react";
import TaskCard from "./TaskCard/TaskCard";
import "./TasksPage.scss";
import HomePage from "../../components/Common/HomePage/HomePage";
import { taskAPI } from "../../../redux/services/TaskApi";
import { useDispatch } from "react-redux";
import { setTasks } from "../../../redux/slices/saveAllData";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ConfirmationDialog from '../../components/Common/ConfirmationDialog/ConfirmationDialog';
import { Admin, Task, UserRole } from '../../../redux/models/Interfaces';
import { setCard } from '../../../redux/slices/GlobalStates';
import { useNavigate } from "react-router-dom";

const TasksPage: FC = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.AllData.Tasks);
    const [showConfirm, setShowConfirm] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
    const adminStr = localStorage.getItem('admin');
    const currAdmin: Admin = adminStr ? { ...JSON.parse(adminStr), role: UserRole[JSON.parse(adminStr).role as keyof typeof UserRole] } : null;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            dispatch(setTasks(await taskAPI.getAllTasks()));
        };
        fetchTasks();
    }, [dispatch]);

    const handleDelete = (task: Task) => {
        if (currAdmin.adminID !== task.adminIDAPI && currAdmin.role !== UserRole.MainAdmin) {
            alert("אי אפשר למחוק משימה שלא שייכת למחלקה שלך");
        } else {
            setTaskToDelete(task);
            setShowConfirm(true);
        }
    };

    const handleDeleteConfirm = async () => {
        if (taskToDelete) {
            try {
                const response = await taskAPI.deleteTask(taskToDelete.taskID);
                if (response.status == 200) {

                    alert("Task was deleted successfully");
                    setShowConfirm(false);
                    const updatedTasks = await taskAPI.getAllTasks();
                    dispatch(setTasks(updatedTasks));
                }
                else {
                    const errorMessage = response.statusText;
                    if (errorMessage.includes("Task is part of an existing game")) {
                        alert("המשימה היא חלק ממשחק קיים, נא לעדכן משחק ואז למחוק המשימה");
                    } else {
                        alert(`Failed to delete task: ${errorMessage}`);
                    }
                }
            } catch (error) {
                console.error('Failed to delete task:', error);
            }
        }
    };

    const handleEdit = (task: Task) => {
        if (currAdmin.adminID !== task.adminIDAPI && currAdmin.role !== UserRole.MainAdmin) {
            alert("אי אפשר לערוך משימה שלא שייכת למחלקה שלך");
        } else {
            dispatch(setCard(task));
            navigate('/EditTask');
        }
    };

    return (
        <>
            <HomePage
                objects={tasks}
                page="Task"
                Component={(props) => (
                    <TaskCard {...props}
                        onShowConfirm={handleDelete}
                        onEditTask={handleEdit}
                    />
                )}
                addButton="הוספת משימה חדשה"
                addButtonPath="addTask"
            />
            {showConfirm && (
                <ConfirmationDialog
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setShowConfirm(false)}
                    message={`Are you sure you want to delete the task "${taskToDelete?.name}"?`}
                />
            )}
        </>
    );
};

export default TasksPage;
