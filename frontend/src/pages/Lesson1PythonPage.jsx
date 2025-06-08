import React, { useState, useEffect, useContext } from 'react'; // Добавлен useContext
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import { ProfileContext } from '../context/ProfileContext'; // Импорт контекста
import './lesson3python.css';

const Lesson1Python = () => {
  const [code, setCode] = useState("print('')");
  const [output, setOutput] = useState('');
  const [xp, setXp] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [showRepeatModal, setShowRepeatModal] = useState(false);
  const navigate = useNavigate();
  const { checkAchievements } = useContext(ProfileContext); // Получаем функцию из контекста

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/progress', {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setXp(data.points || 0);
        const pythonCourse = data.active_courses.find(course => course.course_id === 1);
        if (pythonCourse && pythonCourse.completed_lessons.includes(1)) {
          setAlreadyCompleted(true);
          setSubmitted(true);
        }
      } catch (error) {
        console.error('Ошибка загрузки прогресса:', error.message);
        if (error.message.includes('404')) {
          console.error('Сервер не найден. Проверьте, работает ли сервер на http://localhost:5000.');
        } else if (error.message.includes('401') || error.message.includes('403')) {
          console.error('Ошибка авторизации. Проверьте токен.');
        }
      }
    };
    fetchProgress();
  }, []);

  const handleBackClick = () => {
    navigate('/python');
  };

  const handleRunCode = async () => {
    try {
      if (code.trim() === "print('Привет, мир!')") {
        setOutput('Привет, мир!');
      } else {
        setOutput('Ошибка: попробуйте снова.');
      }
    } catch (e) {
      setOutput('Ошибка выполнения');
    }
  };

  const handleSubmit = async () => {
    if (code.trim() === "print('Привет, мир!')") {
      if (alreadyCompleted && !submitted) {
        setShowRepeatModal(true);
      } else {
        try {
          const response = await fetch('http://localhost:5000/api/progress', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({ course_id: 1, lesson_number: 1 }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setXp(data.points);
          setSubmitted(true);
          setAlreadyCompleted(true);
          alert(`Отлично! Вы получили ${data.xp_added} XP.`);

          // Проверка ачивок
          checkAchievements(1, { completedLessons: [1], totalLessons: 6 }, data.xp_added); // Добавляем проверку
        } catch (error) {
          console.error('Ошибка сохранения прогресса:', error.message);
          if (error.message.includes('404')) {
            alert('Сервер не найден. Убедитесь, что сервер запущен на http://localhost:5000.');
          } else if (error.message.includes('401') || error.message.includes('403')) {
            alert('Ошибка авторизации. Проверьте токен.');
          } else {
            alert('Ошибка при сохранении прогресса');
          }
        }
      }
    } else {
      alert('Код неверный. Попробуйте снова.');
    }
  };

  const handleNextLesson = () => {
    navigate('/less2python');
  };

  const handleRepeatConfirm = async () => {
    setShowRepeatModal(false);
    try {
      const response = await fetch('http://localhost:5000/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ course_id: 1, lesson_number: 1 }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setXp(data.points);
      setSubmitted(true);
      alert(`Отлично! Вы получили ${data.xp_added} XP.`);

      // Проверка ачивок для повторного прохождения
      checkAchievements(1, { completedLessons: [1], totalLessons: 6 }, data.xp_added); // Добавляем проверку
    } catch (error) {
      console.error('Ошибка сохранения прогресса:', error.message);
      if (error.message.includes('404')) {
        alert('Сервер не найден. Убедитесь, что сервер запущен на http://localhost:5000.');
      } else if (error.message.includes('401') || error.message.includes('403')) {
        alert('Ошибка авторизации. Проверьте токен.');
      } else {
        alert('Ошибка при сохранении прогресса');
      }
    }
  };

  const handleRepeatCancel = () => {
    setShowRepeatModal(false);
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1pyt" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 1: Введение в Python</h1>
        <p className="lesson-text">
          Добро пожаловать в увлекательный мир программирования с Python! Этот язык был создан в 1991 году Гвидо ван Россумом, голландским программистом, который хотел разработать простой и читаемый язык, вдохновленный идеями ясности и эффективности. <br></br><br></br>Название "Python" — это отсылка к любимому комедийному шоу Гвидо, "Monty Python's Flying Circus", что добавляет языку немного юмора и легкости. С тех пор Python стал одним из самых популярных языков в мире благодаря своей простоте и универсальности — от создания веб-сайтов до анализа данных и искусственного интеллекта.
          <br></br><br></br>Теоретически, Python относится к языкам с высокой степенью абстракции и динамической типизацией, что означает, что тебе не нужно заранее указывать тип данных (например, число или текст) — язык сам всё определит. <br></br>Это делает его идеальным для обучения и экспериментов. В этом уроке мы начнем с основ: узнаем, что такое переменные и типы данных, и попробуем дать компьютеру первые команды.
          <br></br><br></br>В этом уроке мы начнем с классического первого шага в программировании — написания "Привет, мир!".<br></br><br></br>В Python это делается с помощью команды print('Привет, мир!'). Давай разберем, что здесь происходит: print — это встроенная функция, которая выводит текст или данные на экран, а строка 'Привет, мир!' заключается в кавычки (одинарные или двойные), чтобы показать, что это текст, а не код. <br></br>Кавычки нужны, чтобы Python понял, что это данные для отображения, а не инструкция. Именно print выбирают для этого, потому что он универсален, прост и идеален для первых экспериментов — ты сразу видишь результат своей работы!
        </p>

        <p className="lesson-task">
          Задание: напишите код, который выведет на экран <strong>Привет, мир!</strong>
        </p>

        <Button variant="contained" className='button-go-1put' onClick={handleRunCode} sx={{ mt: 2 }}>
          ▶ Запустить код
        </Button>
        <div className="output-box">
          <pre>{output}</pre>
        </div>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="outlined" className='button-xp-1put' onClick={handleSubmit} sx={{ mt: 0 }}>
            Отправить и получить XP
          </Button>
          {submitted && (
            <Button
              variant="outlined"
              onClick={handleNextLesson}
              sx={{
                backgroundColor: '#ffd54f',
                borderRadius: '8px',
                color: '#3a5a40',
                border: '3px solid #3a5a40',
                fontFamily: 'Tektur',
              }}
            >
              Приступить к уроку 2
            </Button>
          )}
        </Box>
      </div>

      <div className="lesson-right">
        <Editor
          height="400px"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
        />
      </div>

      <Dialog open={showRepeatModal} onClose={handleRepeatCancel}>
        <DialogTitle sx={{ fontFamily: 'Tektur, sans-serif', color: '#374D45' }}>
          Повторное прохождение урока
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#374D45' }}>
            Вы уже проходили этот урок. За повторное прохождение вы получите только 25 XP. Продолжить?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRepeatCancel} sx={{ color: '#374D45' }}>
            Отмена
          </Button>
          <Button onClick={handleRepeatConfirm} sx={{ color: '#374D45' }}>
            Продолжить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Lesson1Python;