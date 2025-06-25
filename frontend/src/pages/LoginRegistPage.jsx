import React, { useState, useContext, useEffect, useRef } from 'react';
import './loginreg.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack, ArrowForward } from '@mui/icons-material';
import { ProfileContext } from '../context/ProfileContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchProfile } = useContext(ProfileContext);
  const formRef = useRef(null);

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
    navigate('/', { replace: true }); // Заменяем историю
  };

  const handleForgpassClick = () => {
    navigate('/forgpass', { replace: true });
  };

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, ''); // Удаляем все нецифровые символы
    if (digits.length > 11) return registerData.phone; // Ограничиваем до 11 символов (1 + 10)

    let formatted = '';
    if (digits.length > 0) formatted += digits[0]; // Первый символ отдельно
    if (digits.length > 1) formatted += '(' + digits.slice(1, 4) + ')'; // (xxx)
    if (digits.length > 4) formatted += digits.slice(4, 7); // xxx
    if (digits.length > 7) formatted += '-' + digits.slice(7, 9); // -xx
    if (digits.length > 9) formatted += '-' + digits.slice(9, 11); // -xx

    // Корректировка для случаев удаления
    if (value.length < registerData.phone.length) {
      const prevFormatted = registerData.phone;
      const diff = prevFormatted.length - formatted.length;
      if (diff > 0) {
        // Если удаление произошло, пытаемся сохранить структуру
        const lastCharRemoved = prevFormatted.slice(-1);
        if (lastCharRemoved.match(/\d/)) {
          // Если удален цифра, убираем только ее, сохраняя формат
          return prevFormatted.slice(0, -1).replace(/\D/g, '').padEnd(digits.length, '').split('').map((d, i) => {
            if (i === 0) return d;
            if (i === 1 && digits.length > 1) return '(' + d;
            if (i > 1 && i < 4 && digits.length > 1) return d;
            if (i === 4 && digits.length > 4) return ')' + d;
            if (i > 4 && i < 7 && digits.length > 4) return d;
            if (i === 7 && digits.length > 7) return '-' + d;
            if (i > 7 && i < 9 && digits.length > 7) return d;
            if (i === 9 && digits.length > 9) return '-' + d;
            if (i > 9 && i < 11 && digits.length > 9) return d;
            return '';
          }).join('');
        }
      }
    }

    return formatted;
  };

  const handleRegister = async () => {
    const requiredFields = { username: 'Логин', email: 'Email', password: 'Пароль', confirmPassword: 'Подтверждение пароля' };
    const emptyFields = {};
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!registerData[field].trim()) {
        emptyFields[field] = label;
      }
    }

    if (Object.keys(emptyFields).length > 0) {
      setError(`Заполните следующие поля: ${Object.values(emptyFields).join(', ')}`);
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        Object.keys(emptyFields).forEach(field => {
          const input = document.querySelector(`input[name="${field}"]`);
          if (input) {
            input.style.border = '2px solid red';
            input.style.borderRadius = '4px';
            setTimeout(() => {
              input.style.border = '';
              input.style.borderRadius = '';
            }, 2000);
          }
        });
      }
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Пароли не совпадают');
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const passwordInput = document.querySelector('input[name="password"]');
        const confirmInput = document.querySelector('input[name="confirmPassword"]');
        if (passwordInput) {
          passwordInput.style.border = '2px solid red';
          passwordInput.style.borderRadius = '4px';
        }
        if (confirmInput) {
          confirmInput.style.border = '2px solid red';
          confirmInput.style.borderRadius = '4px';
        }
        setTimeout(() => {
          if (passwordInput) {
            passwordInput.style.border = '';
            passwordInput.style.borderRadius = '';
          }
          if (confirmInput) {
            confirmInput.style.border = '';
            confirmInput.style.borderRadius = '';
          }
        }, 2000);
      }
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', registerData);
      setError('');
      toast.success('Регистрация успешна! Добро пожаловать!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      const loginPayload = { username: registerData.username, password: registerData.password };
      const loginResponse = await axios.post('http://localhost:5000/api/login', loginPayload);

      const token = loginResponse.data.token;
      const user = loginResponse.data.user;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('username', user.username);
      localStorage.setItem('token', token);

      await fetchProfile();
      navigate('/profile', { replace: true });
    } catch (error) {
      console.error('Ошибка при регистрации:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'Ошибка при регистрации');
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Ошибка при входе:', error);
      setError(error.response?.data?.error || 'Неверный логин/email или пароль');
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="auth-container-login" ref={formRef}>
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
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
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
                name="username"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                variant="outlined"
                fullWidth
                className="input-field-login"
                sx={{ mt: 2 }}
                required
              />
              <TextField
                label="Email"
                name="email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                variant="outlined"
                fullWidth
                className="input-field-login"
                required
              />
              <TextField
                label="Номер телефона (необязательно)"
                name="phone"
                value={registerData.phone}
                onChange={(e) => setRegisterData({ ...registerData, phone: formatPhoneNumber(e.target.value) })}
                variant="outlined"
                fullWidth
                className="input-field-login"
              />
              <TextField
                label="Придумайте пароль"
                name="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                className="input-field-login"
                required
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
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                variant="outlined"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                className="input-field-login"
                required
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