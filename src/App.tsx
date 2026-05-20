import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { RegisterOptions } from "./pages/RegisterOptions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default entry redirect */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/" element={<AuthLayout />}>
          <Route path="register" element={<RegisterOptions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
