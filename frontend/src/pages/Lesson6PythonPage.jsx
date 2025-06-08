import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './lesson3python.css';

const Lesson6Python = () => {
  const [code, setCode] = useState(`# Список чисел
numbers = [напишите тут список чисел через запятую]

# Нахождение четных чисел
even_numbers = [num for num in numbers if num % 2 == 0]
print("Четные числа:", even_numbers)

# Сумма всех чисел
total_sum = sum(numbers)
print("Сумма всех чисел в списке:", total_sum)`);
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
        if (pythonCourse && pythonCourse.completed_lessons.includes(6)) {
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
    navigate(-1);
  };

  const handleRunCode = async () => {
    const correctCode = `# Список чисел
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Нахождение четных чисел
even_numbers = [num for num in numbers if num % 2 == 0]
print("Четные числа:", even_numbers)

# Сумма всех чисел
total_sum = sum(numbers)
print("Сумма всех чисел в списке:", total_sum)`;

    if (code.trim() === correctCode) {
      setOutput("Четные числа: [2, 4, 6, 8, 10]\nСумма всех чисел в списке: 55");
    } else {
      setOutput("Ошибка: попробуйте снова.");
    }
  };

  const handleSubmit = async () => {
    const correctCode = `# Список чисел
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Нахождение четных чисел
even_numbers = [num for num in numbers if num % 2 == 0]
print("Четные числа:", even_numbers)

# Сумма всех чисел
total_sum = sum(numbers)
print("Сумма всех чисел в списке:", total_sum)`;

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
            body: JSON.stringify({ course_id: 1, lesson_number: 6 }),
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

  const handleCourseComplete = () => {
    alert('Поздравляем! Вы завершили курс Python!');
    navigate('/python');
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
        body: JSON.stringify({ course_id: 1, lesson_number: 6 }),
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

        <h1 className="lesson-title">Урок 6: Списки и циклы</h1>
        <p className='text-prebig'>
          Что такое список?
        </p>
        <p>
          Список (list) — это упорядоченная коллекция значений, которые могут быть изменены.<br></br> Списки в Python обозначаются квадратными скобками [ ].
        </p>
        <p>
          Списки — это коллекции элементов в Python, которые могут содержать любые типы данных. Циклы позволяют перебирать элементы списка и выполнять действия с каждым элементом.
        </p>
        <ul className="lesson-text">
          <li><strong>Список</strong> — упорядоченная коллекция элементов.</li>
          <li><strong>Цикл for</strong> — для перебора всех элементов списка.</li>
          <li><strong>Условие</strong> — для фильтрации элементов в цикле.</li>
        </ul>

        <p className="lesson-task">
          Задание: создайте список чисел от 1 до 10, затем найдите все чётные числа в списке и вычислите сумму всех чисел.
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
              onClick={handleCourseComplete}
              sx={{
                backgroundColor: '#ffd54f',
                borderRadius: '8px',
                color: '#3a5a40',
                border: '3px solid #3a5a40',
                fontFamily: 'Tektur',
              }}
            >
              Завершить курс
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

export default Lesson6Python;