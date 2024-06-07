import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Importa Navigate para la redirección
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirectToLogin, setRedirectToLogin] = useState(false); // Estado para la redirección

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validación de longitud mínima para nombre de usuario y contraseña
        if (username.length < 6 || password.length < 8) {
            return setMessage('El nombre de usuario debe tener al menos 6 caracteres y la contraseña debe tener al menos 8 caracteres');
        }

        // Validación de caracteres permitidos
        const usernameRegex = /^[a-zA-Z0-9_-]+$/;
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+]+$/;
        if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
            return setMessage('El nombre de usuario y la contraseña deben contener solo caracteres alfanuméricos y algunos caracteres especiales');
        }

        // Validación de coincidencia de contraseña
        if (password !== confirmPassword) {
            return setMessage('Las contraseñas no coinciden');
        }

        try {
            const response = await axios.post('http://localhost:3000/register', {
                username,
                password
            });
            console.log(username,password)
            setMessage(response.data);
            setRedirectToLogin(true);
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            setMessage('Error usuario no registrado');
        }
    };

    if (redirectToLogin) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="register-container">
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
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
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmar Contraseña"
                    required
                />
                <button type="submit">Registrar</button>
            </form>
            {message && <div className="alert">{message}</div>}
        </div>
    );
};

export default Register;
