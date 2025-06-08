import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pythonLogo from "../assets/python.png"; 
import "./python.css"; 

const CoursePage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [lockedLesson, setLockedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/progress', {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const pythonCourse = data.active_courses.find(course => course.course_id === 1);
        setCompletedLessons(pythonCourse ? pythonCourse.completed_lessons : []);
      } catch (error) {
        console.error('Ошибка загрузки прогресса:', error.message);
        if (error.message.includes('404')) {
          console.error('Сервер не найден. Проверьте, работает ли сервер на http://localhost:5000.');
        } else if (error.message.includes('401') || error.message.includes('403')) {
          console.error('Ошибка авторизации. Проверьте токен.');
        }
      }
    };
    fetchProgress();
  }, []);

  const handleLessonClick = (lessonNumber) => {
    if (completedLessons.includes(lessonNumber)) {
      navigate(`/less${lessonNumber}python`);
      return;
    }

    if (lessonNumber === 1) {
      navigate(`/less${lessonNumber}python`);
      return;
    }

    const previousLesson = lessonNumber - 1;
    if (!completedLessons.includes(previousLesson)) {
      setLockedLesson(previousLesson);
      setOpenModal(true);
    } else {
      navigate(`/less${lessonNumber}python`);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setLockedLesson(null);
  };

  const handleGoToLesson = () => {
    if (lockedLesson) {
      navigate(`/less${lockedLesson}python`);
      setOpenModal(false);
    }
  };

  return (
    <div className="course-container-python">
      <IconButton className="back-button-ent-python" onClick={() => navigate(-1)} aria-label="назад">
        <ArrowBackIcon />
      </IconButton>

      <Box className="header-container-python">
        <Typography variant="h5" className="course-title-python" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          Курс Python
        </Typography>
        <Typography variant="body1" className="course-lessons-python" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          6 уроков
        </Typography>
      </Box>

      <div className="main-content-python">
        <div className="shadow-box-python"></div>
        <div className="info-box-python">
          <Typography variant="body1" className="course-description-python">
            Этот курс предназначен для начинающих и поможет вам освоить базовые принципы программирования на Python. 
            Вы научитесь писать простые программы, понимать структуру кода и познакомитесь с важнейшими концепциями, 
            такими как переменные, типы данных, условные операторы и циклы.
          </Typography>
          <div className="image-box-python">
            <img src={pythonLogo} alt="Python Logo" className="python-logo-python" />
          </div>
        </div>
      </div>

      <div className="lessons-container-python">
        <div className="lesson-buttons-wrapper">
          {[
            { number: 1, title: "Введение в Python" },
            { number: 2, title: "Переменные и типы данных" },
            { number: 3, title: "Условные операторы и логика" },
            { number: 4, title: "Циклы в Python" },
            { number: 5, title: "Функции и модули" },
            { number: 6, title: "Списки и циклы" },
          ].map((lesson) => (
            <button
              key={lesson.number}
              className="lesson-button-python"
              onClick={() => handleLessonClick(lesson.number)}
            >
              <strong>Урок {lesson.number}.</strong> {lesson.title}
            </button>
          ))}
        </div>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle sx={{ fontFamily: 'Tektur, sans-serif', color: '#374D45' }}>
          Доступ ограничен
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#374D45' }}>
            Сначала пройдите урок {lockedLesson}. Только после этого вы сможете открыть следующий урок.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} sx={{ color: '#374D45' }}>
            Закрыть
          </Button>
          <Button onClick={handleGoToLesson} sx={{ color: '#374D45' }}>
            Перейти к уроку {lockedLesson}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CoursePage;