import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import { ProfileContext } from '../context/ProfileContext';
import './lesson3python.css';

const Lesson7Python = () => {
  const [code, setCode] = useState("text = 'hello world'\nupper_text = \nwords = \nprint(upper_text)\nprint(words)");
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
        if (pythonCourse && pythonCourse.completed_lessons.includes(8)) {
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
      const correctCode = "text = 'hello world'\nupper_text = text.upper()\nwords = text.split()\nprint(upper_text)\nprint(words)";
      if (code.trim() === correctCode) {
        setOutput("HELLO WORLD\n['hello', 'world']");
      } else {
        setOutput("Ошибка: попробуйте снова.");
      }
    } catch (e) {
      setOutput("Ошибка выполнения");
    }
  };

  const handleSubmit = async () => {
    const correctCode = "text = 'hello world'\nupper_text = text.upper()\nwords = text.split()\nprint(upper_text)\nprint(words)";
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
          body: JSON.stringify({ course_id: 1, lesson_number: 8 }),
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
          body: JSON.stringify({ course_id: 1, lesson_number: 8, repeat: true, xp_reward: 25 }),
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
    navigate('/less8python');
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

        <h1 className="lesson-title">Урок 7: Строки и их методы</h1>
        <p className="text-prebig">Что такое строки?</p>
        <p>
          Строки — это один из самых важных типов данных в Python. Это последовательность символов, таких как буквы, цифры или знаки, заключённая в кавычки. Например, <code>'Привет'</code> или <code>"hello world"</code>. Строки используются повсюду: для вывода текста, ввода от пользователя или обработки сообщений.
        </p>
        <p>
          В Python у строк есть специальные функции, которые называются <strong>методами</strong>. Они позволяют изменять или анализировать текст. Например, ты можешь сделать все буквы заглавными или разбить строку на слова. Методы — это как команды, которые ты даёшь строке.
        </p>
        <p>
          Вот несколько популярных методов строк:
          <ul>
            <li><code>upper()</code>: делает все буквы заглавными. Например, <code>'hello'.upper()</code> вернёт <code>'HELLO'</code>.</li>
            <li><code>lower()</code>: делает все буквы строчными. Например, <code>'WORLD'.lower()</code> вернёт <code>'world'</code>.</li>
            <li><code>split()</code>: разбивает строку на список слов. Например, <code>'hello world'.split()</code> вернёт <code>['hello', 'world']</code>.</li>
            <li><code>strip()</code>: убирает пробелы в начале и конце строки. Например, <code>'  hi  '.strip()</code> вернёт <code>'hi'</code>.</li>
          </ul>
          Пример из жизни: если ты получил сообщение от друга <code>"привет, как дела?"</code>, ты можешь использовать <code>upper()</code>, чтобы ответить громко: <code>"ПРИВЕТ, КАК ДЕЛА?"</code>!
        </p>
        <p>
          Чтобы использовать метод, напиши имя строки, точку и название метода. Например: <code>text = 'hello'; print(text.upper())</code>. Методы не меняют саму строку, а создают новую версию.
        </p>
        <ul className="lesson-text">
          <li><strong>Строка</strong> — текст в кавычках, например, <code>'hello'</code>.</li>
          <li><strong>Методы строк</strong> — команды вроде <code>upper()</code> или <code>split()</code>.</li>
          <li><strong>Вызов метода</strong>: строка, точка, метод, например, <code>text.upper()</code>.</li>
        </ul>
        <p className="lesson-task">
          Задание: создайте строку <code>text</code> со значением <code>'hello world'</code>. Используйте метод <code>upper()</code>, чтобы сделать текст заглавным, и сохраните результат в <code>upper_text</code>. Затем используйте <code>split()</code>, чтобы разбить строку на слова, и сохраните результат в <code>words</code>. Выведите оба результата.
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
              Приступить к уроку 8
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

export default Lesson7Python;