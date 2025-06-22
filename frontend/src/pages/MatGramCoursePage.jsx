import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./matgram.css"; 

const CoursePage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLessonClick = (lessonNumber) => {
    navigate(`/less${lessonNumber}math`);
  };

  return (
    <div className="course-container-matgram">
      {/* Кнопка "назад" */}
      <IconButton className="back-button-ent-matgram" onClick={handleBackClick} aria-label="назад">
        <ArrowBackIcon />
      </IconButton>

      {/* Заголовок */}
      <Box className="header-container-matgram">
        <Typography variant="h5" className="course-title-matgram" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          Курс Математической грамотности
        </Typography>
        <Typography variant="body1" className="course-lessons-matgram" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          11 уроков
        </Typography>
      </Box>

      {/* Основной контейнер с информацией */}
      <div className="main-content-matgram">
        <div className="shadow-box-matgram"></div>

        <div className="info-box-matgram">
          <Typography variant="body1" className="course-description-matgram">
          Этот курс предназначен для эффективной подготовки к разделу "Математическая грамотность" на ЕНТ. Здесь собраны все ключевые темы, которые встречаются на экзамене, с понятными объяснениями, примерами, типичными заданиями и стратегиями решения. Каждый урок направлен на развитие логического мышления, аналитических способностей и уверенности при решении задач в формате теста.
          </Typography>

        </div>
      </div>

      {/* Контейнер с уроками */}
<div className="lessons-container-matgram">
  <div className="lesson-buttons-wrapper">
    {[
      { number: 1, title: "Функция, ее свойства и график" },
      { number: 2, title: "Тригонометрические функции" },
      { number: 3, title: "Многочлены" },
      { number: 4, title: "Степени и корни, степенная функция" },
      { number: 5, title: "Показательная и логарифмическая функции" },
      { number: 6, title: "Производная и её применение" },
      { number: 7, title: "Первообразная функции и интеграл" },
      { number: 8, title: "Комплексные числа" },
      { number: 9, title: "Дифференциальные уравнения" },
      { number: 10, title: "Тела вращения и их элементы" },
      { number: 11, title: "Объемы тел" },
    ].map((lesson) => (
      <button key={lesson.number} className="lesson-button-matgram" onClick={() => handleLessonClick(lesson.number)}>
        <strong>Урок {lesson.number}.</strong>&nbsp;&nbsp;{lesson.title}
      </button>
    ))}
  </div>
</div>

    </div>
  );
};

export default CoursePage;
