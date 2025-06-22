import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import { ProfileContext } from '../context/ProfileContext';
import './lesson3python.css';

const Lesson14Python = () => {
  const [code, setCode] = useState("a = 6\nb = 2\nop = '+'\nif op == '+':\n    print()\n");
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
        if (pythonCourse && pythonCourse.completed_lessons.includes(14)) {
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
      const correctCode = "a = 6\nb = 2\nop = '+'\nif op == '+':\n    print(a + b)";
      if (code.trim() === correctCode) {
        setOutput("8");
      } else {
        setOutput("Ошибка: попробуйте снова.");
      }
    } catch (e) {
      setOutput("Ошибка выполнения");
    }
  };

  const handleSubmit = async () => {
    const correctCode = "a = 6\nb = 2\nop = '+'\nif op == '+':\n    print(a + b)";
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
          body: JSON.stringify({ course_id: 1, lesson_number: 14 }),
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
          body: JSON.stringify({ course_id: 1, lesson_number: 14, repeat: true, xp_reward: 25 }),
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
    navigate('/less15python');
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

        <h1 className="lesson-title">Урок 14: Мини-калькулятор</h1>
        <p className="text-prebig">Как создать простой калькулятор?</p>
        <p>
          Ты можешь создать программу, которая выполняет арифметические операции, используя условия. Например, программа может сложить два числа, если выбрана операция сложения.
        </p>
        <p>
          Чтобы проверить, какая операция выбрана, используй условие <code>if</code>. Например:
          <ul>
            <li><code>a = 6</code>, <code>b = 2</code> — числа.</li>
            <li><code>op = '+'</code> — операция сложения.</li>
            <li><code>if op == '+': print(a + b)</code> — выполняет сложение и выводит результат.</li>
          </ul>
          Для <code>a = 6</code>, <code>b = 2</code>, <code>op = '+'</code> результат будет <code>6 + 2 = 8</code>.
        </p>
        <p>
          Пример из жизни: если ты пишешь калькулятор для магазина, ты можешь использовать условия, чтобы выполнять разные операции с ценами.
        </p>
        <ul className="lesson-text">
          <li><strong>if</strong>: Проверяет, какая операция выбрана.</li>
          <li><strong>Арифметика</strong>: Выполняет операцию, например, <code>a + b</code>.</li>
          <li><strong>Применение</strong>: Создавай программы для вычислений.</li>
        </ul>
        <p className="lesson-task">
          Задание: создайте переменные <code>a = 6</code>, <code>b = 2</code> и <code>op = '+'</code>. Используйте условие <code>if</code>, чтобы вывести результат сложения <code>a + b</code>, если <code>op</code> равно <code>'+'</code>.
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
              Приступить к уроку 15
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

export default Lesson14Python;