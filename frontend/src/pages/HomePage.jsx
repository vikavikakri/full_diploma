import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Paper, Container, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import girl2Image from '../assets/girl2.png';
import man2Image from '../assets/man1.png';
import girlImage from '../assets/girl1.png';
import './pages.css';

const levels = [
  {
    title: 'Начинающих',
    description: 'Кто только начинает подготовку',
    stars: 1,
    color: 'green-box-level',
  },
  {
    title: 'Что-то помнящих',
    description: 'Кто помнит темы со школы :)',
    stars: 2,
    color: 'purple-box-level',
  },
  {
    title: 'Понимающих',
    description: 'Кто самостоятельно изучал материал',
    stars: 3,
    color: 'green-box-level',
  },
  {
    title: 'Для закрепления',
    description: 'Чтоб не забывать теорию и практиковать',
    stars: 4,
    color: 'purple-box-level',
  },
];

const statistics = [
  { value: "700", label: "учеников" },
  { value: "7", label: "направлений" },
  { value: "30", label: "уроков" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [showAuthDialog, setShowAuthDialog] = useState(false); // Состояние для модального окна
  const [redirectPath, setRedirectPath] = useState(''); // Для хранения пути

  const handleStartClick = () => {
    navigate('/courses');
  };

  const handleProgramClick = () => {
    const username = localStorage.getItem('username'); // Проверяем авторизацию
    if (!username) {
      setRedirectPath('/programming');
      setShowAuthDialog(true);
    } else {
      navigate('/programming');
    }
  };

  const handleEntClick = () => {
    const username = localStorage.getItem('username'); // Проверяем авторизацию
    if (!username) {
      setRedirectPath('/ent');
      setShowAuthDialog(true);
    } else {
      navigate('/ent');
    }
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
    <div className="app-container">
      <div className="content-container">
        <div className="text-section">
          <h1 className='h1-content'>Прокачай программирование и разнеси ЕНТ!</h1>
          <p>
            Инновационная образовательная платформа, превращающая обучение в увлекательную игру! Осваивай программирование и готовься к ЕНТ с помощью интерактивных курсов, уровней, наград и AI-наставника.
          </p>
          <button className="start-button" onClick={handleStartClick}>Начать обучение</button>
        </div>
        <div className="image-section">
          <img src={girl2Image} alt="LearnNova Student" className="man-image" />
        </div>
      </div>
      <div id="for-whom" className="content-container2">
        <Typography variant="h4" className="section-title">
          Наша платформа создана для
        </Typography>
        <div className="levels-container">
          {levels.map((level, index) => (
            <Box key={index} className={`level-box ${level.color}`}>
              <div className="stars">
                {[...Array(4)].map((_, i) => (
                  <StarRoundedIcon
                    key={i}
                    className={i < level.stars ? 'star-filled' : 'star-empty'}
                  />              
                ))}
              </div>
              <Typography className="level-typo">{level.title}</Typography>
              <Typography className="level-text">{level.description}</Typography>
            </Box>
          ))}
        </div>
      </div>
      <div className="about-section">
        <div className="about-text">
          <Typography variant="h4" className="about-title">LearNova - это:</Typography>
          <Typography className="about-description" sx={{ fontSize: "clamp(14px, 1.7vw, 22px)" }}>
            Инновационная образовательная платформа, где подготовка к ЕНТ и изучение программирования 
            превращаются в увлекательную игру! Здесь ты сможешь прокачивать навыки, зарабатывать награды, 
            соревноваться с друзьями и учиться в интерактивном формате. Учись, играя — добивайся успеха легко и с интересом!
          </Typography>
        </div>
        <div className="image-frame">
          <img src={man2Image} alt="About LearnNova" className="floating-image"/>
        </div>
      </div>

      <div className="stats-container">
        {statistics.map((stat, index) => (
          <div key={index} className="stat-box">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      {/* Секция с курсами */}
      <div className="courses-section">
        <div className="course-box purple-box">
          <h1 className='h1-course'>Курсы программирования</h1>
          <p className='p-course-purp'>
            Наши курсы программирования – это увлекательное путешествие в мир кода! Мы разработали 
            интерактивные занятия, которые помогут тебе шаг за шагом освоить Python, JavaScript и другие популярные языки.
          </p>
          <button className="course-button" onClick={handleProgramClick}>Начать обучение сейчас</button>
        </div>

        <div className="course-box green-box">
          <h1 className='h1-course'>Подготовка к ЕНТ</h1>
          <p className='p-course-green'>
            Наш курс подготовки к ЕНТ – это твой персональный тренер, который поможет не только уверенно 
            освоить весь необходимый материал, но и научит правильно распределять время, эффективно запоминать 
            информацию и справляться со сложными задачами.
          </p>
          <button className="course-button light" onClick={handleEntClick}>Начать обучение сейчас</button>
        </div>
      </div>
      <Box 
        className="training-section"
        sx={{
          py: 6,
          backgroundColor: '#f4f3ef',
          padding: { xs: '40px 15px', sm: '60px 20px' },
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            className="section-title"
          >
            Что мы "обучим" и "подтянем"
          </Typography>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {/* Математика и Информатика */}
            <Grid item xs={12} md={4} sx={{ mb: { xs: 3, sm: 0 } }}>
              <Paper elevation={0} className="training-card math-card">
                <Typography
                  variant="h6"
                  component="h3"
                  className="card-content"
                  sx={{ fontFamily: 'Tektur, sans-serif' }}
                >
                  Математика и Информатика для ЕНТ - разбор всех ключевых тем, уравнения, функции, базы данных, алгоритмы и многое другое.
                </Typography>
              </Paper>
            </Grid>
            {/* Тесты */}
            <Grid item xs={12} md={4} sx={{ mb: { xs: 3, sm: 0 } }}>
              <Paper elevation={0} className="training-card tests-card">
                <Typography
                  variant="h6"
                  component="h3"
                  className="card-content"
                  sx={{ fontFamily: 'Tektur, sans-serif' }}
                >
                  Решение тестов - прокачаем скорость и точность ответов, научим избегать ловушек и разбирать сложные вопросы.
                </Typography>
              </Paper>
            </Grid>
            {/* Программирование */}
            <Grid item xs={12} md={4} sx={{ mb: { xs: 3, sm: 0 } }}>
              <Paper elevation={0} className="training-card programming-card">
                <Typography
                  variant="h6"
                  component="h3"
                  className="card-content"
                  sx={{ fontFamily: 'Tektur, sans-serif' }}
                >
                  Программирование - от основ до продвинутых техник: работа с алгоритмами, структурами данных, написание кода и решение реальных задач.
                </Typography>
              </Paper>
            </Grid>
            {/* Аналитическое мышление */}
            <Grid item xs={12} sx={{ mb: { xs: 3, sm: 0 } }}>
              <Paper elevation={0} className="training-card analytical-card">
                <Typography
                  variant="h6"
                  component="h3"
                  className="card-content"
                  sx={{ fontFamily: 'Tektur, sans-serif' }}
                >
                  Аналитическое мышление - научим мыслить структурированно, находить нестандартные решения и уверенно справляться с задачами любой сложности.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <div className="girl-image-container">
        <img src={girlImage} alt="Girl" className="girl-image" />
      </div>

      {/* Модальное окно для неавторизованных пользователей */}
      <Dialog open={showAuthDialog} onClose={handleAuthDialogClose}>
        <DialogTitle sx={{ fontFamily: 'Tektur' }}>Требуется авторизация</DialogTitle>
        <DialogContent>
          Для того чтобы начать курс, зарегистрируйтесь или войдите в аккаунт.
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
          <Button
            onClick={handleAuthDialogClose}
            sx={{
              backgroundColor: '#FF6347',
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
    </div>
  );
};

export default HomePage;