import { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../../../../redux/store";
import { gameAPI } from "../../../../redux/services/GameApi";
import { Game, Unit } from "../../../../redux/models/Interfaces";
import Loader from "../../../components/Common/LoadingSpinner/Loader";
import { setCard } from "../../../../redux/slices/GlobalStates";
import "./EditGame.scss";

const EditGameHebrew = {
  EditGame: "עריכת משחק",
  Name: "שם המשחק:",
  Description: "תיאור:",
  Save: "שמירה",
  ViewUnits: "עריכת חוליות",
  NoUnits: "עדיין אין חוליות",
};

interface LocationState {
  updatedGame?: Game;
}

const EditGame: FC = () => {
  const game = useSelector(
    (state: RootState) => state.globalStates.selectedCard
  ) as Game;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;

  const [gameName, setGameName] = useState(game.gameName);
  const [gameDescription, setGameDescription] = useState(
    game.description || ""
  );
  const [units, setUnits] = useState<Unit[]>(game.units || []);
  const [deletedUnits, setDeletedUnits] = useState<number[]>([]);
  const [addedUnits, setAddedUnits] = useState<Unit[]>([]);
  const [updatedUnits, setUpdatedUnits] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    clearLocalStorage();
    const updatedGame = locationState?.updatedGame;
    if (updatedGame) {
      setGameName(updatedGame.gameName);
      setGameDescription(updatedGame.description || "");

      const originalUnits = new Set(game.units?.map((u) => u.unitID) || []);
      const newUnits = updatedGame.units || [];

      const added = newUnits.filter((u) => !originalUnits.has(u.unitID));
      const deleted = (game.units || [])
        .filter((u) => !newUnits.some((nu) => nu.unitID === u.unitID))
        .map((u) => u.unitID);
      const updated = newUnits.filter((u) => originalUnits.has(u.unitID));

      setUnits(newUnits);
      setAddedUnits(added);
      setDeletedUnits(deleted);
      setUpdatedUnits(updated);

      dispatch(setCard(updatedGame));
    }
  }, [locationState, dispatch, game.units]);

  const clearLocalStorage = () => {
    localStorage.removeItem("addUnitName");
    localStorage.removeItem("addUnitDescription");
    localStorage.removeItem("addUnitHint");
    localStorage.removeItem("selectedTask");
    localStorage.removeItem("selectedLocation");
    localStorage.removeItem("selectedObject");
    localStorage.removeItem("gameName");
    localStorage.removeItem("gameDesc");
    localStorage.removeItem("units");
  };

  const handleEditUnits = () => {
    dispatch(
      setCard({
        ...game,
        gameName,
        description: gameDescription,
        units,
      })
    );
    navigate("/EditGameUnitsPage", {
      state: {
        game: {
          ...game,
          gameName,
          description: gameDescription,
          units,
        },
      },
    });
  };

  const handleSubmit = async () => {
    if (gameName && !gameName.trim()) {
      alert("שם המשחק לא יכול להיות ריק");
      return;
    }
    setIsLoading(true);
    setLoadingMessage("מעדכן משחק...");
    try {
      const updatedGameData: Partial<Game> = {
        ...game,
        gameName,
        description: gameDescription,
      };

      const response = await gameAPI.updateGame(
        game.gameID as number,
        updatedGameData as Game,
        updatedUnits,
        deletedUnits,
        addedUnits
      );

      if (response.status === 200) {
        const updatedGame: Game = {
          ...game,
          gameName,
          description: gameDescription,
          units: units,
        };
        dispatch(setCard(updatedGame));
        alert("משחק עודכן בהצלחה");
        navigate("/Games");
      } else {
        throw new Error("Failed to update game");
      }
    } catch (error) {
      console.error("Failed to update game:", error);
      alert("עדכון משחק נכשל");
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  return (
    <div className="edit-game" dir="rtl">
      <Loader isLoading={isLoading} message={loadingMessage} />
      <div className="overlay" />
      <div className="game-form-container">
        <h2 className="form-title">{EditGameHebrew.EditGame}</h2>
        <div className="form-group">
          <label className="form-label">{EditGameHebrew.Name}</label>
          <div className="input-wrapper">
            <input
              className="game-input"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">{EditGameHebrew.Description}</label>
          <div className="input-wrapper">
            <textarea
              className="game-textarea"
              value={gameDescription}
              onChange={(e) => setGameDescription(e.target.value)}
            />
          </div>
        </div>
        {units.length === 0 ? (
          <div className="no-units">{EditGameHebrew.NoUnits}</div>
        ) : (
          <button className="edit-units" onClick={handleEditUnits}>
            {EditGameHebrew.ViewUnits}
          </button>
        )}
        <div className="form-buttons">
          <button onClick={handleSubmit} className="update-button">
            {EditGameHebrew.Save}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGame;
