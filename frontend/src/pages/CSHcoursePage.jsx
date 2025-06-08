import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import cshLogo from "../assets/csh.png"; 
import "./csh.css"; 

const CoursePage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLessonClick = (lessonNumber) => {
    navigate(`/less${lessonNumber}csh`);
  };

  return (
    <div className="course-container-csh">
      {/* Кнопка "назад" */}
      <IconButton className="back-button-ent-csh" onClick={handleBackClick} aria-label="назад">
        <ArrowBackIcon />
      </IconButton>

      {/* Заголовок */}
      <Box className="header-container-csh">
        <Typography variant="h5" className="course-title-csh" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          Курс C#
        </Typography>
        <Typography variant="body1" className="course-lessons-csh" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          4 урока
        </Typography>
      </Box>

      {/* Основной контейнер с информацией */}
      <div className="main-content-csh">
        <div className="shadow-box-csh"></div>

        <div className="info-box-csh">
          <Typography variant="body1" className="course-description-csh">
          Этот курс познакомит тебя с одним из самых популярных языков программирования — C#. Он используется для разработки игр (Unity), десктопных приложений, сайтов и бэкендов. За 4 урока ты освоишь основы синтаксиса, научишься работать с переменными, условиями, циклами и объектно-ориентированным программированием. Курс включает теорию, практические задания и мини-проекты.
          </Typography>

          <div className="image-box-csh">
            <img src={cshLogo} alt="CSH Logo" className="csh-logo-csh" />
          </div>
        </div>
      </div>

      {/* Контейнер с уроками */}
<div className="lessons-container-csh">
  <div className="lesson-buttons-wrapper">
    {[
      { number: 1, title: "Введение в C# и первый код" },
      { number: 2, title: "Условия и циклы" },
      { number: 3, title: "Функции и основы ООП в C#" },
      { number: 4, title: "Наследование и полиморфизм" },
    ].map((lesson) => (
      <button key={lesson.number} className="lesson-button-csh" onClick={() => handleLessonClick(lesson.number)}>
        <strong>Урок {lesson.number}.</strong>&nbsp;&nbsp;{lesson.title}
      </button>
    ))}
  </div>
</div>

    </div>
  );
};

export default CoursePage;
