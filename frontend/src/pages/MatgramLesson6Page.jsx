import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfileContext } from '../context/ProfileContext';
import './mathlesson.css';

const MathLesson6 = () => {
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
          const isCompleted = mathCourse.completed_lessons.includes(6);
          setIsLessonCompleted(isCompleted);
          if (isCompleted) {
            setCompletedTasks([true, true, true]);
            setCurrentTask(1);
            setXpReward(25);
          } else {
            setCompletedTasks([false, false, false]);
            setCurrentTask(1);
            const lessonReward = mathCourse?.lessons?.find(l => l.lesson_number === 6)?.xp_reward || 0;
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
        body: JSON.stringify({ course_id: 2, lesson_number: 6, xp_reward: isLessonCompleted ? 25 : xpReward }),
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

      navigate('/less7math');
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

        {completedTasks.every(task => task) && currentTask === 3 && (
          <Button
            variant="contained"
            className="button-math-check"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Перейти к уроку 7
          </Button>
        )}
      </div>
    </div>
  );
};

export default MathLesson6;