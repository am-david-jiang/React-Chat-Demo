import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";

import useAuthStore from "./stores/useAuthStore";

import "react-toastify/ReactToastify.min.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isLogin = useAuthStore((state) => state.isLogin);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/'>
            <Route
              index
              element={
                <ProtectedRoute redirectPath='/signin' isAllowed={isLogin}>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
            <Route path='/signup' element={<RegisterPage />} />
            <Route path='/signin' element={<LoginPage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
