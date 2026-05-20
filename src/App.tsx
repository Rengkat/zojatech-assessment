import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { RegisterOptions } from "./pages/RegisterOptions";
import { RegisterForm } from "./pages/RegisterForm";
import { CheckMail } from "./pages/CheckMail";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
