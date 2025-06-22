import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import { ProfileContext } from '../context/ProfileContext';
import './lesson3python.css';

const Lesson3Python = () => {
  const [code, setCode] = useState("x = \nif x > 10:\n    print('')");
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
        if (pythonCourse && pythonCourse.completed_lessons.includes(3)) {
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
      const correctCode = "x = 15\nif x > 10:\n    print('x больше 10')";
      if (code.trim() === correctCode) {
        setOutput("x больше 10");
      } else {
        setOutput("Ошибка: попробуйте снова.");
      }
    } catch (e) {
      setOutput("Ошибка выполнения");
    }
  };

  const handleSubmit = async () => {
    const correctCode = "x = 15\nif x > 10:\n    print('x больше 10')";
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
          body: JSON.stringify({ course_id: 1, lesson_number: 3 }),
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
      try {
        const response = await fetch('http://localhost:5000/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({ course_id: 1, lesson_number: 3, repeat: true, xp_reward: 25 }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Response from /api/progress (repeat):', data);
        setXp(data.points);
        setRepeatAttempts(1);
        showLessonCompletion(25);

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
      showErrorNotification('Вы уже прошли этот урок.');
    }
  };

  const handleNextLesson = () => {
    navigate('/less4python');
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

        <h1 className="lesson-title">Урок 3: Условные операторы и логика</h1>
        <p>
          Условные операторы позволяют принимать решения в программе. Благодаря им мы можем сделать так, чтобы код выполнялся только при соблюдении определённых условий.<br /><br />
          Простой пример из жизни:<br />
          - Если ты голоден, то иди есть.<br />
          - Иначе - учись дальше.<br />
        </p>
        <p>
          В Python можно использовать условные конструкции для выполнения кода только при выполнении определённых условий.
        </p>
        <ul className="lesson-text">
          <li><strong>if</strong> — если условие истинно, выполнить блок</li>
          <li><strong>elif</strong> — иначе если</li>
          <li><strong>else</strong> — иначе</li>
        </ul>
        <p className="lesson-task">
          Задание: создайте переменную <code>x = 15</code>. Если <code>x</code> больше <code>10</code>, выведите <strong>"x больше 10"</strong>.
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
              Приступить к уроку 4
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

export default Lesson3Python;