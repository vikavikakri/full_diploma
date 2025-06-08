import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './mathlesson.css';

const MathLesson3 = () => {
  const [answer, setAnswer] = useState('');
  const [output, setOutput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const handleCheckAnswer = () => {
    const correctAnswer = '50';
    if (answer.trim() === correctAnswer) {
      setOutput('Верно! Ты правильно применил формулу пути.');
      if (!submitted) {
        const newXp = xp + 78;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
    } else {
      setOutput('Неверно. Подумай ещё раз, используй формулу S = V × t.');
    }
  };

  const handleSubmit = () => {
    const normalized = answer.trim();
    const expected = '50';
    if (normalized === expected) {
      if (!submitted) {
        const newXp = xp + 78;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Отлично! Ты получил 78 XP!');
    } else {
      alert('Проверь вычисления и единицы измерения.');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Математическая грамотность — Урок 3: Единицы измерения и формулы</h1>
        <p className="lesson-text">
          На этом уроке ты изучишь важные единицы измерения, а также узнаешь, как применять основные формулы.
        </p>
        <div className="lesson-note">
          <h3>Запомни:</h3>
          <ul>
            <li>Скорость (V) измеряется в км/ч или м/с</li>
            <li>Время (t) — в часах, минутах или секундах</li>
            <li>Путь (S) — в километрах или метрах</li>
            <li>Формула пути: <strong>S = V × t</strong></li>
            <li>Формула площади прямоугольника: <strong>S = a × b</strong></li>
          </ul>
          <p>Важно правильно переводить единицы измерения и применять формулы в нужном контексте.</p>
        </div>
      </div>

      <div className="lesson-right">
        <p className="lesson-task">
          Задание: Машина ехала со скоростью 25 км/ч в течение 2 часов. Какой путь она проехала?
        </p>

        <TextField
          label="Ответ (в км)"
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

export default MathLesson3;
