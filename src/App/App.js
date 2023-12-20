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

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);
  return (
    <>
      <AppBarX />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/homepage" element={<HomePage />} />
          </>
        ) : (
          <Route path="/" element={<HomePage />} />
        )}
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/reset" element={<ResetPassword />} />

        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
