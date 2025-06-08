import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './golesson.css';

const Lesson1Go = () => {
  const [code, setCode] = useState(`package main

import "fmt"

func main() {
    fmt.Println("напиши сюда")
}`);
  const [output, setOutput] = useState('');
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const handleRunCode = () => {
    const match = code.match(/fmt\.Println\(["'`](.+?)["'`]\)/);
    if (match && match[1]) {
      setOutput(match[1]);
    } else {
      setOutput('⚠️ Не удалось распознать вывод. Убедись, что ты используешь fmt.Println("...")');
    }
  };

  const handleSubmit = () => {
    const normalized = code.replace(/\s/g, '').toLowerCase();
    const expected = `packagemainimport"fmt"funcmain(){fmt.println("привет,go!")}`;

    if (normalized === expected) {
      if (!submitted) {
        const newXp = xp + 50;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Молодец! Ты заработал 50 XP!');
    } else {
      alert('Убедись, что ты написал полный минимальный Go-код с выводом "Привет, Go!"');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 1: Введение в Go и основы синтаксиса</h1>
        <p className="lesson-text">
          Go (или Golang) — это компилируемый язык программирования от Google. Он прост, быстрый и подходит для создания веб-сервисов и многопоточных приложений.
        </p>
        <p className="lesson-text">
          Минимальная Go-программа выглядит так:
          <pre>
{`package main

import "fmt"

func main() {
    fmt.Println("Привет, Go!")
}`}
          </pre>
        </p>
        <p className="lesson-task">
          Задание: Напиши минимальную программу на Go, которая выведет <strong>"Привет, Go!"</strong>
        </p>

        <Button variant="contained" className='button-go-1go' onClick={handleRunCode} sx={{ mt: 2 }}>
          ▶ Запустить код
        </Button>
        <div className="output-box">
          <pre>{output}</pre>
        </div>

        <Button variant="outlined" className='button-xp-1go' onClick={handleSubmit} sx={{ mt: 2 }}>
          Отправить и получить XP
        </Button>
      </div>

      <div className="lesson-right">
        <Editor
          height="400px"
          defaultLanguage="go"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
        />
      </div>
    </div>
  );
};

export default Lesson1Go;
