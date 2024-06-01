import { FC } from "react";
import SectorCard from "./SectorCard/SectorCard";
import "./SectorsPage.scss";
import { sectors } from "../../../data/sectors";
import HomePage from "../../components/Common/HomePage/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const SectorsPage: FC = () => {
  const page = useSelector((state: RootState) => state.globalStates.page);

  return (
    <>
      {/* {console.log("page :", page)} */}
      {page == "Sectors" && <HomePage objects={sectors} page="Sector" Component={SectorCard} addButton="הוספת סקטור חדש" addButtonPath="AddSector" />}
    </>
  );
};

export default SectorsPage;