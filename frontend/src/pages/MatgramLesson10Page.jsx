import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './mathlesson.css';

const MathLesson10 = () => {
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
      question: 'Какова площадь боковой поверхности цилиндра с радиусом 2 и высотой 5?',
      options: { a: '10 пи', b: '20 пи', c: '25 пи', d: '40 пи' },
      correct: 'b',
      solution: 'Решение: Площадь боковой поверхности цилиндра равна 2 пи радиус высота = 2 пи * 2 * 5 = 20 пи.',
    },
    {
      question: 'Какой фигурой является тело вращения прямоугольника вокруг одной стороны?',
      options: { a: 'Конус', b: 'Цилиндр', c: 'Сфера', d: 'Тороид' },
      correct: 'b',
      solution: 'Решение: Вращение прямоугольника вокруг одной стороны даёт цилиндр.',
    },
    {
      question: 'Какова длина образующей конуса с высотой 3 и радиусом основания 4?',
      options: { a: '3', b: '4', c: '5', d: '7' },
      correct: 'c',
      solution: 'Решение: Длина образующей равна корень из высоты в квадрате плюс радиуса в квадрате = корень из 9 плюс 16 = корень из 25 = 5.',
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
    navigate('/less11math');
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 10: Тела вращения и их элементы</h1>
        <p className="lesson-text">
          Добро пожаловать на десятый урок курса! Сегодня мы изучим тела вращения — геометрические фигуры, получаемые вращением плоской фигуры вокруг оси. Например, вращение прямоугольника вокруг одной из сторон даёт цилиндр, а вращение прямоугольного треугольника вокруг одного из катетов — конус. Ось вращения — это прямая, вокруг которой происходит вращение, а образующая — это граница плоской фигуры, задающая форму тела.
        </p>
        <p className="lesson-text">
          Площадь боковой поверхности тела вращения зависит от длины образующей и окружности, описанной вокруг оси. Например, для цилиндра площадь боковой поверхности равна произведению длины образующей на окружность основания, то есть 2 пи радиус высота. Полная площадь поверхности включает основания, если они есть, как у цилиндра или конуса. Высота и радиус основания также являются ключевыми элементами для расчётов.
        </p>
        <p className="lesson-text">
          Тела вращения важны в инженерии и архитектуре для расчётов материалов, проектирования сосудов или труб. На ЕНТ могут быть задачи на определение элементов тел вращения, таких как длина образующей, площадь поверхности или объём, что требует понимания геометрических свойств.
        </p>
        <div className="lesson-note">
          <h3>Полезно знать:</h3>
          <ul>
            <li>цилиндр — вращение прямоугольника</li>
            <li>площадь боковой поверхности цилиндра = 2 пи радиус высота</li>
            <li>образующая конуса — корень из высоты в квадрате плюс радиус в квадрате</li>
            <li>ось вращения определяет форму</li>
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
            Отправить решения и перейти к уроку 11
          </Button>
        )}
      </div>
    </div>
  );
};

export default MathLesson10;