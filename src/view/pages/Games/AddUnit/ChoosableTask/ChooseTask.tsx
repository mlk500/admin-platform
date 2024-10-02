import { FC, useEffect, useState } from "react";
import { taskAPI } from "../../../../../redux/services/TaskApi";
import ChoosableTaskCard from "./ChooseTaskCard";
import HomePage from "../../../../components/Common/HomePage/HomePage";
import { Task } from "../../../../../redux/models/Interfaces";
import { useDispatch } from "react-redux";
import { setIsCreateGame } from "../../../../../redux/slices/GlobalStates";

interface ChoosableTasksPageProps {
  fromParent: string;
}

const ChoosableTasksPage: FC<ChoosableTasksPageProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsCreateGame(true));
    const fetchTasks = async () => {
      const fetchedTasks = await taskAPI.getAllTasks();
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, []);

  return (
    <HomePage
      objects={tasks}
      page="ChooseTask"
      Component={(props) => (
        <ChoosableTaskCard {...props} navigationPath={"/TaskDetailsAddGame"} />
      )}
      addButton="הוספת משימה חדשה"
      addButtonPath="addTask"
      setCardOnClick={false}
    />
  );
};

export default ChoosableTasksPage;
