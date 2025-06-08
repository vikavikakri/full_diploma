import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './mathlesson.css';

const questions = [
  {
    question: 'Сколько будет 25% от 80?',
    correctAnswer: '20',
  },
  {
    question: 'Если у Пети было 12 яблок и он съел 5, сколько осталось?',
    correctAnswer: '7',
  },
  {
    question: 'Найди среднее арифметическое чисел 10, 20 и 30.',
    correctAnswer: '20',
  },
  {
    question: 'У Маши было 7 карандашей. Она отдала 3. Сколько осталось?',
    correctAnswer: '4',
  },
  {
    question: 'Во сколько раз 36 больше 6?',
    correctAnswer: '6',
  },
];

const MathLesson6 = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [results, setResults] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const newResults = questions.map((q, i) =>
      q.correctAnswer.trim() === answers[i].trim()
    );
    setResults(newResults);
    if (!submitted && newResults.every(r => r)) {
      const newXp = xp + 100;
      setXp(newXp);
      localStorage.setItem('xp', newXp);
      alert('Поздравляем! Все ответы верны — ты получил 100 XP!');
      setSubmitted(true);
    } else if (!newResults.every(r => r)) {
      alert('Некоторые ответы неверны. Попробуй ещё раз!');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Математическая грамотность — Урок 6: Итоговый разбор + тест</h1>
        <p className="lesson-text">
          Отличная работа! Ты прошёл ключевые темы курса: от арифметики до логики. 
          Теперь проверь себя в финальном тесте. Отвечай внимательно, и не забудь нажать «Проверить».
        </p>

        <div className="lesson-note">
          <h3>Вопросы охватывают:</h3>
          <ul>
            <li>Проценты и доли</li>
            <li>Логика и текстовые задачи</li>
            <li>Арифметику и сравнение</li>
            <li>Среднее арифметическое</li>
          </ul>
        </div>
      </div>

      <div className="lesson-right">
        {questions.map((q, index) => (
          <div key={index} className="test-question-box">
            <p><strong>Вопрос {index + 1}:</strong> {q.question}</p>
            <TextField
              label="Ответ"
              variant="outlined"
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              className="input-answ-math"
              sx={{ mb: 1 }}
            />
            {results[index] !== null && (
              <p style={{ color: results[index] ? 'green' : 'red' }}>
                {results[index] ? 'Верно' : 'Неверно'}
              </p>
            )}
          </div>
        ))}

        <Button
          variant="contained"
          className="button-xp-1math"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Проверить и получить XP
        </Button>

        {submitted && (
          <div className="output-box" style={{ marginTop: '20px' }}>
            <p><strong>Ты завершил курс!</strong></p>
            <p>Твой итоговый XP: {xp}</p>
            <p>Продолжай учиться и развивай свои навыки!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathLesson6;
