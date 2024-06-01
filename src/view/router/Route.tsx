import { createBrowserRouter } from 'react-router-dom';
import { LoginPage, NewSectorPage, Base, SectorDetails, SectorsPage, LocationPage, TasksPage } from '../pages';
import { Outlet } from "react-router-dom";
import GamesPage from '../pages/Games/GamesPage';
import AddTask from '../pages/Tasks/AddTask/AddTask';
import TaskDetails from '../pages/Tasks/TaskDetails/TaskDetails';
import AddLocation from '../pages/Location/AddLocation/AddLocation';
import LocationDetails from '../pages/Location/LocationDetails/LocationDetails';
import EditTask from '../pages/Tasks/EditTask/EditTask';
import AddObjectLocation from '../pages/ObjectLocation/AddObjectLocation/AddObjectLocation';
import ObjectDetails from '../pages/ObjectLocation/ObjectDetails/ObjectDetails';
import ObjectsPage from '../pages/ObjectLocation/ObjectsPage';
import AddGame from '../pages/Games/AddGame/AddGame';
import AddUnit from '../pages/Games/AddUnit/AddUnit';
import ChoosableTaskPage from '../pages/Games/AddUnit/ChoosableTask/ChooseTask';
import UnitsPage from '../pages/Games/UnitPage/UnitsPage';
import ChoosableLocationPage from '../pages/Games/AddUnit/ChoosableObject/ChooseLocationPage';
import ChoosableObjectsPage from '../pages/Games/AddUnit/ChoosableObject/ChooseObjectsPage';
import EditUnit from '../pages/Games/EditUnit/EditUnit';

function Layout() {
  return (
    <>
      <Base>
        <Outlet />
      </Base>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  }, {
    path: '/newSector',
    element: <NewSectorPage />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/SectorDetails/:sector',
        element: <SectorDetails />
      }, {
        path: '/Sectors',
        element: <SectorsPage />
      }, {
        path: '/Locations',
        element: <LocationPage />
      }, {
        path: '/Tasks',
        element: <TasksPage />
      }, {
        path: '/Games',
        element: <GamesPage />
      }, {
        path: '/EditTask',
        element: <EditTask />
      }, {
        path: '/AddTask',
        element: <AddTask />
      }, {
        path: '/AddLocation',
        element: <AddLocation />
      },
      {
        path: '/TaskDetails/:task',
        element: <TaskDetails />
      },
      {
        path: '/LocationDetails/:location',
        element: <LocationDetails />
      },
      {
        path: '/AddLocation/:location',
        element: <AddObjectLocation />
      },
      {
        path: '/AddObjectLocation',
        element: <AddObjectLocation />
      },
      {
        path: '/ObjectDetails/:objectID',
        element: <ObjectDetails />
      },

      {
        path: '/AddGame',
        element: <AddGame />
      },
      {
        path: '/AddUnit',
        element: <AddUnit />
      },
      {
        path: '/ChooseTask-edit',
        element: <ChoosableTaskPage fromParent="EditUnit" />
      },
      {
        path: '/ChooseTask-add',
        element: <ChoosableTaskPage fromParent="AddUnit" />
      },
      {
        path: '/ChooseLocation-edit',
        element: <ChoosableLocationPage fromParent="EditUnit" />
      },
      {
        path: '/ChooseLocation-add',
        element: <ChoosableLocationPage fromParent="AddUnit" />
      },
      {
        path: '/ChooseObject-edit/:locationID',
        element: <ChoosableObjectsPage fromParent="EditUnit" />
      },
      {
        path: '/ChooseObject-add/:locationID',
        element: <ChoosableObjectsPage fromParent="AddUnit" />
      },
      {
        path: '/UnitsPage',
        element: <UnitsPage />
      },
      {
        path: '/EditUnit',
        element: <EditUnit />
      },
      {
        path: '/ObjectsPage/:locationID',
        element: <ObjectsPage />
      }

    ]

  }

]);

export default router;
