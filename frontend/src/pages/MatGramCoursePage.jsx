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
          6 уроков
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
      { number: 1, title: "Числа и арифметические действия" },
      { number: 2, title: "Проценты, пропорции и доли" },
      { number: 3, title: "Единицы измерения и формулы" },
      { number: 4, title: "Таблицы, диаграммы и графики" },
      { number: 5, title: "Логика и текстовые задачи" },
      { number: 6, title: "Итоговый разбор + тренировочный тест" },
    ].map((lesson) => (
      <button key={lesson.number} className="lesson-button-matgram">
        <strong>Урок {lesson.number}.</strong>&nbsp;&nbsp;{lesson.title}
      </button>
    ))}
  </div>
</div>

    </div>
  );
};

export default CoursePage;
