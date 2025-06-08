import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './components.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');

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

  const handleProfileClick = (event) => {
    event.preventDefault();
    if (!username) {
      setRedirectPath('/profile');
      setShowAuthDialog(true);
    } else {
      navigate('/profile');
    }
  };

  // Убираем ограничение на /courses
  const handleCoursesClick = (event) => {
    event.preventDefault();
    navigate('/courses'); // Переходим на /courses без проверки авторизации
  };

  const handleLoginClick = () => {
    navigate('/loginreg', { state: { tab: 'login' } });
  };

  const confirmLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUsername(null);
    setShowLogoutDialog(false);
    navigate('/');
  };

  const handleAuthDialogClose = () => {
    setShowAuthDialog(false);
    setRedirectPath('');
  };

  const handleRegisterRedirect = () => {
    navigate('/loginreg', { state: { tab: 'register' } });
    setShowAuthDialog(false);
  };

  const handleLoginRedirect = () => {
    navigate('/loginreg', { state: { tab: 'login' } });
    setShowAuthDialog(false);
  };

  return (
    <header className="header">
      <div className="logo">LearNova</div>
      <nav className="nav">
        <div className="nav-links">
          <a href="#" className="nav-link" onClick={handleForWhomClick}>Для кого</a>
          <a href="/courses" className="nav-link" onClick={handleCoursesClick}>Курсы</a>
          <a href="/profile" className="nav-link" onClick={handleProfileClick}>Профиль</a>
        </div>
        {username ? (
          <div className="welcome-text">
            <span>| Привет, {username}!</span>
            <button className="logout-button" onClick={() => setShowLogoutDialog(true)}>Выйти</button>
          </div>
        ) : (
          <button className="login-button-head" onClick={handleLoginClick}>Войти</button>
        )}
      </nav>

      {/* Модальное окно подтверждения выхода */}
      <Dialog open={showLogoutDialog} onClose={() => setShowLogoutDialog(false)}>
        <DialogTitle sx={{ fontFamily: 'Tektur' }}>Подтверждение выхода</DialogTitle>
        <DialogContent>Вы уверены, что хотите выйти из аккаунта?</DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogoutDialog(false)} sx={{ fontFamily: 'Tektur', backgroundColor: '#ff746a', color: '#FFFFFF', border: '3px solid #3a5a40'}}>Отмена</Button>
          <Button onClick={confirmLogout} sx={{ fontFamily: 'Tektur', backgroundColor: '#C1E1C1', color: '#3a5a40', border: '3px solid #3a5a40' }}>ОК</Button>
        </DialogActions>
      </Dialog>

      {/* Модальное окно для неавторизованных пользователей */}
      <Dialog open={showAuthDialog} onClose={handleAuthDialogClose}>
        <DialogTitle sx={{ fontFamily: 'Tektur' }}>Требуется авторизация</DialogTitle>
        <DialogContent>
          Для того чтобы {redirectPath === '/profile' ? 'увидеть Профиль' : 'начать курс'}, зарегистрируйтесь или войдите в аккаунт.
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
          <Button
            onClick={handleAuthDialogClose}
            sx={{
              backgroundColor: '#ff746a',
              color: '#FFFFFF',
              border: '3px solid #3a5a40',
              fontFamily: 'Tektur',
              '&:hover': {
                backgroundColor: '#FF4500',
              },
            }}
          >
            Отмена
          </Button>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Button
              onClick={handleRegisterRedirect}
              sx={{
                backgroundColor: '#c5c5e1',
                color: '#3a5a40',
                border: '3px solid #3a5a40',
                fontFamily: 'Tektur',
                '&:hover': {
                  backgroundColor: '#b2b2d9',
                },
              }}
            >
              Регистрация
            </Button>
            <Button
              onClick={handleLoginRedirect}
              sx={{
                  backgroundColor: '#D4E39E',
                  color: '#3a5a40',
                  border: '3px solid #3a5a40',
                  fontFamily: 'Tektur',
                  '&:hover': {
                    backgroundColor: '#bfcd8c',
                  },
                }}
            >
              Вход
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Header;