import { FC } from "react";
import { Task } from "../../../../../redux/models/Interfaces";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { setTaskAddGame } from "../../../../../redux/slices/GlobalStates";
import "./ChooseTaskCard.scss";

interface ChoosableTaskCardProps {
  object: Task;
  navigationPath: string;
  onShowConfirm: (task: Task) => void;
  onEditTask: (task: Task) => void;
}

const ChoosableTaskCard: FC<ChoosableTaskCardProps> = ({
  object,
  navigationPath,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditing = useSelector(
    (state: RootState) => state.globalStates.isEditing
  );
  console.log(isEditing, " nav path ", navigationPath);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    dispatch(setTaskAddGame(object));

    navigate(navigationPath, { state: { selectedTask: object } });
  };

  return (
    <div className="choosable-task-card" onClick={handleClick}>
      <div className="card-header-choosable-task">
        <div className="title-choosable-task">{object.name}</div>
      </div>
      <div className="choosable-task-card-content">
        <div className="sections-choosable-task">
          {object.description && (
            <div className="section-title-choosable-task">
              {object.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChoosableTaskCard;
