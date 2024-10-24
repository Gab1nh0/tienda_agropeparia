'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('BUYER'); // En mayúsculas para que coincida con el JSON
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Limpiar mensajes previos
    setErrorMessage('');
    setSuccessMessage('');

    // Enviar los datos a la API
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', { // URL de la API corregida
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setSuccessMessage(data.message);
        router.push('/login'); // Redirigir al login después del registro exitoso
      } else {
        setErrorMessage(data.message || 'Error en el registro');
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error inesperado');
    }
  };

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Rol</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="BUYER">Buyer</option>
            <option value="MILL_OWNER">Mill Owner</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}
