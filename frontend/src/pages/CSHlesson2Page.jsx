import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './lesson1csharp.css';

const Lesson2CSharp = () => {
  const initialCode = `using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            int number = -5;

            // Условие: проверка числа
            if (number < 0)
            {
                Console.WriteLine("Число отрицательное");
            }
            else
            {
                Console.WriteLine("Число положительное");
            }

            // Цикл: вывод чисел от 1 до 5
            for (int i = 1; i <= 5; i++)
            {
                Console.WriteLine("Массив: " + i);
            }
        }
    }
}`;
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const correctOutput = `Число отрицательное
Массив: 1
Массив: 2
Массив: 3
Массив: 4
Массив: 5`;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRunCode = () => {
    if (
      code.includes('number = -5') &&
      code.includes('if (number < 0)') &&
      code.includes('Console.WriteLine("Число отрицательное");') &&
      code.includes('for (int i = 1; i <= 5; i++)') &&
      (code.includes('Console.WriteLine("Массив: " + i);') || code.includes('Console.WriteLine($"Массив: {i}");'))
    ) {
      setOutput(correctOutput);
    } else {
      setOutput("Ошибка: проверьте условие и цикл.");
    }
  };

  const handleSubmit = () => {
    if (
      code.includes('number = -5') &&
      code.includes('if (number < 0)') &&
      code.includes('Console.WriteLine("Число отрицательное");') &&
      code.includes('for (int i = 1; i <= 5; i++)') &&
      (code.includes('Console.WriteLine("Массив: " + i);') || code.includes('Console.WriteLine($"Массив: {i}");'))
    ) {
      if (!submitted) {
        const newXp = xp + 67;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Отлично! Вы получили 67 XP.');
    } else {
      alert('Код неверный. Попробуйте снова.');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 2: Условия и циклы в C#</h1>
        <p className="lesson-text">
          В этом уроке вы научитесь использовать условные операторы <strong>if</strong> и циклы <strong>for</strong> в C#.
        </p>
        <ul className="lesson-text">
          <li><strong>if (условие)</strong> — выполняет блок кода, если условие истинно.</li>
          <li><strong>else</strong> — выполняет альтернативный блок, если условие ложно.</li>
          <li><strong>for</strong> — повторяет код заданное количество раз.</li>
        </ul>

        <p className="lesson-task">
          Задание: проверьте, что число <strong>-5</strong> — отрицательное, и выведите числа от 1 до 5 в виде <code>Массив: 1</code>, <code>Массив: 2</code> и т.д.
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

export default Lesson2CSharp;
