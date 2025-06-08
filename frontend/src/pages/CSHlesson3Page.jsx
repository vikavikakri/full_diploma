import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './lesson1csharp.css';

const Lesson3CSharp = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const [output, setOutput] = useState('');
  const [code, setCode] = useState(`using System;

namespace HelloWorld
{
    class Person
    {
        public string Name;
        public int Age;

        public Person(string name, int age)
        {
            Name = name;
            Age = age;
        }

        public void Introduce()
        {
            Console.WriteLine("Меня зовут " + Name + " и мне " + Age + " лет.");
        }
    }

    class Program
    {
        static void Greet(string name)
        {
            Console.WriteLine("Привет, " + name + "!");
        }

        static void Main(string[] args)
        {
            Greet("C#");

            Person person = new Person("Аня", 25);
            person.Introduce();
        }
    }
}`);

  const correctOutput = "Привет, C#!\nМеня зовут Аня и мне 25 лет.";

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRunCode = () => {
    if (
      code.includes('Greet("C#")') &&
      code.includes('Console.WriteLine("Привет, " + name + "!");') &&
      code.includes('new Person("Аня", 25)') &&
      code.includes('Console.WriteLine("Меня зовут " + Name + " и мне " + Age + " лет.");')
    ) {
      setOutput(correctOutput);
    } else {
      setOutput("Ошибка: убедитесь, что вы правильно создали и вызвали функции.");
    }
  };

  const handleSubmit = () => {
    if (
      code.includes('Greet("C#")') &&
      code.includes('Console.WriteLine("Привет, " + name + "!");') &&
      code.includes('new Person("Аня", 25)') &&
      code.includes('Console.WriteLine("Меня зовут " + Name + " и мне " + Age + " лет.");')
    ) {
      if (!submitted) {
        const newXp = xp + 75;
        setXp(newXp);
        localStorage.setItem('xp', newXp.toString());
        setSubmitted(true);
      }
      alert("Отлично! Вы получили 75 XP.");
    } else {
      alert("Код неверный. Попробуйте снова.");
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 3: Функции и основы ООП в C#</h1>

        <p className="lesson-text">
          Сегодня мы познакомимся с <strong>функциями (или методами)</strong> и основами <strong>объектно-ориентированного программирования (ООП)</strong> в языке C#.
        </p>

        <h2 className="lesson-subtitle">Что такое функция?</h2>
        <p className="lesson-text">
          Функция — это блок кода, который можно вызывать многократно. Она может принимать параметры (входные данные) и возвращать результат.
        </p>

        <h3 className="lesson-subtitle">Как создать функцию:</h3>
        <pre className="lesson-text code-block">
{`static void Greet(string name)
{
  Console.WriteLine("Привет, " + name + "!");
}`}
        </pre>

        <ul className="lesson-text">
          <li><code>static</code> — означает, что функция принадлежит классу, а не объекту.</li>
          <li><code>void</code> — тип возвращаемого значения (в данном случае функция ничего не возвращает).</li>
          <li><code>Greet</code> — имя функции.</li>
          <li><code>string name</code> — параметр (входная переменная).</li>
        </ul>

        <h3 className="lesson-subtitle">Как вызвать функцию:</h3>
        <pre className="lesson-text code-block">
Greet("C#");
        </pre>

        <h2 className="lesson-subtitle">Что такое класс и объект?</h2>
        <p className="lesson-text">
          <strong>Класс</strong> — это шаблон, по которому создаются объекты. Он описывает свойства (поля) и поведение (методы).
        </p>
        <p className="lesson-text">
          <strong>Объект</strong> — это конкретный экземпляр класса.
        </p>

        <h3 className="lesson-subtitle">Пример класса:</h3>
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
{`using System;

class Program
{
    static void Main()
    {
        Greet("Алиса");
    }

    static void Greet(string name)
    {
        Console.WriteLine("Привет, " + name + "!");
    }
}`}
        </pre>

        <p className="lesson-task">
          Задание:<br />
          1. Создайте функцию <code>Greet</code>, которая выводит приветствие.<br />
          2. Создайте класс <code>Person</code> с полями <code>Name</code> и <code>Age</code> и методом <code>Introduce</code>.<br />
          3. В функции <code>Main</code> вызовите оба метода.<br />
        </p>

        <Button variant="contained" className="button-go-1put" onClick={handleRunCode} sx={{ mt: 2 }}>
          ▶ Запустить код
        </Button>

        <div className="output-box">
          <pre>{output}</pre>
        </div>

        <Button variant="outlined" className="button-xp-1put" onClick={handleSubmit} sx={{ mt: 2 }}>
          Отправить и получить XP
        </Button>
      </div>

      <div className="lesson-right">
        <Editor
          height="400px"
          defaultLanguage="csharp"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
        />
      </div>
    </div>
  );
};

export default Lesson3CSharp;
