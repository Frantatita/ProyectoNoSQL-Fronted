import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!username || !password) {
            setMessage('Username and password are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/login', {
                username,
                password
            });
            console.log('Respuesta del servidor:', response);

            if (response.data.success) {
                setMessage('Usuario correcto');
                localStorage.setItem('token', response.data.token);
                navigate('/bienvenida');
            } else {
                setMessage('Usuario o contraseña inválidos');
            }
        } catch (error) {
            console.error('Error iniciando sesión:', error);
            if (error.response) {
                console.error('Datos de la respuesta del error:', error.response.data);
                setMessage(`${error.response.data.message}`);
            } else if (error.request) {
                console.error('Solicitud realizada sin respuesta:', error.request);
                setMessage('Error en el servidor o en la red');
            } else {
                console.error('Error en la configuración de la solicitud:', error.message);
                setMessage('Error en la configuración de la solicitud');
            } 
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Usuario"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                />
                <button type="submit">Entrar</button>
            </form>
            {message && <div className="alert">{message}</div>}
            <div className="register-option">
                <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
            </div>
        </div>
    );
};

export default Login;
