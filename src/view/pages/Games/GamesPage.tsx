import { FC, useEffect, useState } from "react";
import GameCard from "./GameCard/GameCard";
import "./GamesPage.scss";
import HomePage from "../../components/Common/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Game } from "../../../redux/models/Interfaces";
import { gameAPI } from "../../../redux/services/GameApi";

const GamesPage: FC = () => {
    const page = useSelector((state: RootState) => state.globalStates.page);

    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const fetchedTasks = await gameAPI.getAllGames();
            setGames(fetchedTasks);
        };
        fetchTasks()

    }, []);

    return (
        <>
            {console.log("page :", page)}
            {page == "Games" && <HomePage objects={games} page="Game" Component={GameCard}
                addButton="הוספת משחק חדש" addButtonPath="AddGame" />}
        </>
    );
};

export default GamesPage;
