import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, IconButton, Card, CardContent, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import arrow1Image from '../assets/arrow1.png';
import arrow2Image from '../assets/arrow2.png';
import './course.css';

const CourseSelection = () => {
  const navigate = useNavigate();
  const [totalDots, setTotalDots] = useState(16);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');

  const courseRoutes = {
    'Курс Python': '/python',
    'Курс C#': '/csh',
    'Курс HTML CSS': '/html',
    'Курс Golang': '/golang',
    'Курс Мат. грамотность': '/matgram',
    'Курс Грамотность чтения': '/gramchten',
    'Курс Основы информатики': '/osnovinfo',
  };

  const technicalCourses = [
    { name: 'Курс Python', lessons: 15, duration: '2.5 часа' },
    { name: 'Курс C#', lessons: 3, duration: '40 минут' },
    { name: 'Курс HTML CSS', lessons: 6, duration: '1.5 часа' },
    { name: 'Курс Golang', lessons: 5, duration: '1 час' },
  ];

  const educationalCourses = [
    { name: 'Курс Мат. грамотность', lessons: 11, duration: '2 часа' },
    { name: 'Курс Грамотность чтения', lessons: 4, duration: '1 час' },
    { name: 'Курс Основы информатики', lessons: 5, duration: '1.5 часа' },
  ];

  useEffect(() => {
    const updateDots = () => {
      if (window.innerWidth <= 480) {
        setTotalDots(8);
      } else if (window.innerWidth <= 768) {
        setTotalDots(12);
      } else {
        setTotalDots(16);
      }
    };

    updateDots();
    window.addEventListener('resize', updateDots);

    return () => window.removeEventListener('resize', updateDots);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
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

  const handleCourseClick = (courseName) => {
    const username = localStorage.getItem('username');
    const path = courseRoutes[courseName];
    if (!username) {
      setRedirectPath(path);
      setShowAuthDialog(true);
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const CategoryCard = ({ courses, type }) => {
    const path = type === 'technical' ? '/programming' : '/ent';
    const username = localStorage.getItem('username');

    const handleStartCourseClick = () => {
      if (!username) {
        setRedirectPath(path);
        setShowAuthDialog(true);
      } else {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    return (
      <Card elevation={0} className="category-card">
        <Box className="button-container">
          <Button
            className="start-course-btn"
            variant="contained"
            onClick={handleStartCourseClick}
            sx={{ mb: 2}}
          >
            Полный каталог курсов
          </Button>
        </Box>
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </Card>
    );
  };

  const CourseCard = ({ course }) => (
    <Paper
      elevation={0}
      className="detailed-course-card"
      onClick={() => handleCourseClick(course.name)}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f5e8c7',
          transition: 'background-color 0.3s ease',
        },
      }}
    >
      <Typography 
        className="course-name" 
        sx={{ 
          fontFamily: 'Tektur, sans-serif',
          color: '#3D5D52',
        }}
      >
        {course.name}
      </Typography>
      <Typography className="course-info" sx={{ fontFamily: 'Tektur, sans-serif' }}>
        {course.lessons} {course.lessons === 1 ? 'урок' : 
          (course.lessons > 1 && course.lessons < 5) ? 'урока' : 'уроков'}, {course.duration}
      </Typography>
    </Paper>
  );

  const Footer = () => {
    const [totalDots, setTotalDots] = useState(16);

    useEffect(() => {
      const updateDots = () => {
        if (window.innerWidth <= 480) {
          setTotalDots(8);
        } else if (window.innerWidth <= 768) {
          setTotalDots(12);
        } else {
          setTotalDots(16);
        }
      };

      updateDots();
      window.addEventListener('resize', updateDots);

      return () => window.removeEventListener('resize', updateDots);
    }, []);

    return (
      <footer className="footer-container3">
        <div className="footer-content3">
          <Link to="/" className="footer-link" onClick={handleBackClick}>
            <p className="footer-text3">Главная</p>
          </Link>
        </div>
        <div className="dots-container3">
          {Array.from({ length: totalDots }, (_, index) => (
            <div key={index} className="footer-dot3"></div>
          ))}
        </div>
      </footer>
    );
  };

  return (
    <div className="hide-header">
      <Container maxWidth="lg" sx={{ py: 3, height: '100vh', display: 'flex', flexDirection: 'column', mt: 7 }}>
        <Box sx={{ position: 'relative' }}>
          <IconButton 
            className="back-button" 
            onClick={handleBackClick}
            aria-label="назад"
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          sx={{ 
            my: 2, 
            color: '#3D5D52', 
            fontWeight: 'bold',
            fontFamily: 'Tektur, sans-serif'
          }}
        >
          Выбор Курса
        </Typography>
        
        <Box className="main-container">
          <Box className="dots-container2">
            {Array.from({ length: totalDots }, (_, index) => (
              <div key={index} className="container-dot"></div>
            ))}
          </Box>
          
          <Box className="courses-container">
            <Box className="card-wrapper">
              <Box className="card-shadow programming-shadow"></Box>
              <Card className="course-card programming-card">
                <CardContent>
                  <Typography className="course-title" sx={{ fontFamily: 'Tektur, sans-serif' }}>
                    Программирование
                  </Typography>
                </CardContent>
              </Card>
              <Box 
                className="arrow-container left-arrow"
                sx={{
                  position: 'absolute',
                  bottom: '-65px',
                  left: '50%',
                  transform: 'translateX(-100%)',
                  zIndex: 5
                }}
              >
                <img 
                  src={arrow1Image} 
                  alt="arrow" 
                  className="arrow-image"
                  style={{ width: '90px' }}
                />
              </Box>
            </Box>
            
            <Box className="card-wrapper">
              <Box className="card-shadow ent-shadow"></Box>
              <Card className="course-card ent-card">
                <CardContent>
                  <Typography className="course-title" sx={{ fontFamily: 'Tektur, sans-serif' }}>
                    Подготовка к ЕНТ
                  </Typography>
                </CardContent>
              </Card>
              <Box 
                className="arrow-container right-arrow"
                sx={{
                  position: 'absolute',
                  bottom: '-110px',
                  right: '50%',
                  transform: 'translateX(110%)',
                  zIndex: 5
                }}
              >
                <img 
                  src={arrow2Image} 
                  alt="arrow" 
                  className="arrow-image2"
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="course-lists-container">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} sx={{ paddingTop: '0px !important' }}>
              <CategoryCard courses={technicalCourses} type="technical" />
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingTop: '0px !important' }}>
              <CategoryCard courses={educationalCourses} type="educational" />
            </Grid>
          </Grid>
        </Box>

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

        <Footer />
      </Container>
    </div>
  );
};

export default CourseSelection;