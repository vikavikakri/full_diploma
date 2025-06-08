import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import goLogo from "../assets/golang2.png"; 
import "./golang.css"; 

const CoursePage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLessonClick = (lessonNumber) => {
    navigate(`/less${lessonNumber}go`);
  };

  return (
    <div className="course-container-golang">
      {/* Кнопка "назад" */}
      <IconButton className="back-button-ent-golang" onClick={handleBackClick} aria-label="назад">
        <ArrowBackIcon />
      </IconButton>

      {/* Заголовок */}
      <Box className="header-container-cpp">
        <Typography variant="h5" className="course-title-golang" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          Курс Golang
        </Typography>
        <Typography variant="body1" className="course-lessons-golang" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          5 уроков
        </Typography>
      </Box>

      {/* Основной контейнер с информацией */}
      <div className="main-content-golang">
        <div className="shadow-box-golang"></div>

        <div className="info-box-golang">
          <Typography variant="body1" className="course-description-golang">
          Язык Go (или Golang), разработанный Google, известен своей простотой, скоростью и мощной системой многопоточности. Этот курс поможет вам быстро освоить основы Go и начать писать производительный, читаемый и надежный код. Подходит для начинающих программистов и тех, кто хочет перейти на Go с других языков.
          </Typography>

          <div className="image-box-golang">
            <img src={goLogo} alt="Golang Logo" className="golang-logo-golang" />
          </div>
        </div>
      </div>

      {/* Контейнер с уроками */}
<div className="lessons-container-golang">
  <div className="lesson-buttons-wrapper">
    {[
      { number: 1, title: "Введение в Go и основы синтаксиса" },
      { number: 2, title: "Условные конструкции и циклы" },
      { number: 3, title: "Функции, массивы и слайсы" },
      { number: 4, title: "Структуры, указатели и работа с мапами" },
      { number: 5, title: "Горутины и каналы. Мини-проект" },
    ].map((lesson) => (
      <button key={lesson.number} className="lesson-button-golang" onClick={() => handleLessonClick(lesson.number)}>
        <strong>Урок {lesson.number}.</strong>&nbsp;&nbsp;{lesson.title}
      </button>
    ))}
  </div>
</div>

    </div>
  );
};

export default CoursePage;
