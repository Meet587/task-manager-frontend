import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppRoutes } from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
