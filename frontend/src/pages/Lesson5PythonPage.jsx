import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
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
  const [showRepeatModal, setShowRepeatModal] = useState(false);
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
  };

  const handleSubmit = async () => {
    const correctCode = `# Функция для умножения двух чисел
def multiply(a, b):
    return a * b

# Вызов функции
result = multiply(5, 3)
print(result)`;

    if (code.trim() === correctCode) {
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
            body: JSON.stringify({ course_id: 1, lesson_number: 5 }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setXp(data.points);
          setSubmitted(true);
          setAlreadyCompleted(true);
          alert(`Отлично! Вы получили ${data.xp_added} XP.`);
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
    navigate('/less6python');
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
        body: JSON.stringify({ course_id: 1, lesson_number: 5 }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setXp(data.points);
      setSubmitted(true);
      alert(`Отлично! Вы получили ${data.xp_added} XP.`);
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

        <h1 className="lesson-title">Урок 5: Функции и модули</h1>
        <p className='text-prebig'>
          Что такое функция?
        </p>
        <p>
          Функция - это именованный блок кода, который выполняет определённую задачу и может вызываться множество раз.<br></br><br></br>
          Представь: ты готовишь чай. Каждый раз ты выполняешь одни и те же действия.<br></br> Вместо того, чтобы описывать эти шаги снова и снова, ты создаёшь "функцию" - сделать_чай( ) - и вызываешь её по мере необходимости.
        </p>
        <p>
          В Python функции позволяют повторно использовать код. Вы можете передавать аргументы в функцию и получать значения обратно.<br></br> Модули позволяют организовать код в разные файлы для упрощения и повторного использования.
        </p>
        <ul className="lesson-text">
          <li><strong>def</strong> - ключевое слово для объявления функции.</li>
          <li><strong>return</strong> - используется для возврата значения из функции.</li>
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
    </div>
  );
};

export default Lesson5Python;