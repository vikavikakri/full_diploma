import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, IconButton, Card, CardContent, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import arrow1Image from '../assets/arrow1.png';
import arrow2Image from '../assets/arrow2.png';
import './course.css';

const CourseSelection = () => {
  const navigate = useNavigate();
  const [totalDots, setTotalDots] = useState(16);

  const technicalCourses = [
    { name: 'Курс Python', lessons: 6, duration: '1 час' },
    { name: 'Курс C++', lessons: 3, duration: '40 минут' },
    { name: 'Курс HTML CSS', lessons: 6, duration: '1.5 часа' },
    { name: 'Курс Golang', lessons: 5, duration: '1 час' },
  ];

  const educationalCourses = [
    { name: 'Курс Мат. грамотность', lessons: 6, duration: '1 час' },
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

    updateDots(); // Call on load
    window.addEventListener('resize', updateDots); // Update on screen resize

    return () => window.removeEventListener('resize', updateDots); // Clean up event
  }, []);

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  const CourseCard = ({ course }) => (
    <Paper elevation={0} className="detailed-course-card">
      <Typography className="course-name" sx={{ fontFamily: 'Tektur, sans-serif' }}>
        {course.name}
      </Typography>
      <Typography className="course-info" sx={{ fontFamily: 'Tektur, sans-serif' }}>
        {course.lessons} {course.lessons === 1 ? 'урок' : 
          (course.lessons > 1 && course.lessons < 5) ? 'урока' : 'уроков'}, {course.duration}
      </Typography>
    </Paper>
  );

  const CategoryCard = ({ courses, type }) => {
    const path = type === "technical" ? "/programming" : "/ent";
  
    return (
      <Card elevation={0} className="category-card">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
        <Box className="button-container">
          <Button
            component={RouterLink}
            to={path}
            className="start-course-btn"
            variant="contained"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Начать курс
          </Button>
        </Box>
      </Card>
    );
  };

  // Footer component with scroll to top on link click
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

      updateDots(); // Вызываем при загрузке
      window.addEventListener('resize', updateDots); // Обновляем при изменении экрана

      return () => window.removeEventListener('resize', updateDots); // Чистим событие
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
    <Container maxWidth="lg" sx={{ py: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
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
                bottom: '-65px', // Опускаем ниже блока
                left: '50%',
                transform: 'translateX(-100%)',
                zIndex: 5
              }}
            >
              <img 
                src={arrow1Image} 
                alt="arrow" 
                className="arrow-image"
                style={{ width: '90px' }} // Уменьшаем размер стрелки
              />
            </Box>
          </Box>
          
          {/* ENT Preparation card */}
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
        <Box className="course-lists-container" >
          <Grid container spacing={4}>
          <Grid item xs={12} md={6} sx={{ paddingTop: '0px !important' }}>
            <CategoryCard courses={technicalCourses} type="technical" />
          </Grid>
          <Grid item xs={12} md={6} sx={{ paddingTop: '0px !important' }}>
            <CategoryCard courses={educationalCourses} type="educational" />
          </Grid>
          </Grid>
        </Box>
        <Footer /> 
    </Container>
    </div>
  );
};

export default CourseSelection;
