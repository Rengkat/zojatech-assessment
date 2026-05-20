import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { RegisterOptions } from "./pages/auth/RegisterOptions";
import { RegisterForm } from "./pages/auth/RegisterForm";
import { CheckMail } from "./pages/auth/CheckMail";
import { VerifyEmail } from "./pages/auth/VerifyEmail";
import { VerifiedSuccess } from "./pages/auth/VerifiedSuccess";
import { Login } from "./pages/auth/Login";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Portfolio } from "./pages/dashboard/PortfolioMainContent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default entry redirect */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/" element={<AuthLayout />}>
          <Route path="register" element={<RegisterOptions />} />
          <Route path="form" element={<RegisterForm />} />
          <Route path="check-mail" element={<CheckMail />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="verified-success" element={<VerifiedSuccess />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/portfolio" element={<DashboardLayout />}>
          <Route index element={<Portfolio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
