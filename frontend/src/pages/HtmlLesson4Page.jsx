import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './html1lesson.css';

const Lesson4Css = () => {
  const [code, setCode] = useState(
`<style>
  p {
    color: ;
    font-size: ;
    font-style: italic;
  }
</style>
<p>Я изучаю html css</p>`
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
    const correctAnswer = '<style>p{color:blue;font-size:20px;font-style:italic;}</style><p>примертекста</p>';

    if (normalizedCode === correctAnswer) {
      if (!submitted) {
        const newXp = xp + 92;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Отличная работа! Ты получил 92 XP!');
    } else {
      alert('Проверь, что ты применил стиль к p: цвет blue, размер шрифта 20px и курсив.');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1html" onClick={handleBackClick} aria-label="назад">
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 4: Работа с цветами, шрифтами и текстовыми стилями</h1>
        <p className="lesson-text">
          CSS позволяет изменять цвет текста, размер шрифта, его стиль и многое другое. Вот несколько популярных свойств:
        </p>
        <ul>
          <li><code>color</code> — цвет текста</li>
          <li><code>font-size</code> — размер шрифта</li>
          <li><code>font-style</code> — стиль (например, <code>italic</code> для курсива)</li>
        </ul>

        <p className="lesson-task">
          Задание: сделай параграф <code>&lt;p&gt;</code> с текстом "Пример текста", который будет:
          <ul>
            <li>синим (<code>color: blue</code>)</li>
            <li>размером 20px (<code>font-size: 20px</code>)</li>
            <li>курсивным (<code>font-style: italic</code>)</li>
          </ul>
          Используй тег <code>&lt;style&gt;</code>.
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

export default Lesson4Css;
