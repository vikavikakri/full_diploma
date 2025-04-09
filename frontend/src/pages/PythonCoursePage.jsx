import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pythonLogo from "../assets/python.png"; 
import "./python.css"; 

const CoursePage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="course-container-python">
      {/* Кнопка "назад" */}
      <IconButton className="back-button-ent-python" onClick={handleBackClick} aria-label="назад">
        <ArrowBackIcon />
      </IconButton>

      {/* Заголовок */}
      <Box className="header-container-python">
        <Typography variant="h5" className="course-title-python" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          Курс Python
        </Typography>
        <Typography variant="body1" className="course-lessons-python" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          6 уроков
        </Typography>
      </Box>

      {/* Основной контейнер с информацией */}
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

      {/* Контейнер с уроками */}
<div className="lessons-container-python">
  <div className="lesson-buttons-wrapper">
    {[
      { number: 1, title: "Введение в Python" },
      { number: 2, title: "Переменные и типы данных" },
      { number: 3, title: "Условные операторы и логика" },
      { number: 4, title: "Циклы в Python" },
      { number: 5, title: "Функции и модули" },
      { number: 6, title: "Работа с файлами и проект" },
    ].map((lesson) => (
      <button key={lesson.number} className="lesson-button-python">
        <strong>Урок {lesson.number}.</strong>&nbsp;&nbsp;{lesson.title}
      </button>
    ))}
  </div>
</div>

    </div>
  );
};

export default CoursePage;
