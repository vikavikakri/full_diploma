import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './html1lesson.css';

const Lesson2Html = () => {
  const [code, setCode] = useState('<ul>\n  <li>Напиши сюда</li>\n  <li>И сюда</li>\n</ul>');
  const [output, setOutput] = useState('');
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRunCode = () => {
    setOutput(code);
  };

  const handleSubmit = () => {
    const normalizedCode = code.replace(/\s/g, '').toLowerCase();
    const correctAnswer = '<ul><li>первый</li><li>второй</li></ul>';

    if (normalizedCode === correctAnswer) {
      if (!submitted) {
        const newXp = xp + 67;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Отлично! Ты получил 67 XP!');
    } else {
      alert('Проверь, чтобы был список <ul> с двумя пунктами: Первый и Второй');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1html" onClick={handleBackClick} aria-label="назад">
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 2: Списки, таблицы и формы</h1>
        <p className="lesson-text">
          HTML позволяет создавать списки, таблицы и формы для отображения и ввода информации.
          Неупорядоченные списки создаются с помощью тега <strong>&lt;ul&gt;</strong>, а пункты списка — через <strong>&lt;li&gt;</strong>.
        </p>

        <p className="lesson-task">
          Задание: создай список с двумя пунктами: <strong>Первый</strong> и <strong>Второй</strong> с помощью тегов <code>&lt;ul&gt;</code> и <code>&lt;li&gt;</code>.
        </p>

        <Button variant="contained" className='button-go-1html' onClick={handleRunCode} sx={{ mt: 2 }}>
          ▶ Запустить код
        </Button>
        <div className="output-box">
          <div dangerouslySetInnerHTML={{ __html: output }} />
        </div>

        <Button variant="outlined" className='button-xp-1html' onClick={handleSubmit} sx={{ mt: 2 }}>
          Отправить и получить XP
        </Button>
      </div>

      <div className="lesson-right">
        <Editor
          height="400px"
          defaultLanguage="html"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
        />
      </div>
    </div>
  );
};

export default Lesson2Html;
