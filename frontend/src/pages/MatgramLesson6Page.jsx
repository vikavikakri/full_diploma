import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './mathlesson.css';

const MathLesson6 = () => {
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
      question: 'Найдите производную функции y = 3x в квадрате?',
      options: { a: '3', b: '6x', c: '3x', d: '9x' },
      correct: 'b',
      solution: 'Решение: Производная x в квадрате равна 2x, умножаем на 3, получаем 6x.',
    },
    {
      question: 'В какой точке функция y = x в кубе имеет горизонтальную касательную?',
      options: { a: '0', b: '1', c: '-1', d: '2' },
      correct: 'a',
      solution: 'Решение: Производная y = x в кубе равна 3x в квадрате. Горизонтальная касательная, когда производная равна нулю, то есть 3x в квадрате = 0, x = 0.',
    },
    {
      question: 'Какова скорость объекта, если s = 2t в квадрате + 3t, где t — время?',
      options: { a: '2t + 3', b: '4t + 3', c: '2t', d: '4t' },
      correct: 'b',
      solution: 'Решение: Скорость — это производная пути по времени. Производная 2t в квадрате равна 4t, производная 3t равна 3, итого 4t + 3.',
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
    navigate('/less7math');
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 6: Производная и её применение</h1>
        <p className="lesson-text">
          Добро пожаловать на шестой урок курса! Сегодня мы изучим производную — ключевой инструмент математического анализа. Производная функции в точке показывает, как быстро изменяется функция в этой точке, то есть скорость её роста или убывания. Она обозначается как f в первой производной по x и вычисляется как предел отношения приращения функции к приращению аргумента при стремлении приращения к нулю.
        </p>
        <p className="lesson-text">
          Например, для функции y = x в квадрате производная равна 2x, что показывает, что скорость изменения увеличивается пропорционально x. Чтобы найти производную, используют правила: производная суммы равна сумме производных, производная произведения равна первая функция умножить на производную второй плюс вторая функция умножить на производную первой, а производная составной функции требует цепного правила. Например, производная x в кубе равна 3x в квадрате.
        </p>
        <p className="lesson-text">
          Применение производных включает нахождение максимумов и минимумов: если производная равна нулю и меняет знак, это указывает на экстремум, например, минимум или максимум функции. Также производные используются для анализа скорости в физике — скорость объекта равна производной пути по времени — или оптимизации в экономике, например, для нахождения наилучшей цены. На ЕНТ часто встречаются задачи на вычисление производных и их использование для решения практических примеров, таких как определение точек перегиба или скорости.
        </p>
        <div className="lesson-note">
          <h3>Полезно знать:</h3>
          <ul>
            <li>производная x в квадрате равна 2x</li>
            <li>производная x в кубе равна 3x в квадрате</li>
            <li>если производная равна нулю, проверяем на экстремум</li>
            <li>скорость — это производная пути по времени</li>
          </ul>
          <p>Практика закрепит материал!</p>
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
            Отправить решения и перейти к уроку 7
          </Button>
        )}
      </div>
    </div>
  );
};

export default MathLesson6;