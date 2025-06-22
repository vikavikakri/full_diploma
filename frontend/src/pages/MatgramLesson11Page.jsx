import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './mathlesson.css';

const MathLesson11 = () => {
  const [answer, setAnswer] = useState('');
  const [output, setOutput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [xp, setXp] = useState(parseInt(localStorage.getItem('xp')) || 0);
  const [currentTask, setCurrentTask] = useState(1);
  const [showSolution, setShowSolution] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const tasks = [
    {
      question: 'Найдите объём цилиндра радиусом 2 и высотой 5?',
      options: { a: '10 пи', b: '20 пи', c: '25 пи', d: '40 пи' },
      correct: 'b',
      solution: 'Решение: Объём цилиндра равен пи радиус в квадрате высота = пи * 2 в квадрате * 5 = пи * 4 * 5 = 20 пи.',
    },
    {
      question: 'Каков объём тела вращения y = x в квадрате от 0 до 1 вокруг оси x?',
      options: { a: 'пи делить на 2', b: 'пи делить на 5', c: 'пи делить на 3', d: 'пи делить на 4' },
      correct: 'b',
      solution: 'Решение: Объём = пи интегрировать от 0 до 1 x в четвёртой степени dx. Первообразная x в пятой степени делить на 5, от 0 до 1 = 1 делить на 5 минус 0 = пи делить на 5.',
    },
    {
      question: 'Каков объём конуса радиусом 3 и высотой 6?',
      options: { a: '18 пи', b: '27 пи', c: '36 пи', d: '54 пи' },
      correct: 'a',
      solution: 'Решение: Объём конуса = пи радиус в квадрате высота делить на 3 = пи * 3 в квадрате * 6 делить на 3 = пи * 9 * 2 = 18 пи.',
    },
  ];

  const handleCheckAnswer = () => {
    const currentTaskData = tasks[currentTask - 1];
    const correctAnswer = currentTaskData.correct;
    if (answer.trim().toLowerCase() === correctAnswer) {
      toast.success('Задача решена верно!', { autoClose: 3000 });
      if (!submitted) {
        const newXp = xp + 50;
        setXp(newXp);
        localStorage.setItem('xp', newXp);
        setSubmitted(true);
      }
      if (currentTask < 3) {
        setCurrentTask(currentTask + 1);
        setAnswer('');
        setOutput('');
        setSubmitted(false);
      }
    } else {
      toast.error('Неверный ответ. Попробуй ещё раз.', { autoClose: 3000 });
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
  };

  const handleCloseSolution = () => {
    setShowSolution(false);
  };

  const handleNextLesson = () => {
    navigate('/'); 
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 11: Объёмы тел</h1>
        <p className="lesson-text">
          Добро пожаловать на одиннадцатый и последний урок курса! Сегодня мы разберём, как вычислять объёмы тел, особенно тел вращения, с использованием интегралов. Объём тела вращения можно найти методом дисков или цилиндров: метод дисков применяют для вращения вокруг оси x, а метод цилиндров — для вращения вокруг оси y. Объём равен интегралу площади сечения по высоте или радиусу.
        </p>
        <p className="lesson-text">
          Например, для вращения функции y = x в квадрате от 0 до 1 вокруг оси x объём вычисляется как пи интегрировать от 0 до 1 x в четвёртой степени dx, что даёт пи делить на 5. Метод требует нахождения первообразной площади сечения, то есть интегрирования квадрата функции. Для простых тел, таких как цилиндр или конус, используются стандартные формулы: пи радиус в квадрате высота для цилиндра, и пи радиус в квадрате высота делить на 3 для конуса.
        </p>
        <p className="lesson-text">
          Применения включают расчёт объёмов сосудов, бочек или конструкций в инженерии. На ЕНТ задачи могут требовать вычисления объёма с заданными функциями или параметрами, что требует понимания интегралов и геометрических свойств тел.
        </p>
        <div className="lesson-note">
          <h3>Полезно знать:</h3>
          <ul>
            <li>объём цилиндра = пи радиус в квадрате высота</li>
            <li>объём конуса = пи радиус в квадрате высота делить на 3</li>
            <li>метод дисков использует пи x в квадрате dx</li>
            <li>интеграл даёт объём тела вращения</li>
          </ul>
          <p>Решение задач завершит ваш курс!</p>
        </div>
      </div>

      <div className="lesson-right">
        <p className="lesson-task">
          Задача {currentTask}: {tasks[currentTask - 1].question}
          <br />
          a) {tasks[currentTask - 1].options.a}<br />
          b) {tasks[currentTask - 1].options.b}<br />
          c) {tasks[currentTask - 1].options.c}<br />
          d) {tasks[currentTask - 1].options.d}
        </p>

        <TextField
          label="Введите букву ответа (a, b, c, d)"
          variant="outlined"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="input-answ-math"
          sx={{ mt: 2 }}
        />

        <Button
          variant="contained"
          className="button-math-check"
          onClick={handleCheckAnswer}
          sx={{ mt: 2 }}
        >
          Проверить
        </Button>

        <div className="output-box">
          <pre>{output}</pre>
        </div>

        <Button
          variant="outlined"
          className="button-xp-1math"
          onClick={handleShowSolution}
          sx={{ mt: 2 }}
        >
          Показать решение
        </Button>

        <Dialog open={showSolution} onClose={handleCloseSolution} maxWidth="md" fullWidth>
          <DialogTitle>Решение задачи {currentTask}</DialogTitle>
          <DialogContent>
            <p>{tasks[currentTask - 1].solution}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSolution}>Закрыть</Button>
          </DialogActions>
        </Dialog>

        {currentTask === 3 && submitted && (
          <Button
            variant="contained"
            className="button-math-check"
            onClick={handleNextLesson}
            sx={{ mt: 2 }}
          >
            Отправить решения и завершить курс
          </Button>
        )}
      </div>
    </div>
  );
};

export default MathLesson11;