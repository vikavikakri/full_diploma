import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfileContext } from '../context/ProfileContext';
import './mathlesson.css';

const MathLesson7 = () => {
  const [answer, setAnswer] = useState('');
  const [output, setOutput] = useState('');
  const [currentTask, setCurrentTask] = useState(1);
  const [completedTasks, setCompletedTasks] = useState([false, false, false]);
  const [showSolution, setShowSolution] = useState(false);
  const [xpReward, setXpReward] = useState(0);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const { showLessonCompletion, showErrorNotification } = useContext(ProfileContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/progress', {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const mathCourse = data.active_courses.find((course) => course.course_id === 2);
        if (mathCourse) {
          const isCompleted = mathCourse.completed_lessons.includes(7);
          setIsLessonCompleted(isCompleted);
          if (isCompleted) {
            setCompletedTasks([true, true, true]);
            setCurrentTask(1);
            setXpReward(25);
          } else {
            setCompletedTasks([false, false, false]);
            setCurrentTask(1);
            const lessonReward = mathCourse?.lessons?.find(l => l.lesson_number === 7)?.xp_reward || 150;
            setXpReward(lessonReward);
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки прогресса:', error.message);
        showErrorNotification('Ошибка загрузки прогресса.');
      }
    };
    fetchProgress();
  }, []);

  const handleBackClick = () => navigate('/matgram');

  const tasks = [
    {
      question: 'Найдите первообразную функции f(x) = 4x?',
      options: { a: '2x в квадрате + C', b: '4x в квадрате + C', c: 'x в квадрате + C', d: '8x + C' },
      correct: 'a',
      solution: 'Решение: Производная 2x в квадрате равна 4x, значит первообразная 4x равна 2x в квадрате плюс константа C.',
    },
    {
      question: 'Вычислите интеграл от 0 до 2 x dx?',
      options: { a: '1', b: '2', c: '3', d: '4' },
      correct: 'b',
      solution: 'Решение: Первообразная x равна x в квадрате делить на 2. Интеграл от 0 до 2 равен (2 в квадрате делить на 2) минус (0 в квадрате делить на 2) = 2.',
    },
    {
      question: 'Какова площадь под графиком y = 3x от 0 до 1?',
      options: { a: '1', b: '1.5', c: '2', d: '3' },
      correct: 'b',
      solution: 'Решение: Первообразная 3x равна 3x в квадрате делить на 2. Интеграл от 0 до 1 равен (3 * 1 в квадрате делить на 2) минус (3 * 0 в квадрате делить на 2) = 1.5.',
    },
  ];

  const handleCheckAnswer = () => {
    const currentTaskData = tasks[currentTask - 1];
    const correctAnswer = currentTaskData.correct;
    const newCompletedTasks = [...completedTasks];

    if (answer.trim().toLowerCase() === correctAnswer) {
      toast.success('Задача решена верно!', { autoClose: 3000 });
      newCompletedTasks[currentTask - 1] = true;
      setCompletedTasks(newCompletedTasks);
      if (currentTask < 3) {
        setCurrentTask(currentTask + 1);
        setAnswer('');
        setOutput('');
      }
    } else {
      toast.error('Неверный ответ. Попробуй ещё раз.', { autoClose: 3000 });
    }
  };

  const handleSubmit = async () => {
    if (!completedTasks.every(task => task)) {
      showErrorNotification('Пожалуйста, проверьте все задачи перед отправкой.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ course_id: 2, lesson_number: 7, xp_reward: isLessonCompleted ? 25 : xpReward }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      showLessonCompletion(data.xp_added);

      if (data.new_achievements && data.new_achievements.length > 0) {
        const message = data.new_achievements.map((a) => `Ачивка "${a.name}" +${a.xp_reward} XP`).join('\n');
        toast.success(`Поздравляем!\n${message}`, { autoClose: 5000 });
      }

      navigate('/less8math');
    } catch (error) {
      console.error('Ошибка сохранения прогресса:', error.message);
      showErrorNotification('Ошибка сервера при сохранении прогресса.');
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
  };

  const handleCloseSolution = () => {
    setShowSolution(false);
  };

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <h1 className="lesson-title">Урок 7: Первообразная функция и интеграл</h1>
        <p className="lesson-text">
          Добро пожаловать на седьмой и последний урок курса! Сегодня мы разберём первообразную функцию и интеграл — инструменты, обратные производной. Первообразная функция F(x) для функции f(x) — это функция, производная которой равна f(x). Например, если f(x) = 2x, то первообразная F(x) = x в квадрате плюс константа C, так как производная x в квадрате равна 2x.
        </p>
        <p className="lesson-text">
          Определённый интеграл вычисляет площадь под кривой функции f(x) на интервале от a до b и обозначается как интеграл от a до b f(x) dx. Он равен разности значений первообразной в этих точках: F(b) минус F(a). Правила интегрирования включают: интеграл x в степени n равен x в степени (n + 1) делить на (n + 1) плюс константа, а интеграл суммы равен сумме интегралов. Например, интеграл x в квадрате равен x в кубе делить на 3 плюс константа.
        </p>
        <p className="lesson-text">
          Применения включают вычисление площадей под графиками, объёмов тел вращения и работы в физике. На ЕНТ задачи могут требовать найти первообразную для заданной функции или вычислить интеграл, что важно для анализа графиков и решения прикладных задач, таких как определение площади или накопленной величины.
        </p>
        <div className="lesson-note">
          <h3>Полезно знать:</h3>
          <ul>
            <li>первообразная 2x равна x в квадрате плюс C</li>
            <li>интеграл x в квадрате равен x в кубе делить на 3 плюс C</li>
            <li>интеграл от a до b равен F(b) минус F(a)</li>
            <li>интеграл вычисляет площадь под кривой</li>
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

        {completedTasks.every(task => task) && currentTask === 3 && (
          <Button
            variant="contained"
            className="button-math-check"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Перейти к уроку 8
          </Button>
        )}
      </div>
    </div>
  );
};

export default MathLesson7;