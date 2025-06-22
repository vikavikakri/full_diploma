import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import { ProfileContext } from '../context/ProfileContext';
import './lesson3python.css';

const Lesson1Python = () => {
  const [code, setCode] = useState("print('')");
  const [output, setOutput] = useState('');
  const [xp, setXp] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [repeatAttempts, setRepeatAttempts] = useState(0); // Счетчик попыток повторного прохождения
  const [showRepeatModal, setShowRepeatModal] = useState(false);
  const [achievementNotification, setAchievementNotification] = useState(null);
  const { showLessonCompletion, showErrorNotification } = useContext(ProfileContext);

  const navigate = useNavigate();

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
          // Проверяем, было ли повторное прохождение
          const repeatCount = pythonCourse.repeat_attempts || 0;
          setRepeatAttempts(repeatCount);
        }
      } catch (error) {
        console.error('Ошибка загрузки прогресса:', error.message);
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
    if (code.trim() !== "print('Привет, мир!')") {
      showErrorNotification('Ошибка: вы неверно решили урок.');
      return;
    }

    if (alreadyCompleted && !submitted) {
      setShowRepeatModal(true);
    } else if (!submitted) {
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
        console.log('Response from /api/progress:', data);
        setXp(data.points);
        setSubmitted(true);
        setAlreadyCompleted(true);

        // Уведомление о прохождении урока
        showLessonCompletion(data.xp_added || 0);

        // Уведомление об ачивках
        if (data.new_achievements && data.new_achievements.length > 0) {
          const message = data.new_achievements.map(a => `Ачивка "${a.name}" +${a.xp_reward} XP`).join('\n');
          setAchievementNotification({
            message: `Поздравляем!\n${message}`,
            timeoutId: setTimeout(() => setAchievementNotification(null), 5000)
          });
        }
      } catch (error) {
        console.error('Ошибка сохранения прогресса:', error.message);
        showErrorNotification('Ошибка сервера при сохранении прогресса.');
      }
    } else if (repeatAttempts < 1) {
      // Разрешаем только одну попытку повторного прохождения
      try {
        const response = await fetch('http://localhost:5000/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({ course_id: 1, lesson_number: 1, repeat: true, xp_reward: 25 }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Response from /api/progress (repeat):', data);
        setXp(data.points);
        setRepeatAttempts(1); // Увеличиваем счетчик попыток до 1
        showLessonCompletion(25); // Уведомление о 25 XP

        // Уведомление об ачивках
        if (data.new_achievements && data.new_achievements.length > 0) {
          const message = data.new_achievements.map(a => `Ачивка "${a.name}" +${a.xp_reward} XP`).join('\n');
          setAchievementNotification({
            message: `Поздравляем!\n${message}`,
            timeoutId: setTimeout(() => setAchievementNotification(null), 5000)
          });
        } else {
          setAchievementNotification({
            message: 'Повторное прохождение успешно! +25 XP',
            timeoutId: setTimeout(() => setAchievementNotification(null), 5000)
          });
        }
      } catch (error) {
        console.error('Ошибка сохранения прогресса (repeat):', error.message);
        showErrorNotification('Ошибка сервера при сохранении прогресса.');
      }
    } else {
      // Третья и последующие попытки
      showErrorNotification('Вы уже прошли этот урок.');
    }
  };

  const handleNextLesson = () => {
    navigate('/less2python');
  };

  const handleRepeatConfirm = () => {
    setShowRepeatModal(false);
    handleSubmit(); // Используем существующую логику handleSubmit для повторного прохождения
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

      {achievementNotification && (
        <Snackbar
          open={true}
          onClose={() => setAchievementNotification(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          className="achievement-snackbar"
          style={{ transition: 'all 0.5s ease-in-out', padding: '2px 0' }}
        >
          <Alert severity="success">
            {achievementNotification.message.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Lesson1Python;