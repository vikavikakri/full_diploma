import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './mathlesson.css';

const MathLesson1 = () => {
  const [answer, setAnswer] = useState('');
  const [output, setOutput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const handleCheckAnswer = () => {
    const correctAnswer = '56';
    if (answer.trim() === correctAnswer) {
      setOutput('Верно! Отличная работа.');
      if (!submitted) {
        const newXp = xp + 50;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
    } else {
      setOutput('Неверно. Попробуй ещё раз.');
    }
  };

  const handleSubmit = () => {
    const normalized = answer.trim();
    const expected = '56';
  
    if (normalized === expected) {
      if (!submitted) {
        const newXp = xp + 50;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Молодец! Ты заработал 50 XP!');
    } else {
      alert('Проверь свой ответ. Убедись, что ты ввёл правильное число.');
    }
  };
  

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Математическая грамотность — Урок 1: Числа и арифметические действия</h1>
        <p className="lesson-text">
          В этом уроке мы повторим основные арифметические действия: сложение, вычитание, умножение и деление.
          Умение быстро и правильно выполнять действия с числами — основа успешной сдачи ЕНТ по математической грамотности.
        </p>
        <div className="lesson-note">
          <h3>Полезно знать:</h3>
          <ul>
            <li>Сложение: a + b</li>
            <li>Вычитание: a - b</li>
            <li>Умножение: a × b</li>
            <li>Деление: a ÷ b</li>
          </ul>
          <p>Тренируйся быстро определять результат арифметических выражений.</p>
        </div>
      </div>

      <div className="lesson-right">

        <p className="lesson-task">
          Задание: Вычисли значение выражения <code>7 × 8</code> и введи ответ ниже.
        </p>

        <TextField
          label="Ответ"
          variant="outlined"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="input-answ-math"
          sx={{ mt: 2 }}
        />

        <Button
          variant="contained"
          className='button-math-check'
          onClick={handleCheckAnswer}
          sx={{ mt: 2 }}
        >
          Проверить
        </Button>

        <div className="output-box">
          <pre>{output}</pre>
        </div>
        <Button variant="outlined" className='button-xp-1math' onClick={handleSubmit} sx={{ mt: 2 }}>
          Отправить и получить XP
        </Button>
      </div>
    </div>
  );
};

export default MathLesson1;
