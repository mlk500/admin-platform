import { FC, useEffect } from "react";
import GameCard from "./GameCard/GameCard";
import "./GamesPage.scss";
import HomePage from "../../components/Common/HomePage/HomePage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { setGames } from "../../../redux/slices/saveAllData";
import { gameAPI } from "../../../redux/services/GameApi";
import { setPage } from "../../../redux/slices/GlobalStates";
import { buttonsName } from "../../../redux/models/Types";

const GamesPage: FC = () => {
    const dispatch = useDispatch();
    const games = useSelector((state: RootState) => state.AllData.Games);
    const page = useSelector((state: RootState) => state.globalStates.page);

    useEffect(() => {
        const fetchGames = async () => {
            dispatch(setGames(await gameAPI.getAllGames()))
            dispatch(setPage(buttonsName.Games))
            console.log("page in gms " + page)

        };
        fetchGames()

    }, [dispatch]);

    // useEffect(() => {
    //     console.log("Updated page in games: " + page);
    //     dispatch(setPage(buttonsName.Games))
    //     console.log("Updated page in games: after  " + page)
    // }, [page]);


    return (
        <HomePage objects={games} page="Game" Component={GameCard}
            addButton="הוספת משחק חדש" addButtonPath="AddGame" />
    );
};

export default GamesPage;
