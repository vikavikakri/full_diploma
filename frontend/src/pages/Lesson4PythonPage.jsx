import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './lesson3python.css';

const Lesson4Python = () => {
  const [code, setCode] = useState("for i in range():\n    print(i)");
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
        if (pythonCourse && pythonCourse.completed_lessons.includes(4)) {
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
    const correctCode = "for i in range(5):\n    print(i)";
    if (code.trim() === correctCode) {
      setOutput("0\n1\n2\n3\n4");
    } else {
      setOutput("Ошибка: попробуйте снова.");
    }
  };

  const handleSubmit = async () => {
    const correctCode = "for i in range(5):\n    print(i)";
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
            body: JSON.stringify({ course_id: 1, lesson_number: 4 }),
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
    navigate('/less5python');
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
        body: JSON.stringify({ course_id: 1, lesson_number: 4 }),
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

        <h1 className="lesson-title">Урок 4: Циклы в Python</h1>
        <p className='text-prebig'>
          Что такое цикл?
        </p>
        <p>
          Цикл — это конструкция, которая позволяет повторять действия несколько раз, пока выполняется определённое условие или пока не закончатся данные.<br></br><br></br>
          Пример из жизни:<br></br>
          - Пока не выучишь 10 слов - продолжаешь учить.<br></br>
          - Или: Пройди по каждому студенту в списке и поздравь с праздником.<br></br>
        </p>
        <p>
          В Python используются циклы <strong>for</strong> и <strong>while</strong> для выполнения кода несколько раз.
        </p>
        <ul className="lesson-text">
          <li><strong>for</strong> — используется для итерации по коллекциям (списки, строки и т.д.).</li>
          <li><strong>while</strong> — выполняет блок кода, пока условие истинно.</li>
          <li><strong>break</strong> — используется для прерывания цикла.</li>
        </ul>

        <p className="lesson-task">
          Задание: создайте цикл <code>for i in range(5):</code>, и посмотрите что компилятор будет выдавать.
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
              Приступить к уроку 5
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

export default Lesson4Python;