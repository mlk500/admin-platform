import { FC, useEffect, useState } from "react";
import { taskAPI } from "../../../../../redux/services/TaskApi";
import ChoosableTaskCard from "./ChooseTaskCard";
import HomePage from "../../../../components/Common/HomePage/HomePage";
import { Task } from "../../../../../redux/models/Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

interface ChoosableTasksPageProps {
  fromParent: string;
}

const ChoosableTasksPage: FC<ChoosableTasksPageProps> = ({ }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const isEditing = useSelector(
    (state: RootState) => state.globalStates.isEditing
  ); // Access isEditing from global state
  console.log(isEditing)
  useEffect(() => {
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
