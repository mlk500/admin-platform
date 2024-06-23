import { FC, useEffect } from "react";
import LocationCard from "./LocationCard/LocationCard";
import "./LocationPage.scss";
import HomePage from "../../components/Common/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { locationAPI } from "../../../redux/services/LocationApi";
import { useDispatch } from "react-redux";
import { setLocations } from "../../../redux/slices/saveAllData";
// import { Locations } from "../../../data/Locations";

const LocationsPage: FC = () => {
    // const page = useSelector((state: RootState) => state.globalStates.page);
    const dispatch = useDispatch();
    const locations = useSelector((state: RootState) => state.AllData.locations);

    useEffect(() => {
        const fetchLocations = async () => {
            dispatch(setLocations(await locationAPI.getAllLocations()));
        };
        fetchLocations()

    }, []);

    return (
        <>
            {<HomePage objects={locations} page="Location" Component={LocationCard} addButton="הוספת חדר חדש" addButtonPath="AddLocation" />}
        </>
    );
};

export default LocationsPage;
