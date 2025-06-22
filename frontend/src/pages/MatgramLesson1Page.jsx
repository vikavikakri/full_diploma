import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import solution1 from '../assets/solution1.jpg';
import solution3 from '../assets/solution3.jpg';
import './mathlesson.css';

const MathLesson1 = () => {
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
      question: 'Какой график соответствует функции y = 2x - 3?',
      options: { a: 'Прямая линия с наклоном 2, пересекает ось Y в -3', b: 'Парабола с вершиной в (0, -3)', c: 'Гипербола', d: 'Круговой график' },
      correct: 'a',
      solution: 'Решение: Функция y = 2x - 3 является линейной, так как имеет вид y = kx + b, где k = 2 (наклон), b = -3 (сдвиг по оси Y). График — прямая линия, пересекающая ось Y в точке (0, -3).',
    },
    {
      question: 'Какое значение y при x = 2 для функции y = -x^2 + 4x - 1?',
      options: { a: '1', b: '3', c: '0', d: '-1' },
      correct: 'b',
      solution: 'Решение: Подставим x = 2 в уравнение y = -x^2 + 4x - 1: y = -(2)^2 + 4(2) - 1 = -4 + 8 - 1 = 3.',
    },
    {
      question: 'Где находится вершина параболы y = x^2 - 4x + 3?',
      options: { a: '(4, 3)', b: '(0, 3)', c: '(1, 0)', d: '(2, -1)' },
      correct: 'd',
      solution: 'Решение: Для y = x^2 - 4x + 3 найдём вершину. Формула x = -b/(2a), где a = 1, b = -4: x = 4/2 = 2. Подставим x = 2: y = (2)^2 - 4(2) + 3 = 4 - 8 + 3 = -1. Вершина в (2, -1).',
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
    navigate('/less2math');
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 1: Функция, ее свойства и график</h1>
        <p className="lesson-text">
          Добро пожаловать на первый урок курса по математической грамотности! Сегодня мы подробно разберём тему функций, их свойств и способов построения графиков. 
          Функция — это зависимость, при которой каждому значению независимой переменной x соответствует ровно одно значение зависимой переменной y. Например, 
          уравнение y = 2x - 3 описывает линейную функцию, а y = x^2 - 4x + 3 — квадратичную. Эти функции часто встречаются в задачах ЕНТ, и умение анализировать 
          их свойства критично для успеха. Давайте начнём с основ.
        </p>
        <p className="lesson-text">
          Линейная функция имеет вид y = kx + b, где k — наклон прямой, а b — точка пересечения с осью Y. Например, в y = 2x - 3 наклон равен 2, 
          а пересечение с осью Y — в точке (0, -3). Чтобы построить график, достаточно найти две точки (например, при x = 0 и x = 1) и соединить их прямой. 
          Квадратичная функция y = ax^2 + bx + c образует параболу. Её вершина находится по формуле x = -b/(2a), а затем подставляется в уравнение для y. 
          Это помогает определить, где функция достигает минимума или максимума.
        </p>
        <p className="lesson-text">
          Важные свойства функций включают монотонность (рост или убывание), чётность или нечётность и точки пересечения с осями. Например, y = x — нечётная функция, 
          симметричная относительно начала координат. Для построения графиков полезно находить ключевые точки: пересечение с осью X (решаем y = 0) и осью Y (x = 0). 
          Эти навыки пригодятся для решения задач ЕНТ, где требуется анализировать графики или определять их уравнения.
        </p>
        <div className="lesson-note">
          <h3>Полезно знать:</h3>
          <ul>
            <li>Линейная функция: y = kx + b (наклон k, сдвиг b)</li>
            <li>Квадратичная функция: y = ax^2 + bx + c (вершина x = -b/(2a))</li>
            <li>Пересечение с осью X: решаем y = 0</li>
            <li>Пересечение с осью Y: подставляем x = 0</li>
            <li>Монотонность: функция растёт, если k больше 0, убывает, если k меньше 0</li>
          </ul>
          <p>Практика с задачами закрепит материал!</p>
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
            {currentTask !== 2 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <img
                  src={currentTask === 1 ? solution1 : solution3}
                  alt={`Решение задачи ${currentTask}`}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            )}
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
            Отправить решения и перейти к уроку 2
          </Button>
        )}
      </div>
    </div>
  );
};

export default MathLesson1;