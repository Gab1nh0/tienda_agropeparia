'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Register.module.css';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
    };

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      router.push('/login');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Crear una cuenta</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
          <div className={styles.inputGroup}>
            <input
              name="username"
              type="text"
              required
              placeholder="Nombre de usuario"
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              name="email"
              type="email"
              required
              placeholder="Correo electrónico"
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              name="password"
              type="password"
              required
              placeholder="Contraseña"
            />
          </div>
          <div className={styles.inputGroup}>
            <select name="role" required>
              <option value="BUYER">Comprador</option>
              <option value="MILL_OWNER">Dueño de Molino</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
}