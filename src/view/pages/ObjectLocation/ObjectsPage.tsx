import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import HomePage from "../../components/Common/HomePage/HomePage";
import ObjectsCard from './ObjectsCard/ObjectsCard';
import { ObjectLocation } from '../../../redux/models/Interfaces';
import ObjectCard from './ObjectCard/ObjectCard';
import './ObjectsPage.scss';
import { setLocations } from '../../../redux/slices/saveAllData';
import { locationAPI } from '../../../redux/services/LocationApi';


const ObjectsPage: FC = () => {
    const location = useSelector((state: RootState) => state.globalStates.selectedCard);
    const dispatch = useDispatch();
    const page = useSelector((state: RootState) => state.globalStates.page);

    useEffect(() => {
        const fetchLocations = async () => {
            dispatch(setLocations(await locationAPI.getAllLocations()));
        };
        fetchLocations()

    }, []);

    return (
        <div>
            {page == "Location" && <HomePage objects={location.objectsList}
                {...location.objectsList.map((obj: ObjectLocation) => (
                    <ObjectCard key={obj.objectID} object={obj} />
                ))}
                page="Object" Component={ObjectsCard} addButton="הוספת אובייקט חדש" addButtonPath="AddObjectLocation" />}
        </div>
    );
};

export default ObjectsPage;
