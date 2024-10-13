import { FC, useEffect, useState } from "react";
import { taskAPI } from "../../../../../redux/services/TaskApi";
import ChoosableTaskCard from "./ChooseTaskCard";
import HomePage from "../../../../components/Common/HomePage/HomePage";
import { Task } from "../../../../../redux/models/Interfaces";
import { useDispatch } from "react-redux";
import { setIsCreateGame } from "../../../../../redux/slices/GlobalStates";
import Loader from "../../../../components/Common/LoadingSpinner/Loader";

interface ChoosableTasksPageProps {
  fromParent: string;
}

const ChoosableTasksPage: FC<ChoosableTasksPageProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsCreateGame(true));
    const fetchTasks = async () => {
      setIsLoading(true);
      setLoadingMessage("טוען משימות...");

      try {
        const fetchedTasks = await taskAPI.getAllTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setLoadingMessage("שגיאה בטעינת משימות");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [dispatch]);

  return (
    <div dir="rtl">
      <Loader isLoading={isLoading} message={loadingMessage} />

      <HomePage
        objects={tasks}
        page="ChooseTask"
        Component={(props) => (
          <ChoosableTaskCard
            {...props}
            navigationPath={"/TaskDetailsAddGame"}
          />
        )}
        addButton="הוספת משימה חדשה"
        addButtonPath="addTask"
        setCardOnClick={false}
      />
    </div>
  );
};

export default ChoosableTasksPage;
