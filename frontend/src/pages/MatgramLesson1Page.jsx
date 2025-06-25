import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfileContext } from '../context/ProfileContext';
import solution1 from '../assets/solution1.jpg';
import solution3 from '../assets/solution3.jpg';
import './mathlesson.css';

const MathLesson1 = () => {
  const [answer, setAnswer] = useState('');
  const [output, setOutput] = useState('');
  const [currentTask, setCurrentTask] = useState(1);
  const [completedTasks, setCompletedTasks] = useState([false, false, false]);
  const [showSolution, setShowSolution] = useState(false);
  const [xpReward, setXpReward] = useState(0); // Награда из базы данных
  const [isLessonCompleted, setIsLessonCompleted] = useState(false); // Проверка, завершён ли урок
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
          const isCompleted = mathCourse.completed_lessons.includes(1);
          setIsLessonCompleted(isCompleted);
          if (isCompleted) {
            setCompletedTasks([true, true, true]);
            setCurrentTask(1);
            setXpReward(25); // Для повторного прохождения фиксированные 25 XP
          } else {
            setCompletedTasks([false, false, false]);
            setCurrentTask(1);
            // Получаем XP из базы данных для первого прохождения
            const lessonReward = mathCourse?.lessons?.find(l => l.lesson_number === 1)?.xp_reward || 0;
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
        body: JSON.stringify({ course_id: 2, lesson_number: 1, xp_reward: isLessonCompleted ? 25 : xpReward }),
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

      navigate('/less2math');
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

        {completedTasks.every(task => task) && currentTask === 3 && (
          <Button
            variant="contained"
            className="button-math-check"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Перейти ко 2 уроку
          </Button>
        )}
      </div>
    </div>
  );
};

export default MathLesson1;