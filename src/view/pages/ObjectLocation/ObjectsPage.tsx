import { FC } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import HomePage from "../../components/Common/HomePage/HomePage";
import ObjectsCard from './ObjectsCard/ObjectsCard';
import './ObjectsPage.scss';


const ObjectsPage: FC = () => {
    // const location = useSelector((state: RootState) => state.globalStates.selectedCard);
    // const dispatch = useDispatch();
    const objects = useSelector((state: RootState) => state.AllData.Objects);


    // useEffect(() => {
    //     const getObjects = async () => {
    //         dispatch(setObjects(location.objectsList));
    //         console.log("objects in obj " + objects)
    //         console.log("loc in obj " + location)
    //     };
    //     getObjects()

    // }, [dispatch]);

    return (
        <div>
            {<HomePage objects={objects}
                // {...location.objectsList.map((obj: ObjectLocation) => (
                //     <ObjectCard key={obj.objectID} object={obj} />
                // ))}
                page="Object" Component={ObjectsCard} addButton="הוספת אובייקט חדש" addButtonPath="AddObjectLocation" />}
        </div>
    );
};

export default ObjectsPage;
