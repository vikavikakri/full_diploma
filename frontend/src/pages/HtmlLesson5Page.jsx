import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './html1lesson.css';

const Lesson5Css = () => {
  const [code, setCode] = useState(`<div class="card">
  <h2>напиши сюда свое Имя</h2>
  <p>Frontend Developer</p>
</div>

<style>
  .card {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    width: 250px;
    font-family: Arial, sans-serif;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    border: 1px solid #ddd;
    margin: 20px auto;
  }

  .card h2 {
    color: #2c3e50;
    margin-bottom: 10px;
  }

  .card p {
    color: #555;
    font-size: 16px;
  }
</style>`);
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
    const requiredTags = ['<divclass="card">', '<h2>', '<p>', 'background-color:', 'box-shadow:', 'border:', 'padding:', 'text-align:', 'font-family:'];

    const isCorrect = requiredTags.every(tag => normalizedCode.includes(tag));

    if (isCorrect) {
      if (!submitted) {
        const newXp = xp + 100;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Отлично! Ты получил 100 XP!');
    } else {
      alert('Проверь, что в карточке есть стили: цвет, отступы, выравнивание, тени, шрифт.');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1html" onClick={handleBackClick} aria-label="назад">
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 5: Карточка профиля / визитка</h1>
        <p className="lesson-text">
          В этом задании ты создашь стильную карточку пользователя, используя CSS: цвета, шрифты, тени, рамки и выравнивание.
          Это отличная практика, чтобы объединить всё, что ты узнал.
        </p>

        <p className="lesson-task">
          Задание: создай блок <code>&lt;div class="card"&gt;</code> с заголовком <code>&lt;h2&gt;</code> и подписью <code>&lt;p&gt;</code>. 
          Добавь стили: фоновый цвет, отступы, тень, рамку, выравнивание, шрифт.
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

export default Lesson5Css;
