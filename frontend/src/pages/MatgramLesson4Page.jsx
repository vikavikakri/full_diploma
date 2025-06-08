import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './mathlesson.css';

const MathLesson4 = () => {
  const [answer, setAnswer] = useState('');
  const [output, setOutput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const handleCheckAnswer = () => {
    const correctAnswer = 'апельсины';
    if (answer.trim().toLowerCase() === correctAnswer) {
      setOutput('Верно! Апельсины были проданы в наибольшем количестве.');
      if (!submitted) {
        const newXp = xp + 85;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
    } else {
      setOutput('Неверно. Посмотри на таблицу и сравни количество проданных фруктов.');
    }
  };

  const handleSubmit = () => {
    const normalized = answer.trim().toLowerCase();
    const expected = 'апельсины';
    if (normalized === expected) {
      if (!submitted) {
        const newXp = xp + 85;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Молодец! Ты заработал 85 XP!');
    } else {
      alert('Попробуй снова. Посмотри внимательно на данные в таблице.');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Математическая грамотность — Урок 4: Таблицы, диаграммы и графики</h1>
        <p className="lesson-text">
          Таблицы и диаграммы — это отличный способ наглядно представить информацию и данные.
        </p>
        <div className="lesson-note">
          <h3>Запомни:</h3>
          <ul>
            <li>Таблицы содержат строки и столбцы для организации данных.</li>
            <li>Столбчатые диаграммы показывают сравнение величин.</li>
            <li>Круговые диаграммы показывают доли целого.</li>
            <li>Линейные графики отображают изменение данных во времени.</li>
          </ul>
        </div>
      </div>

      <div className="lesson-right">
      <div className="lesson-table">
          <h4>Продажа фруктов за день:</h4>
          <table>
            <thead>
              <tr>
                <th>Фрукт</th>
                <th>Количество (шт.)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Яблоки</td><td>45</td></tr>
              <tr><td>Бананы</td><td>38</td></tr>
              <tr><td>Апельсины</td><td>52</td></tr>
              <tr><td>Груши</td><td>29</td></tr>
            </tbody>
          </table>
        </div>
        <p className="lesson-task">
          Задание: Какой фрукт был продан в наибольшем количестве?
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

export default MathLesson4;
