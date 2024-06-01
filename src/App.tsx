
import { RouterProvider } from "react-router-dom";
import router from "./view/router/Route";
// import "./App.scss"; // Import the app.scss file
import { Provider } from 'react-redux';
import store from './redux/store';
function App() {


  return (
    <div className="app-body">
      <Provider store={store}>
        <RouterProvider router={router} >
        </RouterProvider>
      </Provider>

    </div>
  );
}

export default App;