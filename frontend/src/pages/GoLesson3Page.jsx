import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './golesson.css';

const Lesson3Go = () => {
  const [code, setCode] = useState(`package main

import "fmt"

func printNames(names []string) {
    for _, name := range names {
        fmt.Println(name)
    }
}

func main() {
    people := []string{"Напиши тут имена через запятую в скобках"}
    printNames(people)
}`);
  const [output, setOutput] = useState('');
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const handleRunCode = () => {
    const sliceMatch = code.match(/people\s*:=\s*\[\]\s*string\s*{([^}]+)}/);
    if (sliceMatch) {
      const namesRaw = sliceMatch[1];
      const names = namesRaw.split(',').map(n => n.trim().replace(/["'`]/g, ''));
      setOutput(names.join('\n'));
    } else {
      setOutput('⚠️ Не удалось найти слайс people. Убедись, что ты передаёшь []string в функцию и печатаешь его элементы.');
    }
  };

  const handleSubmit = () => {
    const normalized = code.replace(/\s/g, '').toLowerCase();
    const containsFunc = normalized.includes('funcprintnames(names[]string)');
    const containsLoop = normalized.includes('for_,name:=range');

    if (containsFunc && containsLoop && normalized.includes('fmt.println(name)')) {
      if (!submitted) {
        const newXp = xp + 70;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Круто! Ты заработал 70 XP!');
    } else {
      alert('Проверь, что ты создал функцию printNames, которая принимает []string и выводит каждое имя.');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 3: Функции, массивы и слайсы</h1>
        <p className="lesson-text">
          В Go массивы имеют фиксированную длину, а <strong>слайсы</strong> — более гибкие структуры, которые чаще используются.
        </p>
        <p className="lesson-text">
          Также Go поддерживает функции, которым можно передавать параметры, например слайсы.
        </p>
        <pre>
{`func printNames(names []string) {
    for _, name := range names {
        fmt.Println(name)
    }
}`}
        </pre>
        <p className="lesson-task">
          Задание: Напиши функцию <code>printNames</code>, которая принимает слайс имён и выводит каждое имя на новой строке.
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

export default Lesson3Go;
