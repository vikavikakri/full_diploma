import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./gramchten.css"; 

const CoursePage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="course-container-gramchten">
      {/* Кнопка "назад" */}
      <IconButton className="back-button-ent-gramchten" onClick={handleBackClick} aria-label="назад">
        <ArrowBackIcon />
      </IconButton>

      {/* Заголовок */}
      <Box className="header-container-gramchten">
        <Typography variant="h5" className="course-title-gramchten" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          Курс Грамотность чтения
        </Typography>
        <Typography variant="body1" className="course-lessons-gramchten" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          4 урока
        </Typography>
      </Box>

      {/* Основной контейнер с информацией */}
      <div className="main-content-gramchten">
        <div className="shadow-box-gramchten"></div>

        <div className="info-box-gramchten">
          <Typography variant="body1" className="course-description-gramchten">
          Курс направлен на развитие навыков грамотного и осмысленного чтения текстов, понимания структуры, логики и скрытого смысла — именно того, что проверяет раздел «Грамотность чтения» на ЕНТ. Ты научишься быстро находить нужную информацию, анализировать смысл, интерпретировать тексты и избегать ловушек в тестах. Все темы подаются с примерами и типичными заданиями в формате ЕНТ.
          </Typography>

        </div>
      </div>

      {/* Контейнер с уроками */}
<div className="lessons-container-gramchten">
  <div className="lesson-buttons-wrapper">
    {[
      { number: 1, title: "Понимание основной мысли текста" },
      { number: 2, title: "Логика, аргументация и структура текста" },
      { number: 3, title: "Интерпретация и критический анализ" },
      { number: 4, title: "Обобщение и итоговая тренировка" },
    ].map((lesson) => (
      <button key={lesson.number} className="lesson-button-gramchten">
        <strong>Урок {lesson.number}.</strong>&nbsp;&nbsp;{lesson.title}
      </button>
    ))}
  </div>
</div>

    </div>
  );
};

export default CoursePage;
