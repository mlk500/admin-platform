import { FC, useEffect } from "react";
import TaskCard from "./TaskCard/TaskCard";
import "./TasksPage.scss";
import HomePage from "../../components/Common/HomePage/HomePage";
import { taskAPI } from "../../../redux/services/TaskApi";
import { useDispatch } from "react-redux";
import { setTasks } from "../../../redux/slices/saveAllData";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const TasksPage: FC = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.AllData.Tasks);

    useEffect(() => {
        const fetchTasks = async () => {
            dispatch(setTasks(await taskAPI.getAllTasks()))
        };
        fetchTasks()

    }, []);

    return (
        <>
            {<HomePage objects={tasks} page="Task" Component={TaskCard} addButton="הוספת משימה חדשה" addButtonPath="addTask" />}
        </>
    );
};

export default TasksPage;
