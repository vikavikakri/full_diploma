import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './lesson1csharp.css';

const Lesson4CSharp = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const [output, setOutput] = useState('');
  const [code, setCode] = useState(`using System;

namespace HelloWorld
{
    class Animal
    {
        public string Name;

        public Animal(string name)
        {
            Name = name;
        }

        public virtual void Speak()
        {
            Console.WriteLine(Name + " издает звук.");
        }
    }

    class Dog : Animal
    {
        public Dog(string name) : base(name) {}

        public override void Speak()
        {
            Console.WriteLine(Name + " гавкает.");
        }
    }

    class Cat : Animal
    {
        public Cat(string name) : base(name) {}

        public override void Speak()
        {
            Console.WriteLine(Name + " мяукает.");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Animal dog = new Dog("Шерлок");
            dog.Speak();

            Animal cat = new Cat("Барсик");
            cat.Speak();
        }
    }
}`);

  const correctOutput = "Шерлок гавкает.\nБарсик мяукает.";

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRunCode = () => {
    if (
      code.includes('class Animal') &&
      code.includes('class Dog : Animal') &&
      code.includes('class Cat : Animal') &&
      code.includes('public virtual void Speak()') &&
      code.includes('public override void Speak()')
    ) {
      setOutput(correctOutput);
    } else {
      setOutput("Ошибка: убедитесь, что вы правильно реализовали наследование и полиморфизм.");
    }
  };

  const handleSubmit = () => {
    if (
      code.includes('class Animal') &&
      code.includes('class Dog : Animal') &&
      code.includes('class Cat : Animal') &&
      code.includes('public virtual void Speak()') &&
      code.includes('public override void Speak()')
    ) {
      if (!submitted) {
        const newXp = xp + 100;
        setXp(newXp);
        localStorage.setItem('xp', newXp.toString());
        setSubmitted(true);
      }
      alert("Отлично! Вы получили 100 XP.");
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

        <h1 className="lesson-title">Урок 4: Наследование и полиморфизм в C#</h1>

        <p className="lesson-text">
          В этом уроке мы изучим основные принципы <strong>наследования</strong> и <strong>полиморфизма</strong> в C#.
        </p>

        <h2 className="lesson-subtitle">Что такое наследование?</h2>
        <p className="lesson-text">
          Наследование позволяет создавать новые классы на основе уже существующих, расширяя их функциональность.
        </p>

        <h3 className="lesson-subtitle">Как создать класс-наследник:</h3>
        <pre className="lesson-text code-block">
{`class Dog : Animal
{
    public Dog(string name) : base(name) {}

    public override void Speak()
    {
        Console.WriteLine(Name + " гавкает.");
    }
}`}
        </pre>

        <ul className="lesson-text">
          <li><code>class Dog : Animal</code> — класс <code>Dog</code> наследует от класса <code>Animal</code>.</li>
          <li><code>public override void Speak()</code> — переопределение метода <code>Speak</code> в дочернем классе.</li>
        </ul>

        <h2 className="lesson-subtitle">Что такое полиморфизм?</h2>
        <p className="lesson-text">
          Полиморфизм позволяет использовать объекты разных типов через общий интерфейс, обеспечивая гибкость и масштабируемость кода.
        </p>

        <h3 className="lesson-subtitle">Пример полиморфизма:</h3>
        <pre className="lesson-text code-block">
{`class Animal
{
    public virtual void Speak()
    {
        Console.WriteLine("Животное издает звук.");
    }
}

class Dog : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Гав-гав!");
    }
}

class Cat : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Мяу!");
    }
}`}
        </pre>

        <p className="lesson-task">
          Задание:<br />
          1. Создайте базовый класс <code>Animal</code> с методом <code>Speak</code>.<br />
          2. Создайте два класса-наследника — <code>Dog</code> и <code>Cat</code>, которые переопределяют метод <code>Speak</code>.<br />
          3. В функции <code>Main</code> создайте объекты этих классов и вызовите метод <code>Speak</code> для каждого из них.
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

export default Lesson4CSharp;
