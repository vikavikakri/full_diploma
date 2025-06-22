import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './mathlesson.css';

const MathLesson9 = () => {
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
      question: 'Решите уравнение dy делить на dx = 2x?',
      options: { a: 'y = x в квадрате плюс C', b: 'y = 2x плюс C', c: 'y = x плюс C', d: 'y = 2x в квадрате плюс C' },
      correct: 'a',
      solution: 'Решение: Разделим переменные: dy = 2x dx. Интегрируем: y = x в квадрате плюс C.',
    },
    {
      question: 'Найдите решение dy делить на dx = y при y(0) = 1?',
      options: { a: 'y = e в степени x', b: 'y = e в степени x плюс 1', c: 'y = 1', d: 'y = x плюс 1' },
      correct: 'a',
      solution: 'Решение: Разделим: dy делить на y = dx. Интегрируем: логарифм по основанию e от y = x плюс C. При y(0) = 1: 0 = C, значит y = e в степени x.',
    },
    {
      question: 'Какое уравнение описывает рост популяции dy делить на dx = 0.1y?',
      options: { a: 'y = C e в степени 0.1x', b: 'y = 0.1x плюс C', c: 'y = x в квадрате плюс C', d: 'y = 0.1 e в степени x' },
      correct: 'a',
      solution: 'Решение: Разделим: dy делить на y = 0.1 dx. Интегрируем: логарифм по основанию e от y = 0.1x плюс C, значит y = C e в степени 0.1x.',
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
    navigate('/less10math'); 
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 9: Дифференциальные уравнения</h1>
        <p className="lesson-text">
          Добро пожаловать на девятый и последний урок курса! Сегодня мы изучим дифференциальные уравнения — уравнения, включающие производные, описывающие процессы изменения. Дифференциальное уравнение первого порядка имеет вид dy делить на dx = f(x, y), где переменные связаны через производную. Например, dy делить на dx = ky описывает экспоненциальный рост или распад.
        </p>
        <p className="lesson-text">
          Один из способов решения — разделение переменных, когда уравнение приводится к виду g(y) dy = h(x) dx, и интегрируется с обеих сторон. Пример: для dy делить на dx = 2x решение находится как y = x в квадрате плюс C. Начальные условия, такие как y(0) = 1, помогают определить константу. Уравнения с разделяющимися переменными часто встречаются в моделях роста.
        </p>
        <p className="lesson-text">
          Применения включают моделирование движения объектов, роста популяций или электрических цепей. На ЕНТ могут быть задачи на решение простых дифференциальных уравнений или интерпретацию их решений, например, определение поведения функции при заданных условиях.
        </p>
        <div className="lesson-note">
          <h3>Полезно знать:</h3>
          <ul>
            <li>dy делить на dx = 2x решает как y = x в квадрате плюс C</li>
            <li>начальное условие уточняет константу</li>
            <li>dy делить на dx = ky решает как y = C e в степени kx</li>
            <li>разделение переменных — базовый метод</li>
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

export default MathLesson9;