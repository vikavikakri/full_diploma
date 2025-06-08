import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './mathlesson.css';

const MathLesson2 = () => {
  const [answer, setAnswer] = useState('');
  const [output, setOutput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const handleCheckAnswer = () => {
    const correctAnswer = '20';
    if (answer.trim() === correctAnswer) {
      setOutput('Верно! Ты отлично разобрался с процентами.');
      if (!submitted) {
        const newXp = xp + 67;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
    } else {
      setOutput('Неверно. Попробуй снова. Вспомни, как считать проценты.');
    }
  };

  const handleSubmit = () => {
    const normalized = answer.trim();
    const expected = '20';
    if (normalized === expected) {
      if (!submitted) {
        const newXp = xp + 67;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Молодец! Ты заработал 67 XP!');
    } else {
      alert('Ответ неверный. Проверь свои вычисления.');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Математическая грамотность — Урок 2: Проценты, пропорции и доли</h1>
        <p className="lesson-text">
          В этом уроке ты узнаешь, как работать с процентами, пропорциями и долями. Эти понятия часто встречаются в задачах на ЕНТ.
        </p>
        <div className="lesson-note">
          <h3>Полезно знать:</h3>
          <ul>
            <li>1% — это 1/100 от числа</li>
            <li>Чтобы найти X% от числа N: (X / 100) × N</li>
            <li>Пропорция: a / b = c / d</li>
            <li>Доля: часть от целого, например, 1/4 — это четверть</li>
          </ul>
          <p>Умение быстро и точно находить проценты и работать с пропорциями поможет набрать больше баллов.</p>
        </div>
      </div>

      <div className="lesson-right">
        <p className="lesson-task">
          Задание: Найди 20% от числа 100.
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

export default MathLesson2;
