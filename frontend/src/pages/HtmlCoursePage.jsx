import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import htmlLogo from "../assets/html.png"; 
import "./htmlcourse.css"; 

const CoursePage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="course-container-html">
      {/* Кнопка "назад" */}
      <IconButton className="back-button-ent-html" onClick={handleBackClick} aria-label="назад">
        <ArrowBackIcon />
      </IconButton>

      {/* Заголовок */}
      <Box className="header-container-html">
        <Typography variant="h5" className="course-title-html" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          Курс HTML CSS
        </Typography>
        <Typography variant="body1" className="course-lessons-html" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          5 уроков
        </Typography>
      </Box>

      {/* Основной контейнер с информацией */}
      <div className="main-content-html">
        <div className="shadow-box-html"></div>

        <div className="info-box-html">
          <Typography variant="body1" className="course-description-html">
          Этот курс познакомит вас с основами веб-разработки, обучая созданию веб-страниц с использованием HTML и CSS. Вы научитесь создавать структуру веб-страницы, добавлять текст, изображения и ссылки, а также оформлять страницы с помощью стилей CSS. Курс идеально подходит для начинающих, желающих овладеть основами фронтенд-разработки и создавать стильные, адаптивные веб-сайты.
          </Typography>

          <div className="image-box-html">
            <img src={htmlLogo} alt="Html Logo" className="html-logo-html" />
          </div>
        </div>
      </div>

      {/* Контейнер с уроками */}
<div className="lessons-container-html">
  <div className="lesson-buttons-wrapper">
    {[
      { number: 1, title: "Введение в HTML" },
      { number: 2, title: "Списки, таблицы и формы" },
      { number: 3, title: "Введение в CSS" },
      { number: 4, title: "Работа с цветами, шрифтами и текстовыми стилями" },
      { number: 5, title: "Завершающий проект: Создание простого веб-сайта" },
    ].map((lesson) => (
      <button key={lesson.number} className="lesson-button-html">
        <strong>Урок {lesson.number}.</strong>&nbsp;&nbsp;{lesson.title}
      </button>
    ))}
  </div>
</div>

    </div>
  );
};

export default CoursePage;
