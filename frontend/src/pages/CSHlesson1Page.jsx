import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './lesson1csharp.css';

const Lesson1CSharp = () => {
  const [code, setCode] = useState(`using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            // Выводим текст на экран
            Console.WriteLine("Привет, !");
        }
    }
}`);
  const [output, setOutput] = useState('');
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRunCode = async () => {
    const correctCode = `using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            // Выводим текст на экран
            Console.WriteLine("Привет, C#!");
        }
    }
}`;

    if (code.trim() === correctCode) {
      setOutput("Привет, C#!");
    } else {
      setOutput("Ошибка: попробуйте снова.");
    }
  };

  const handleSubmit = () => {
    const correctCode = `using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            // Выводим текст на экран
            Console.WriteLine("Привет, C#!");
        }
    }
}`;

    if (code.trim() === correctCode) {
      if (!submitted) {
        const newXp = xp + 50;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Отлично! Вы получили 50 XP.');
    } else {
      alert('Код неверный. Попробуйте снова.');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1pyt" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 1: Введение в C# и первый код</h1>
        <p className="lesson-text">
          C# — это язык программирования, который используется для создания приложений на платформе .NET. В этом уроке вы научитесь создавать вашу первую программу на C#.
        </p>
        <ul className="lesson-text">
          <li><strong>Console.WriteLine()</strong> — используется для вывода текста на экран.</li>
          <li><strong>Main()</strong> — основной метод программы, с которого начинается выполнение.</li>
        </ul>

        <p className="lesson-task">
          Задание: создайте программу, которая выводит <strong>Привет, C#!</strong> на экран.
        </p>

        <Button variant="contained" className='button-go-1put' onClick={handleRunCode} sx={{ mt: 2 }}>
          ▶ Запустить код
        </Button>
        <div className="output-box">
          <pre>{output}</pre>
        </div>

        <Button variant="outlined" className='button-xp-1put' onClick={handleSubmit} sx={{ mt: 2 }}>
          Отправить и получить XP
        </Button>
      </div>

      <div className="lesson-right">
        <Editor
          height="400px"
          defaultLanguage="csharp"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
        />
      </div>
    </div>
  );
};

export default Lesson1CSharp;
