import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';

const Private = ({ children }) => (localStorage.getItem('token') ? children : <Navigate to="/login" replace />);

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Private><Home /></Private>} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
