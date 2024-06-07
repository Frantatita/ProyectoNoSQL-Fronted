import React from 'react';
import { Link} from 'react-router-dom';
import './Welcome.css';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde 'react-router-dom'


const Welcome = ({ name, history}) => {

  const navigate = useNavigate(); // Obtiene la función navigate del hook useNavigate

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'))
    navigate('/login');
};

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Bienvenido</h1>
      <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      <p className="welcome-message">Estamos encantados de tenerte aquí.</p>
      <nav className="welcome-nav">
        <ul>
          <li><Link to="/usuarios">Ver usuarios</Link></li>
          <li><Link to="">Agregar usuarios</Link></li>
          <li><Link to="">Elimnar usuarios</Link></li>
          <li><Link to="">Editar usuario</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default (Welcome);
