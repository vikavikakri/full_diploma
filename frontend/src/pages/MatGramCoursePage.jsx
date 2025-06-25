import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./matgram.css"; 

const CoursePage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [lockedLesson, setLockedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showTestModal, setShowTestModal] = useState(false); // Новое модальное окно для теста

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
        const mathCourse = data.active_courses.find(course => course.course_id === 2);
        setCompletedLessons(mathCourse ? mathCourse.completed_lessons : []);
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

  const handleBackClick = () => {
    navigate('/courses');
  };

  const handleLessonClick = (lessonNumber) => {
    if (completedLessons.includes(lessonNumber)) {
      navigate(`/less${lessonNumber}math`);
      return;
    }

    if (lessonNumber === 1) {
      navigate(`/less${lessonNumber}math`);
      return;
    }

    const previousLesson = lessonNumber - 1;
    if (!completedLessons.includes(previousLesson)) {
      setLockedLesson(previousLesson);
      setOpenModal(true);
    } else {
      navigate(`/less${lessonNumber}math`);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setLockedLesson(null);
  };

  const handleGoToLesson = () => {
    if (lockedLesson) {
      navigate(`/less${lockedLesson}math`);
      setOpenModal(false);
    }
  };

  const handleTestClick = () => {
    setShowTestModal(true); // Показываем модальное окно перед началом теста
  };

  const handleStartTest = () => {
    setShowTestModal(false);
    navigate('/test1math');
  };

  const handleCloseTestModal = () => {
    setShowTestModal(false);
  };

  // Проверка, что все 11 уроков пройдены
  const isCourseCompleted = completedLessons.length === 11 && 
    completedLessons.every((lesson, index) => lesson === index + 1);

  return (
    <div className="course-container-matgram">
      <IconButton className="back-button-ent-matgram" onClick={handleBackClick} aria-label="назад">
        <ArrowBackIcon />
      </IconButton>

      <Box className="header-container-matgram">
        <Typography variant="h5" className="course-title-matgram" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          Курс Математической грамотности
        </Typography>
        <Typography variant="body1" className="course-lessons-matgram" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          11 уроков
        </Typography>
      </Box>

      <div className="main-content-matgram">
        <div className="shadow-box-matgram"></div>
        <div className="info-box-matgram">
          <Typography variant="body1" className="course-description-matgram">
            Этот курс предназначен для эффективной подготовки к разделу "Математическая грамотность" на ЕНТ. Здесь собраны все ключевые темы, которые встречаются на экзамене, с понятными объяснениями, примерами, типичными заданиями и стратегиями решения. Каждый урок направлен на развитие логического мышления, аналитических способностей и уверенности при решении задач в формате теста.
          </Typography>
        </div>
      </div>

      <div className="lessons-container-matgram">
        <div className="lesson-buttons-wrapper">
          {[
            { number: 1, title: "Функция, ее свойства и график" },
            { number: 2, title: "Тригонометрические функции" },
            { number: 3, title: "Многочлены" },
            { number: 4, title: "Степени и корни, степенная функция" },
            { number: 5, title: "Показательная и логарифмическая функции" },
            { number: 6, title: "Производная и её применение" },
            { number: 7, title: "Первообразная функция и интеграл" },
            { number: 8, title: "Комплексные числа" },
            { number: 9, title: "Дифференциальные уравнения" },
            { number: 10, title: "Тела вращения и их элементы" },
            { number: 11, title: "Объемы тел" },
          ].map((lesson) => (
            <button
              key={lesson.number}
              className="lesson-button-matgram"
              onClick={() => handleLessonClick(lesson.number)}
            >
              <strong>Урок {lesson.number}.</strong> {lesson.title}
            </button>
          ))}
          {isCourseCompleted && (
            <button className="lesson-button-matgram" onClick={handleTestClick}>
              <strong>Тест 1.</strong> Итоговый тест по курсу
            </button>
          )}
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

      <Dialog open={showTestModal} onClose={handleCloseTestModal}>
        <DialogTitle sx={{ fontFamily: 'Tektur, sans-serif', color: '#374D45' }}>
          Начать тест
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#374D45' }}>
            Каждая попытка теста стоит 250 XP. Вы уверены, что хотите начать?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTestModal} sx={{ color: '#374D45' }}>
            Отмена
          </Button>
          <Button onClick={handleStartTest} sx={{ color: '#374D45' }}>
            Начать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CoursePage;