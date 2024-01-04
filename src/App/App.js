import { Route, Routes } from "react-router-dom";
import LoginPage from "../Components/Pages/LoginPage";
import SignUpPage from "../Components/Pages/Register";
import ResetPassword from "../Components/Pages/ResetPassword";
import Dashboard from "../Components/Pages/Dashboard";
import AppBarX from "../Components/AppBar/AppBarX";
import HomePage from "../Components/Pages/HomePage";
import AboutPage from "../Components/Pages/AboutPage";
import TransactionsPage from "../Components/Pages/TransactionsPage";
import { useContext } from "react";
import Context from "../Components/Context/Context";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import VehicleInsurancePage from "../Components/Pages/VehicleInsurancePage";
import DisplayLicData from "../Components/Pages/LicPages/DisplayLicData";

function App() {
  const { isLoggedIn } = useContext(Context);

  const lightTheme = createTheme({});

  const darkTheme = createTheme({ palette: { mode: "dark" } });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBarX />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/displaylicdata" element={<DisplayLicData />} />
              <Route
                path="/vehicleinsurance"
                element={<VehicleInsurancePage />}
              />
            </>
          ) : (
            <Route path="/" element={<Dashboard />} />
          )}
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
