import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./osnovinfo.css"; 

const CoursePage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="course-container-osnovinfo">
      {/* Кнопка "назад" */}
      <IconButton className="back-button-ent-osnovinfo" onClick={handleBackClick} aria-label="назад">
        <ArrowBackIcon />
      </IconButton>

      {/* Заголовок */}
      <Box className="header-container-osnovinfo">
        <Typography variant="h5" className="course-title-osnovinfo" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          Курс Основы информатики
        </Typography>
        <Typography variant="body1" className="course-lessons-osnovinfo" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          5 уроков
        </Typography>
      </Box>

      {/* Основной контейнер с информацией */}
      <div className="main-content-osnovinfo">
        <div className="shadow-box-osnovinfo"></div>

        <div className="info-box-osnovinfo">
          <Typography variant="body1" className="course-description-osnovinfo">
          Курс предназначен для тех, кто хочет быстро и эффективно подготовиться к заданиям по информатике на ЕНТ. В программе — все важные темы, встречающиеся в экзамене: логика, системы счисления, кодирование, таблицы, графы и основы алгоритмов. Материал изложен просто и доступно, с примерами, пояснениями и практикой в формате тестов.
          </Typography>

        </div>
      </div>

      {/* Контейнер с уроками */}
<div className="lessons-container-osnovinfo">
  <div className="lesson-buttons-wrapper">
    {[
      { number: 1, title: "Логика и логические выражения" },
      { number: 2, title: "Системы счисления и переводы" },
      { number: 3, title: "Кодирование и представление информации" },
      { number: 4, title: "Таблицы, графы и базы данных" },
      { number: 5, title: "Алгоритмы и исполнители" },
    ].map((lesson) => (
      <button key={lesson.number} className="lesson-button-osnovinfo">
        <strong>Урок {lesson.number}.</strong>&nbsp;&nbsp;{lesson.title}
      </button>
    ))}
  </div>
</div>

    </div>
  );
};

export default CoursePage;
