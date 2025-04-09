import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Button, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./programming.css";

const courses = [
  { title: "Курс Python", lessons: "6 уроков", duration: "1 час", path: "/python" },
  { title: "Курс C#", lessons: "4 урока", duration: "40 минут", path: "/csh" },
  { title: "Курс HTML CSS", lessons: "6 уроков", duration: "1.5 часа", path: "/html" },
  { title: "Курс Golang", lessons: "5 уроков", duration: "1 час", path: "/golang" },
];

const lessons = [
  {
    title: "Обучение через практику",
    text: "Ты сразу пишешь код: каждый урок — это не только теория, но и реальные задачи. От простых примеров до мини-проектов. Учишься, делая.",
  },
  {
    title: "Простое объяснение сложных вещей",
    text: "Минимум терминов — максимум понятных объяснений. Пошагово разбираем, как работает код и почему он работает именно так.",
  },
  {
    title: "Живой код и моментальная проверка",
    text: "Редактор прямо в уроке: пиши, запускай и смотри результат. Ошибка? Не страшно — AI-помощник подскажет и объяснит, что не так.",
  },
  {
    title: "Проекты и развитие",
    text: "После каждого модуля — интересные проекты: от калькуляторов до игр. Создавай, улучшай, делись с друзьями. Видишь свой прогресс в реальном времени!",
  },
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
    <Box className="container-prog" >
      {/* Кнопка назад */}
      <IconButton className="back-button-prog" onClick={handleBackClick} aria-label="назад">
        <ArrowBackIcon />
      </IconButton>

      {/* Заголовок */}
      <Box className="title-container-prog">
        <Typography variant="h5" className="title-prog" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          Программирование
        </Typography>
        <Typography variant="subtitle1" className="subtitle-prog" sx={{ fontFamily: 'Tektur, sans-serif' }}>
          4 направления
        </Typography>
      </Box>

      {/* Основной контейнер курсов */}
      <Box sx={{ width: "95%" }}>
        <Box className="main-container-prog">
          <Box className="shadow-box-prog"></Box>
          <Box className="content-box-prog">
            {courses.map((course, index) => (
              <Button key={index} className="course-button-prog" sx={{ fontFamily: 'Tektur, sans-serif' }} onClick={() => handleCourseClick(course.path)}>
                <span className="course-title-prog">{course.title}</span>
                <span className="course-info-prog">
                  {course.lessons}, {course.duration}
                </span>
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", width: "100%", boxSizing: "border-box" }}>
        <Box className="section-title-about-progr" sx={{ fontSize: "24px" }}>
          Как проходят уроки?
        </Box>

        <Box className="main-container-about-progr">
          {lessons.map((lesson, index) => (
            <Box key={index} className={`lesson-block-about-progr ${index % 2 === 0 ? "left" : "right"}`} sx={{ width: "100%" }}>
              {/* Заголовок блока */}
              <Box className="lesson-title-about-progr" sx={{
                backgroundColor: "#3d5d52",
                color: "#D4E39E",
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
                className="lesson-text-about-progr"
                sx={{
                  textAlign: index % 2 === 0 ? "left" : "right",
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
