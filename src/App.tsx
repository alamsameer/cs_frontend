// reference protected routes :https://medium.com/@chiragmehta900/creating-protected-routes-in-react-js-with-react-router-v6-28f3a3ac53d
import { Routes, Route } from "react-router-dom";
import LoginPage from "./app/auth/LoginPage";
import Home from "./app/home/Page.tsx";
import ProtectedRoute from "./app/utils/ProtectedRoute.tsx";
import Inventory from "./app/inventory/Inventory.tsx";
import Dashboard from "./app/dashboard/page.tsx";
// Component for the 404 Not Found page
const NotFound = () => <h2>404 - Page Not Found</h2>;
function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard/>}></Route>
          <Route path="/trade" element={<h1>trade</h1>} />
          <Route path="/inventory" element={<Inventory />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
