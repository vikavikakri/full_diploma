import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './golesson.css';

const Lesson4Go = () => {
  const [code, setCode] = useState(`package main

import "fmt"

type Person struct {
    Name string
    Age  int
}

func printPerson(p *Person) {
    fmt.Println("Имя:", p.Name)
    fmt.Println("Возраст:", p.Age)
}

func main() {
    people := map[int]Person{
        1: {Name: "Введи тут имя", Age: а тут возраст},
        2: {Name: "Игорь", Age: 35},
    }

    person := people[1]
    printPerson(&person)
}`);

  const [output, setOutput] = useState('');
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const handleRunCode = () => {
    const nameMatch = code.match(/people\s*:=\s*map\[int\]Person\s*{[^}]*1:\s*{Name:\s*\"(.+?)\",\s*Age:\s*(\d+)/);
    if (nameMatch) {
      const name = nameMatch[1];
      const age = nameMatch[2];
      setOutput(`Имя: ${name}\nВозраст: ${age}`);
    } else {
      setOutput('⚠️ Не удалось распознать структуру. Убедись, что у тебя есть map[int]Person с пользователем с ID 1.');
    }
  };

  const handleSubmit = () => {
    const hasStruct = /type\s+Person\s+struct\s*{[^}]*Name\s+string[^}]*Age\s+int[^}]*}/.test(code);
    const hasPointer = /func\s+printPerson\s*\(\s*p\s*\*Person\s*\)/.test(code);
    const hasMap = /people\s*:=\s*map\[int\]Person\s*{[^}]*1:\s*{Name:\s*\".+?\",\s*Age:\s*\d+/i.test(code);
    const hasPrint = /fmt\.Println\(\s*"Имя:",\s*p\.Name\s*\)/.test(code) && /fmt\.Println\(\s*"Возраст:",\s*p\.Age\s*\)/.test(code);

    if (hasStruct && hasPointer && hasMap && hasPrint) {
      if (!submitted) {
        const newXp = xp + 80;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Отлично! Ты заработал 80 XP!');
    } else {
      alert('Проверь, что ты создал структуру Person, map[int]Person, функцию с указателем и правильно выводишь данные.');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 4: Структуры, указатели и работа с мапами</h1>
        <p className="lesson-text">
          В Go ты можешь создавать собственные типы данных — <code>struct</code>. Они часто используются с указателями и map.
        </p>
        <pre>
{`type Person struct {
    Name string
    Age  int
}

func printPerson(p *Person) {
    fmt.Println("Имя:", p.Name)
    fmt.Println("Возраст:", p.Age)
}`}
        </pre>
        <p className="lesson-task">
          Задание: создай структуру <code>Person</code>, карту пользователей по ID и функцию <code>printPerson</code>, которая выводит имя и возраст.
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

export default Lesson4Go;
