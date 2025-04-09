import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './components.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  const handleForWhomClick = (event) => {
    event.preventDefault();
    if (location.pathname === '/') {
      const section = document.getElementById('for-whom');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: 'for-whom' } });
    }
  };

  const handleLoginClick = () => {
    navigate('/loginreg');
  };

  const confirmLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUsername(null);
    setShowLogoutDialog(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">LearNova</div>
      <nav className="nav">
        <div className="nav-links">
          <a href="#" className="nav-link" onClick={handleForWhomClick}>Для кого</a>
          <a href="#" className="nav-link">О платформе</a>
          <a href="/courses" className="nav-link">Курсы</a>
        </div>
        {username ? (
          <div className="welcome-text">
            <span>| Добро пожаловать, {username}!</span>
            <button className="logout-button" onClick={() => setShowLogoutDialog(true)}>Выйти</button>
          </div>
        ) : (
          <button className="login-button-head" onClick={handleLoginClick}>Войти</button>
        )}
      </nav>

      {/* Модальное окно подтверждения выхода */}
      <Dialog open={showLogoutDialog} onClose={() => setShowLogoutDialog(false)}>
        <DialogTitle>Подтверждение выхода</DialogTitle>
        <DialogContent>Вы уверены, что хотите выйти из аккаунта?</DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogoutDialog(false)} color="primary">Отмена</Button>
          <Button onClick={confirmLogout} color="error">ОК</Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Header;
