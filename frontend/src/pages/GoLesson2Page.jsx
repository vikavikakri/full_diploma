import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './golesson.css';

const Lesson2Go = () => {
  const [code, setCode] = useState(`package main

import "fmt"

func main() {
    for i := 1; i <= тут введи число; i++ {
        fmt.Println(i)
    }
}`);
  const [output, setOutput] = useState('');
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const handleRunCode = () => {
    const loopMatch = code.match(/for\s*i\s*:=\s*1;\s*i\s*<=\s*(\d+);\s*i\+\+\s*{[^}]*fmt\.Println\(i\)/);
  
    if (loopMatch) {
      const limit = parseInt(loopMatch[1]);
      if (!isNaN(limit) && limit > 0) {
        const outputLines = Array.from({ length: limit }, (_, i) => (i + 1).toString());
        setOutput(outputLines.join('\n'));
        return;
      }
    }
  
    // fallback — обычный вывод строк
    const matches = [...code.matchAll(/fmt\.Println\(([^)]+)\)/g)];
    const outputs = matches.map(m => m[1].replace(/["'`]/g, '')).join('\n');
    setOutput(outputs || '⚠️ Не удалось распознать вывод. Убедись, что используешь fmt.Println(...)');
  };
  
  const handleSubmit = () => {
    const normalized = code.replace(/\s/g, '').toLowerCase();
    const expected = `packagemainimport"fmt"funcmain(){fori:=1;i<=5;i++{fmt.println(i)}}`;

    if (normalized === expected) {
      if (!submitted) {
        const newXp = xp + 60;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Отлично! Ты заработал 60 XP!');
    } else {
      alert('Проверь, что ты используешь цикл for и выводишь числа от 1 до 5.');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 2: Условные конструкции и циклы</h1>
        <p className="lesson-text">
          В Go ты можешь использовать <code>if</code>, <code>else</code> и циклы <code>for</code> для построения логики.
        </p>
        <p className="lesson-text">
          Цикл <code>for</code> — это основной способ повторения действий в Go. Пример:
          <pre>
{`for i := 1; i <= 5; i++ {
    fmt.Println(i)
}`}
          </pre>
        </p>
        <p className="lesson-task">
          Задание: Напиши цикл, который выведет числа от <strong>1 до 5</strong> на отдельных строках.
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

export default Lesson2Go;
