// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Welcome from './Welcome';
import ViewUser from './ViewUser';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Cambiamos la ruta principal para redirigir al usuario a "/Game" después de iniciar sesión */}
          <Route path="/" element={<Navigate to="/login" />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/bienvenida' element={<Welcome />} />
          <Route path='/usuarios' element={<ViewUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
