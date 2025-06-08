import React, { useState, useContext, useEffect } from 'react';
import './loginreg.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack, ArrowForward } from '@mui/icons-material';
import { ProfileContext } from '../context/ProfileContext';

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchProfile } = useContext(ProfileContext);

  const [activeTab, setActiveTab] = useState(location.state?.tab || 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [useEmailLogin, setUseEmailLogin] = useState(false);

  const [loginData, setLoginData] = useState({ loginInput: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleForgpassClick = () => {
    navigate('/forgpass');
  };

  const handleRegister = async () => {
    if (registerData.password !== registerData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', registerData);
      setError('');
      alert('Регистрация успешна!');
      setRegisterData({ username: '', email: '', phone: '', password: '', confirmPassword: '' });

      // После успешной регистрации выполняем вход
      const loginPayload = {
        username: registerData.username,
        password: registerData.password
      };
      const loginResponse = await axios.post('http://localhost:5000/api/login', loginPayload);

      const token = loginResponse.data.token;
      const user = loginResponse.data.user;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('username', user.username);
      localStorage.setItem('token', token);

      await fetchProfile();
      navigate('/profile'); // Перенаправляем на страницу профиля после регистрации
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setError(error.response?.data?.error || 'Ошибка при регистрации');
    }
  };

  const handleLogin = async () => {
    try {
      const payload = {
        password: loginData.password,
        [useEmailLogin ? 'email' : 'username']: loginData.loginInput
      };

      const response = await axios.post('http://localhost:5000/api/login', payload);

      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('username', user.username);
      localStorage.setItem('token', token);

      await fetchProfile();
      navigate('/'); // Перенаправляем на главную страницу после входа
    } catch (error) {
      console.error('Ошибка при входе:', error);
      setError(error.response?.data?.error || 'Неверный логин/email или пароль');
    }
  };

  return (
    <div className="auth-container-login">
      <div className="auth-box-login">
        <IconButton className="back-button-login" onClick={handleBackClick}>
          <ArrowBack />
        </IconButton>

        <div className="tabs-login">
          <div
            className={`tab-login ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Войти
          </div>
          <div
            className={`tab-login ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Зарегистрироваться
          </div>
        </div>

        <div className="form-content-login">
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          {activeTab === 'login' ? (
            <>
              <TextField
                label={useEmailLogin ? 'Email' : 'Логин'}
                variant="outlined"
                fullWidth
                className="input-field-login"
                value={loginData.loginInput}
                onChange={(e) => setLoginData({ ...loginData, loginInput: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                label="Пароль"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                className="input-field-login"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button variant="contained" className="login-button-login" onClick={handleLogin}>
                Войти
              </Button>

              <Button
                variant="text"
                onClick={() => setUseEmailLogin(!useEmailLogin)}
                className="button-change-logreg"
              >
                {useEmailLogin ? 'Войти по логину' : 'Войти по email'}
              </Button>
              <Button
                variant="text"
                className="button-forgpass-logreg"
                onClick={handleForgpassClick}
              >
                Забыли пароль?
              </Button>
            </>
          ) : (
            <>
              <TextField
                label="Логин"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                variant="outlined"
                fullWidth
                className="input-field-login"
                sx={{ mt: 2 }}
              />
              <TextField
                label="Email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                variant="outlined"
                fullWidth
                className="input-field-login"
              />
              <TextField
                label="Номер телефона"
                value={registerData.phone}
                onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                variant="outlined"
                fullWidth
                className="input-field-login"
              />
              <TextField
                label="Придумайте пароль"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                className="input-field-login"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                label="Повторите пароль"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                variant="outlined"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                className="input-field-login"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <div className="register-footer-login">
                <div className="save-content-login">
                  <div className="save-text-login">
                    <div className="save-title-login">Сохранить и продолжить</div>
                    <div className="save-subtitle-login">Ваша учетная запись почти готова!</div>
                  </div>
                  <IconButton className="save-arrow-login" onClick={handleRegister}>
                    <ArrowForward />
                  </IconButton>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;