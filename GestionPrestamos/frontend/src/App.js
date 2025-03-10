import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Verification from './components/Verification';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, AuthContext } from "./context/AuthContext";

// PrivateRoute que asegura que solo los usuarios autenticados puedan acceder
const PrivateRoute = ({ element }) => {
  return (
    <AuthContext.Consumer>
      {({ authData }) => {
        console.log('Valor de authData en PrivateRoute:', authData); // Verifica el valor
        return authData ? element : <Navigate to="/login" />;
      }}
    </AuthContext.Consumer>
  );
};


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification" element={<Verification />} />
          
          {/* Rutas privadas protegidas por el PrivateRoute */}
          <Route path="/Dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
