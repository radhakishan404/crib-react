import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SnackBarContainer from "./component/common/Snackbar";
import CribsView from "./pages/Cribs";

function App() {
  return (
    <>
      <SnackBarContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<CribsView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
