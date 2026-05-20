import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { RegisterOptions } from "./pages/RegisterOptions";
import { RegisterForm } from "./pages/RegisterForm";
import { CheckMail } from "./pages/CheckMail";
import { VerifyEmail } from "./pages/VerifyEmail";
import { VerifiedSuccess } from "./pages/VerifiedSuccess";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
