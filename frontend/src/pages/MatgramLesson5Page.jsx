import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './mathlesson.css';

const MathLesson5 = () => {
  const [answer, setAnswer] = useState('');
  const [output, setOutput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const handleCheckAnswer = () => {
    const correctAnswer = '7';
    if (answer.trim() === correctAnswer) {
      setOutput('Правильно! У Маши было 7 карандашей.');
      if (!submitted) {
        const newXp = xp + 92;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
    } else {
      setOutput('Неверно. Попробуй представить, сколько было у Маши до того, как она дала 3 Саше.');
    }
  };

  const handleSubmit = () => {
    const normalized = answer.trim();
    const expected = '7';
    if (normalized === expected) {
      if (!submitted) {
        const newXp = xp + 92;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Отлично! Ты получил 92 XP!');
    } else {
      alert('Неправильно. Подумай ещё раз — используй логику!');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Математическая грамотность — Урок 5: Логика и текстовые задачи</h1>
        <p className="lesson-text">
          Логические задачи и текстовые примеры учат нас использовать математические знания в реальных ситуациях.
          Здесь важны внимание, анализ и умение делать выводы.
        </p>
        <div className="lesson-note">
          <h3>Советы:</h3>
          <ul>
            <li>Выделяй ключевую информацию в тексте.</li>
            <li>Пытайся визуализировать задачу.</li>
            <li>Не спеши — проверь, что ответ логичен.</li>
            <li>Записывай условия — это помогает!</li>
          </ul>
        </div>
      </div>

      <div className="lesson-right">
      <div className="logic-task-box">
          <h4>Задача:</h4>
          <p>
            У Маши было несколько карандашей. Она дала 3 карандаша Саше, и у неё осталось 4 карандаша.
            Сколько карандашей было у Маши изначально?
          </p>
        </div>
        <p className="lesson-task">
          Введи свой ответ (только число):
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

export default MathLesson5;
