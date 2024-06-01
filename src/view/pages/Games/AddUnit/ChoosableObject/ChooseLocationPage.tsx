import { FC, useEffect } from 'react';
import ChoosableLocationCard from './ChooseLocationCard';
import { locationAPI } from '../../../../../redux/services/LocationApi';
import HomePage from '../../../../components/Common/HomePage/HomePage';
// import { RootState } from "../../../../redux/store";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { setLocations } from "../../../../../redux/slices/saveAllData";
// import './LocationPage.scss';

// import './ChoosableLocationPage.scss';
interface ChoosableLocationPageProps {
    fromParent: string;
}
const ChoosableLocationPage: FC<ChoosableLocationPageProps> = ({ fromParent }) => {
    // const [locations, setLocations] = useState<Location[]>([]);
    // const navigate = useNavigate();
    const locations = useSelector((state: RootState) => state.AllData.locations);


    useEffect(() => {
        const fetchLocations = async () => {
            const fetchedLocations = await locationAPI.getAllLocations();
            setLocations(fetchedLocations);
        };
        fetchLocations();
    }, []);
    const navigationPath = fromParent === "EditUnit" ? "/EditUnit" : "/AddUnit";
    console.log("nav is " + navigationPath)

    // const handleLocationSelect = (location: Location) => {
    //     navigate(`/ChoosableObjectsPage`, { state: { selectedLocation: location } });
    // };

    return (
        <HomePage objects={locations}
            page="ChooseLocation"
            Component={(props) => (
                <ChoosableLocationCard {...props} navigationPath={navigationPath} />
            )}
            setCardOnClick={false} />

        // <div className="locations-container">
        //     {locations.map(location => (
        //         <div key={location.locationID}>
        //             <ChoosableLocationCard object={location} />
        //         </div>
        //     ))}
        // </div>
    );
};

export default ChoosableLocationPage;
