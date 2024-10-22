'use client';

import React from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';
import { useAuth } from '../hooks/useAuth'; 
import { UserCircle, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <img
          className={styles.navbar_logo}
          src="https://s3-alpha-sig.figma.com/img/d0f7/bacb/d2a11e9f69b9a7a629a36422636c8602?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H0Ji04SQADol~jbrhmO4jhbYwW~LdxZTQ4YmHEwCe6BOoXOmFzRKu~KAKdP2dU-Q5BOJimX0yI05oWJN0puyLniPuAxIWnMEeCWlVJyOny0E-vqRc0dWqBSxnNOoPGLsZg07X8jVejdbTWE2iN36IkDnXyY7O6PVhfmjaf1MKJYHf-aBrNz1S6slClzVZ0iCdAvhzGWS5p3ouC85UOobXyANsIZ6F0cq1yfm-wmvdyFFMY1ICcTWy7UQKB9KDPre8rya2KtP6fHdAfBMtj4Jt~m7~I5rOHRzRi-GMZ5AKzOEKe9K~gkJT6swajsfK2RiSvR8tsEH092sz19nf1g0uQ__"
          alt="Logo"
        />
      </div>
      <div className={styles.navbar_enlaces}>
        <div className={styles.navbar_enlaces_sitios}>
          <Link href="/">Inicio</Link>
          <Link href="/annimales">Categorías</Link>
          
          {user && <Link href="/estadisticas">Estadísticas</Link>}
        </div>
        <div className={styles.navbar_usuario}>
          {loading ? (
            // Mostrar un loader mientras se verifica la autenticación
            <div className={styles.loader}>Cargando...</div>
          ) : user ? (
            // Usuario autenticado
            <div className={styles.user_menu}>
              <div className={styles.user_info}>
                <UserCircle className={styles.user_icon} size={24} />
                <span className={styles.username}>
                  {user.username || 'Usuario'}
                </span>
              </div>
              <button 
                onClick={handleLogout} 
                className={styles.logout_button}
              >
                <LogOut size={20} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          ) : (
            // Usuario no autenticado
            <div className={styles.auth_buttons}>
                <Link className={styles.navbar_usuario_enlances} href="/login">Iniciar sesión</Link>
                <Link  className={styles.navbar_usuario_enlances} href="/register">Registro</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
