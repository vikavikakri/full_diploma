import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import { ProfileContext } from '../context/ProfileContext';
import './lesson3python.css';

const Lesson13Python = () => {
  const [code, setCode] = useState("age = 10\nmessage = ''\nprint(message)");
  const [output, setOutput] = useState('');
  const [xp, setXp] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [repeatAttempts, setRepeatAttempts] = useState(0);
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
        if (pythonCourse && pythonCourse.completed_lessons.includes(13)) {
          setAlreadyCompleted(true);
          setSubmitted(true);
          const repeatCount = pythonCourse.repeat_attempts || 0;
          setRepeatAttempts(repeatCount);
        }
      } catch (error) {
        console.error('Ошибка загрузки прогресса:', error.message);
        showErrorNotification('Ошибка загрузки прогресса.');
      }
    };
    fetchProgress();
  }, []);

  const handleBackClick = () => {
    navigate('/python');
  };

  const handleRunCode = async () => {
    try {
      const correctCode = "age = 10\nmessage = f'Мне {age} лет'\nprint(message)";
      if (code.trim() === correctCode) {
        setOutput("Мне 10 лет");
      } else {
        setOutput("Ошибка: попробуйте снова.");
      }
    } catch (e) {
      setOutput("Ошибка выполнения");
    }
  };

  const handleSubmit = async () => {
    const correctCode = "age = 10\nmessage = f'Мне {age} лет'\nprint(message)";
    if (code.trim() !== correctCode) {
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
          body: JSON.stringify({ course_id: 1, lesson_number: 13 }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Response from /api/progress:', data);
        setXp(data.points);
        setSubmitted(true);
        setAlreadyCompleted(true);

        showLessonCompletion(data.xp_added || 0);

        if (data.new_achievements && Array.isArray(data.new_achievements) && data.new_achievements.length > 0) {
          const message = data.new_achievements
            .map(a => `Ачивка "${a.name || 'Неизвестная ачивка'}" +${a.xp_reward || 0} XP`)
            .join('\n');
          setAchievementNotification({
            message,
            timeoutId: setTimeout(() => setAchievementNotification(null), 5000),
          });
        }
      } catch (error) {
        console.error('Ошибка сохранения прогресса:', error.message);
        showErrorNotification('Ошибка сервера при сохранении прогресса.');
      }
    } else if (repeatAttempts < 1) {
      try {
        const response = await fetch('http://localhost:5000/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({ course_id: 1, lesson_number: 13, repeat: true, xp_reward: 25 }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Response from /api/progress (repeat):', data);
        setXp(data.points);
        setRepeatAttempts(1);
        showLessonCompletion(25);

        if (data.new_achievements && Array.isArray(data.new_achievements) && data.new_achievements.length > 0) {
          const message = data.new_achievements
            .map(a => `Ачивка "${a.name || 'Неизвестная ачивка'}" +${a.xp_reward || 0} XP`)
            .join('\n');
          setAchievementNotification({
            message,
            timeoutId: setTimeout(() => setAchievementNotification(null), 5000),
          });
        } else {
          setAchievementNotification({
            message: 'Повторное прохождение успешно! +25 XP',
            timeoutId: setTimeout(() => setAchievementNotification(null), 5000),
          });
        }
      } catch (error) {
        console.error('Ошибка сохранения прогресса (repeat):', error.message);
        showErrorNotification('Ошибка сервера при сохранении прогресса.');
      }
    } else {
      showErrorNotification('Вы уже прошли этот урок.');
    }
  };

  const handleNextLesson = () => {
    navigate('/less14python');
  };

  const handleRepeatConfirm = () => {
    setShowRepeatModal(false);
    handleSubmit();
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

        <h1 className="lesson-title">Урок 13: Простая обработка строк</h1>
        <p className="text-prebig">Как комбинировать строки и числа?</p>
        <p>
          В Python ты можешь создавать строки, комбинируя текст и числа, с помощью f-строк. F-строки позволяют вставлять значения переменных прямо в текст, делая код удобным и читаемым.
        </p>
        <p>
          Чтобы создать f-строку, поставь букву <code>f</code> перед кавычками и используй фигурные скобки для переменных. Например:
          <ul>
            <li><code>age = 10</code> — переменная с числом.</li>
            <li><code>f'Мне "age" лет'</code> — создаёт строку <code>Мне 10 лет</code>.</li>
          </ul>
          F-строки — это современный способ форматирования строк, который ты можешь использовать вместо конкатенации из урока 9.
        </p>
        <p>
          Пример из жизни: если ты пишешь программу, которая выводит информацию о пользователе, f-строки помогут создать понятное сообщение, например, <code>Мне 10 лет</code>.
        </p>
        <ul className="lesson-text">
          <li><strong>f-строка</strong>: Форматирует строку с переменными, например, <code>f'Текст "variable"'</code>.</li>
          <li><strong>Применение</strong>: Используй f-строки для создания сообщений.</li>
        </ul>
        <p className="lesson-task">
          Задание: создайте переменную <code>age</code> со значением <code>10</code>. Используйте f-строку, чтобы создать сообщение <code>message</code> в формате <code>Мне 10 лет</code>. Выведите сообщение.
        </p>

        <Button variant="contained" className="button-go-1put" onClick={handleRunCode} sx={{ mt: 2 }}>
          ▶ Запустить код
        </Button>
        <div className="output-box">
          <pre>{output}</pre>
        </div>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="outlined" className="button-xp-1put" onClick={handleSubmit} sx={{ mt: 0 }}>
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
              Приступить к уроку 14
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

      <Snackbar
        open={!!achievementNotification}
        onClose={() => setAchievementNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className="achievement-snackbar"
        style={{ transition: 'all 0.5s ease-in-out', padding: '2px 0' }}
      >
        {achievementNotification && (
          <Alert severity="success">
            {achievementNotification.message.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default Lesson13Python;