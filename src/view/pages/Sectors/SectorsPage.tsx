import { FC, useEffect } from "react";
import SectorCard from "./SectorCard/SectorCard";
import "./SectorsPage.scss";
// import { sectors } from "../../../data/sectors";
import HomePage from "../../components/Common/HomePage/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setSectors } from "../../../redux/slices/saveAllData";
import { adminAPI } from "../../../redux/services/AdminApi";
import { setSector } from "../../../redux/slices/GlobalStates";

const SectorsPage: FC = () => {
  // const page = useSelector((state: RootState) => state.globalStates.page);
  const dispatch = useDispatch();
  const sectors = useSelector((state: RootState) => state.AllData.Sectors);
  // const [showConfirm, setShowConfirm] = useState(false);
  // const [taskToDelete, setAdminToDelete] = useState<Admin | null>(null);


  useEffect(() => {
    const fetchSectors = async () => {
      dispatch(setSectors(await adminAPI.getAllAdmins()));
      dispatch(setSector(sectors[0]));
      console.log("in sector page " + await adminAPI.getAllAdmins())
    };
    fetchSectors();

  }, [dispatch]);

  return (
    <>
      {/* {console.log("page :", page)} */}
      {<HomePage objects={sectors} page="Sector" Component={SectorCard} addButton="הוספת סקטור חדש" addButtonPath="AddSector" />}
    </>
  );
};

export default SectorsPage;