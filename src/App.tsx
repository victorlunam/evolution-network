import { Navigate, Route, Routes } from "react-router-dom";
import { globalStyles } from "./theme";
import PrivateRoute from "@components/PrivateRoute";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MLMPage from "./pages/MLMPage";
import RegisterByPage from "./pages/RegisterByPage";

const App = () => {
  globalStyles();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registerBy" element={<Navigate to="/login" replace />} />
      <Route path="/registerBy/:username" element={<RegisterByPage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/tools"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/mlm"
        element={
          <PrivateRoute>
            <MLMPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
