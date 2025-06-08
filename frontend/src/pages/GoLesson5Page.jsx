import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@monaco-editor/react';
import './golesson.css';

const Lesson5Go = () => {
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

func addPerson(contacts map[int]Person, id int, name string, age int) {
    contacts[id] = Person{Name: name, Age: age}
}

func deletePerson(contacts map[int]Person, id int) {
    delete(contacts, id)
}

func main() {
    contacts := make(map[int]Person)
    addPerson(contacts, 1, "Анна", 28)
    addPerson(contacts, 2, "Игорь", 35)

    deletePerson(contacts, 1)

    for id, person := range contacts {
        fmt.Printf("ID: %d", id)
        printPerson(&person)
    }
}`);

  const [output, setOutput] = useState('');
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const handleRunCode = () => {
    try {
      const hasPrint = /for\s+id,\s*person\s*:=\s*range\s+contacts/.test(code) && /printPerson\(&person\)/.test(code);
      const addMatches = [...code.matchAll(/addPerson\(contacts,\s*(\d+),\s*\"(.*?)\",\s*(\d+)\)/g)];
      const delMatches = [...code.matchAll(/deletePerson\(contacts,\s*(\d+)\)/g)];

      let contacts = {};
      for (let match of addMatches) {
        const id = parseInt(match[1]);
        const name = match[2];
        const age = parseInt(match[3]);
        contacts[id] = { name, age };
      }

      for (let match of delMatches) {
        const id = parseInt(match[1]);
        delete contacts[id];
      }

      if (!hasPrint || Object.keys(contacts).length === 0) {
        setOutput('⚠️ Код не содержит правильного вывода контактов.');
        setCorrect(false);
        return;
      }

      let result = '';
      for (let id in contacts) {
        const person = contacts[id];
        result += `ID: ${id}\nИмя: ${person.name}\nВозраст: ${person.age}\n\n`;
      }

      setOutput(result.trim());
      setCorrect(true);
    } catch (e) {
      setOutput('⚠️ Ошибка при анализе кода.');
      setCorrect(false);
    }
  };

  const handleSubmit = () => {
    const hasStruct = /type\s+Person\s+struct/.test(code);
    const hasAddFunc = /func\s+addPerson\s*\(/.test(code);
    const hasDeleteFunc = /func\s+deletePerson\s*\(/.test(code);
    const hasLoop = /for\s+id,\s*person\s*:=\s*range\s+contacts/.test(code);

    if (hasStruct && hasAddFunc && hasDeleteFunc && hasLoop && correct) {
      if (!submitted) {
        const newXp = xp + 100;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      alert('Поздравляем! Ты прошёл базовый курс Go и получил 100 XP! 🎉');
    } else {
      alert('Проверь, что у тебя есть структура, функции добавления/удаления, цикл и корректный вывод.');
    }
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 5: Итоговый проект — мини-книга контактов</h1>
        <p className="lesson-text">
          Давай применим всё, что мы изучили в Go, и создадим простую систему хранения контактов с помощью структур, мап и функций.
        </p>

        <p className="lesson-task">
          Задание: создай <code>map[int]Person</code>, функции <code>addPerson</code> и <code>deletePerson</code>, используй цикл <code>range</code> для вывода.
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

export default Lesson5Go;