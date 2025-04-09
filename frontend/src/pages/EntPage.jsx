import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Button, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./entpage.css";

const courses = [
  { title: "Курс Курс Мат. грамотность", lessons: "6 уроков", duration: "1 час", path: "/matgram" },
  { title: "Курс Грамотность чтения", lessons: "4 урока", duration: "1 час", path: "/gramchten" },
  { title: "Курс Основы информатики", lessons: "5 уроков", duration: "1.5 часа", path: "/osnovinfo" },
];

const lessons = [
  { title: "Интерактивный формат", text: "Каждый урок – это не просто теория, а увлекательное путешествие в мир знаний. Ты изучаешь темы в удобном темпе,. выполняешь задания и сразу закрепляешь материал на практике." },
  { title: "Чёткая структура", text: "Короткие объяснения, без лишней воды. Наглядные примеры и разборы. Пошаговые алгоритмы решения задач." },
  { title: "Практика, практика и ещё раз практика!", text: "После каждого блока – тесты и упражнения в формате ЕНТ. Разбираем частые ошибки и лайфхаки,. которые помогут набрать больше баллов." },
  { title: "Геймификация и мотивация", text: "Учись в игровом формате: получай ачивки,. проходи уровни и соревнуйся с друзьями!" },
];


const Programming = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCourseClick = (path) => {
    navigate(path);
  };

  return (
    <Box className="container-ent" >
      {/* Кнопка назад */}
      <IconButton className="back-button-ent" onClick={handleBackClick} aria-label="назад">
        <ArrowBackIcon />
      </IconButton>

      {/* Заголовок */}
      <Box className="title-container-ent">
        <Typography variant="h5" className="title-ent" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          Подготовка к ЕНТ
        </Typography>
        <Typography variant="subtitle1" className="subtitle-ent" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          3 направления
        </Typography>
      </Box>

      {/* Основной контейнер курсов */}
      <Box sx={{ width: "95%" }}>
        <Box className="main-container-ent">
          <Box className="shadow-box-ent"></Box>
          <Box className="content-box-ent">
            {courses.map((course, index) => (
              <Button key={index} className="course-button-ent" sx={{ fontFamily: 'Tektur, sans-serif' }} onClick={() => handleCourseClick(course.path)}>
                <span className="course-title-ent">{course.title}</span>
                <span className="course-info-ent">
                  {course.lessons}, {course.duration}
                </span>
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", width: "100%", boxSizing: "border-box" }}>
        <Box className="section-title-about-ent" sx={{ fontSize: "24px" }}>
          Как проходят уроки?
        </Box>

        <Box className="main-container-about-ent">
          {lessons.map((lesson, index) => (
            <Box key={index} className={`lesson-block-about-ent ${index % 2 === 0 ? "right" : "left"}`} sx={{ width: "100%" }}>
              {/* Заголовок блока */}
              <Box className="lesson-title-about-ent" sx={{
                backgroundColor: "#3d5d52",
                color: "#d1c4e9",
                padding: "5px 15px",
                borderRadius: "15px",
                fontWeight: "600",
                display: "inline-block", 
                width: "fit-content",
              }}>
                {lesson.title}
              </Box>

              {/* Текст */}
              <Typography
                className="lesson-text-about-ent"
                sx={{
                  textAlign: index % 2 === 0 ? "right" : "left",
                  color: "#3d5d52",
                  fontSize: "18px",
                  width: "90%",
                  marginTop: "10px",
                  fontFamily: "Tektur, self-serif"
                }}
              >
                {lesson.text.split(". ").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Typography>

            </Box>
          ))}
        </Box>
      </Box>

    </Box>
  );
};

export default Programming;
