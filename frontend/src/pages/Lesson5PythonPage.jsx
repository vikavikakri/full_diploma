import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import { ProfileContext } from '../context/ProfileContext';
import './lesson3python.css';

const Lesson5Python = () => {
  const [code, setCode] = useState(`# Функция для умножения двух чисел
def multiply(a, b):
    return a * b

# Вызов функции
result = multiply(напишите сюда два числа через запятую)
print(result)`);
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
        if (pythonCourse && pythonCourse.completed_lessons.includes(5)) {
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
      const correctCode = `# Функция для умножения двух чисел
def multiply(a, b):
    return a * b

# Вызов функции
result = multiply(5, 3)
print(result)`;
      if (code.trim() === correctCode) {
        setOutput("15");
      } else {
        setOutput("Ошибка: попробуйте снова.");
      }
    } catch (e) {
      setOutput("Ошибка выполнения");
    }
  };

  const handleSubmit = async () => {
    const correctCode = `# Функция для умножения двух чисел
def multiply(a, b):
    return a * b

# Вызов функции
result = multiply(5, 3)
print(result)`;
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
          body: JSON.stringify({ course_id: 1, lesson_number: 5 }),
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
          body: JSON.stringify({ course_id: 1, lesson_number: 5, repeat: true, xp_reward: 25 }),
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
    navigate('/less6python');
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

        <h1 className="lesson-title">Урок 5: Функции и модули</h1>
        <p className='text-prebig'>Что такое функция?</p>
        <p>
          Функция — это именованный блок кода, который выполняет определённую задачу и может вызываться множество раз.<br /><br />
          Представь: ты готовишь чай. Каждый раз ты выполняешь одни и те же действия.<br /> Вместо того, чтобы описывать эти шаги снова и снова, ты создаёшь "функцию" — сделать_чай() — и вызываешь её по мере необходимости.
        </p>
        <p>
          В Python функции позволяют повторно использовать код. Вы можете передавать аргументы в функцию и получать значения обратно.<br /> Модули позволяют организовать код в разные файлы для упрощения и повторного использования.
        </p>
        <ul className="lesson-text">
          <li><strong>def</strong> — ключевое слово для объявления функции.</li>
          <li><strong>return</strong> — используется для возврата значения из функции.</li>
          <li>Модули позволяют организовывать код в разные файлы.</li>
        </ul>
        <p className="lesson-task">
          Задание: создайте функцию <code>multiply(a, b)</code>, которая принимает два числа и возвращает их произведение. Затем вызовите её с числами 5 и 3.
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
              Приступить к уроку 6
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

export default Lesson5Python;