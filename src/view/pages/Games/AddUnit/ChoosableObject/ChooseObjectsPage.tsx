import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Location, ObjectLocation } from '../../../../../redux/models/Interfaces';
import ChoosableObjectCard from './ChooseObjectCard';
import './ChooseObjectPage.scss';

interface ChoosableObjectsPageProps {
    fromParent: string;
}

const ChoosableObjectsPage: FC<ChoosableObjectsPageProps> = ({ fromParent }) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { selectedLocation } = state as { selectedLocation: Location };
    // const selectedLocation = useSelector((state: RootState) => state.globalStates.selectedCard);
    console.log("from parent " + fromParent)
    const returnPath = fromParent === "EditUnit" ? "/EditUnit" : "/AddUnit";
    const handleObjectSelect = (object: ObjectLocation) => {
        navigate(returnPath, {
            state: { selectedLocation, selectedObject: object },
        });
    };
    console.log("Selected Location: ", selectedLocation);
    console.log("Objects List: ", selectedLocation?.objectsList);

    return (
        // <div >
        //     <HomePage objects={selectedLocation.objectsList}
        //         {...selectedLocation.objectsList.map((obj: ObjectLocation) => (
        //             <ChoosableObjectCard key={obj.objectID} object={obj} />
        //         ))} page="Object" Component={ChoosableObjectCard} />
        // </div>

        <div className="objects-container">
            {selectedLocation.objectsList?.map((object: ObjectLocation) => (
                <div key={object.objectID} onClick={() => handleObjectSelect(object)}>
                    <ChoosableObjectCard object={object} />
                </div>
            ))}
        </div>
    );
};

export default ChoosableObjectsPage;
