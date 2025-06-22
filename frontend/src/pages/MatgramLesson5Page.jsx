import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import solution15 from '../assets/solution15.jpg';
import './mathlesson.css';

const MathLesson5 = () => {
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
      question: 'Какое значение имеет 2 в кубе?',
      options: { a: '6', b: '8', c: '10', d: '12' },
      correct: 'b',
      solution: 'Решение: 2 в кубе равно 2 умножить на 2 умножить на 2 = 8.',
    },
    {
      question: 'Какое значение имеет логарифм по основанию 2 от 8?',
      options: { a: '2', b: '3', c: '4', d: '5' },
      correct: 'b',
      solution: 'Решение: Логарифм по основанию 2 от 8 равен x, где 2 в степени x равно 8. Так как 2 в кубе равно 8, то x = 3.',
    },
    {
      question: 'Какое уравнение описывает график функции y = e в степени x?',
      options: { a: 'Период 2 пи, амплитуда 1', b: 'Нет периода, растёт экспоненциально', c: 'Период пи, амплитуда e', d: 'Нет периода, убывает к нулю' },
      correct: 'b',
      solution: 'Решение: Функция y = e в степени x — показательная, не имеет периода, но растёт экспоненциально при x больше 0 и убывает к 0 при x меньше 0.',
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
    navigate('/less6math'); 
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 5: Показательная и логарифмическая функции</h1>
        <p className="lesson-text">
          Добро пожаловать на пятый курса! Сегодня мы подробно разберём показательные и логарифмические функции, которые имеют важное значение в математике, физике, экономике и других науках. Эти функции описывают процессы роста и убывания, такие как рост населения или радиоактивный распад, и часто встречаются в задачах ЕНТ. Давайте начнём с основ.
        </p>
        <p className="lesson-text">
          Показательная функция имеет вид y = a в степени x, где a больше 0 и a не равно 1, а x — любой действительный номер. Например, y = 2 в степени x начинается с 1 при x = 0, так как a в нулевой степени равно 1, растёт экспоненциально при положительных x и убывает к нулю при отрицательных x. Если a = e, примерно 2.718, функция y = e в степени x особенно важна в естественных науках. Свойства включают: a в степени (x + y) равно a в степени x умножить на a в степени y, (a в степени x) в степени y равно a в степени (x умножить на y), и a в минус x равно 1 делить на a в степени x. График всегда проходит через точку (0, 1) и монотонен, что делает его полезным для моделирования.
        </p>
        <p className="lesson-text">
          Логарифм — это обратная операция к возведению в степень. Логарифмическая функция записывается как y = логарифм по основанию a от x, где a больше 0, a не равно 1, и x больше 0, так как логарифм определён только для положительных чисел. Например, логарифм по основанию 2 от 8 равен 3, потому что 2 в кубе равно 8. Естественный логарифм ln x использует основание e и часто применяется в анализе. Свойства логарифмов: логарифм по основанию a от (x умножить на y) равно логарифм по основанию a от x плюс логарифм по основанию a от y, логарифм по основанию a от (x делить на y) равно логарифм по основанию a от x минус логарифм по основанию a от y, и логарифм по основанию a от (x в степени n) равно n умножить на логарифм по основанию a от x. График y = логарифм по основанию a от x имеет вертикальную асимптоту при x = 0 и растёт медленно, что важно для анализа поведения.
        </p>
        <p className="lesson-text">
          Эти функции взаимно обратны: если y = a в степени x, то x = логарифм по основанию a от y. Это свойство используется для решения уравнений, например, 2 в степени x = 8 решается как x = логарифм по основанию 2 от 8 = 3. На ЕНТ часто требуется находить значения, решать уравнения или определять свойства графиков, такие как асимптоты или монотонность. Понимание этих концепций завершит ваш курс и подготовит к практическим задачам.
        </p>
        <div className="lesson-note">
          <h3>Полезно знать:</h3>
          <ul>
            <li>a в степени (x + y) равно a в степени x умножить на a в степени y</li>
            <li>логарифм по основанию a от (x умножить на y) равно логарифм по основанию a от x плюс логарифм по основанию a от y</li>
            <li>график y = a в степени x проходит через (0, 1)</li>
            <li>график y = логарифм по основанию a от x имеет асимптоту при x = 0</li>
            <li>e примерно равно 2.718 — основание натурального логарифма</li>
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
            {currentTask === 3 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <img
                  src={solution15}
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
            Отправить решения
          </Button>
        )}
      </div>
    </div>
  );
};

export default MathLesson5;