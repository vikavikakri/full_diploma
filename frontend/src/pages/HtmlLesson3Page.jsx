import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './html1lesson.css';

const Lesson3Css = () => {
  const [code, setCode] = useState(
`<style>
  h1 {
    color: ;
  }
</style>
<h1>Заголовок</h1>`
  );
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
    const correctAnswer = '<style>h1{color:red;}</style><h1>заголовок</h1>';

    if (normalizedCode === correctAnswer) {
      if (!submitted) {
        const newXp = xp + 80;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Молодец! Ты получил 80 XP!');
    } else {
      alert('Убедись, что у тебя есть стиль <style> для h1 с цветом red и заголовок h1 с текстом "Заголовок".');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1html" onClick={handleBackClick} aria-label="назад">
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 3: Введение в CSS</h1>
        <p className="lesson-text">
          CSS — это язык стилей, который используется для оформления HTML. Стили можно добавлять прямо в HTML через тег <code>&lt;style&gt;</code>.
          Например, чтобы сделать заголовок <code>h1</code> красным, можно написать:
        </p>
        <pre>
{`<style>
  h1 {
    color: red;
  }
</style>`}
        </pre>
        <p className="lesson-task">
          Задание: сделай заголовок <code>h1</code> с текстом "Заголовок", который будет окрашен в красный цвет с помощью тега <code>&lt;style&gt;</code>.
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

export default Lesson3Css;
