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

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    dispatch(setTaskAddGame(object));

    navigate(navigationPath, { state: { selectedTask: object } });
  };

  return (
    <div className="task-card-file" onClick={handleClick}>
      <div className="card-header-file">
        <div className="title-file">{object.name}</div>
      </div>
      <div className="task-card-content-file">
        <div className="sections-file">
          {object.description && (
            <div className="section-title-file">{object.description}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChoosableTaskCard;
