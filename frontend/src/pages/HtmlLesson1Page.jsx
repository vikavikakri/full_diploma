import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import Editor from '@monaco-editor/react';
import './html1lesson.css';

const Lesson1Html = () => {
  const [code, setCode] = useState('<h1>Нужно написать сюда</h1>');
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
    if (code.trim().toLowerCase() === '<h1>hello, world!</h1>') {
      if (!submitted) {
        const newXp = xp + 50;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Молодец! Ты получил 50 XP!');
    } else {
      alert('Проверь, чтобы в коде было именно <h1>Hello, world!</h1>');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1html" onClick={handleBackClick} aria-label="назад">
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 1: Введение в HTML</h1>
        <p className="lesson-text">
          HTML (HyperText Markup Language) — это язык разметки, с помощью которого создаются веб-страницы.
          Самый простой способ вывести текст — использовать тег <strong>&lt;h1&gt;</strong>, который обозначает заголовок.
        </p>

        <p className="lesson-task">
          Задание: напиши HTML-код, который выведет заголовок <strong>Hello, world!</strong> с помощью тега <code>&lt;h1&gt;</code>.
        </p>

        <Button variant="contained" className='button-go-1html' onClick={handleRunCode} sx={{ mt: 2 }}>
          ▶ Запустить код
        </Button>
        <div className="output-box">
          <pre>{output}</pre>
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

export default Lesson1Html;
