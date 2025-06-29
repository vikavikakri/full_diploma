import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfileContext } from '../context/ProfileContext';
import './mathlesson.css';

const MathLesson8 = () => {
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
          const isCompleted = mathCourse.completed_lessons.includes(8);
          setIsLessonCompleted(isCompleted);
          if (isCompleted) {
            setCompletedTasks([true, true, true]);
            setCurrentTask(1);
            setXpReward(25);
          } else {
            setCompletedTasks([false, false, false]);
            setCurrentTask(1);
            const lessonReward = mathCourse?.lessons?.find(l => l.lesson_number === 8)?.xp_reward || 150;
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
      question: 'Найдите сумму 2 плюс 3i и 1 минус 2i?',
      options: { a: '3 плюс i', b: '3 минус 5i', c: '3 плюс 5i', d: '1 плюс i' },
      correct: 'c',
      solution: 'Решение: Сложим действительные части 2 плюс 1 = 3 и мнимые части 3 минус 2 = 1, итог 3 плюс i.',
    },
    {
      question: 'Каков модуль числа 3 плюс 4i?',
      options: { a: '5', b: '7', c: '3', d: '4' },
      correct: 'a',
      solution: 'Решение: Модуль равен корень из 3 в квадрате плюс 4 в квадрате = корень из 9 плюс 16 = корень из 25 = 5.',
    },
    {
      question: 'Найдите корень уравнения x в квадрате плюс 4 = 0?',
      options: { a: '2i и -2i', b: '4i и -4i', c: '2 и -2', d: 'i и -i' },
      correct: 'a',
      solution: 'Решение: x в квадрате = -4, x = плюс-корень из -4 = плюс-2i.',
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
        body: JSON.stringify({ course_id: 2, lesson_number: 8, xp_reward: isLessonCompleted ? 25 : xpReward }),
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

      navigate('/less9math');
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

        <h1 className="lesson-title">Урок 8: Комплексные числа</h1>
        <p className="lesson-text">
          Добро пожаловать на восьмой урок курса! Сегодня мы разберём комплексные числа — расширение системы действительных чисел, включающее мнимую единицу i, где i в квадрате равно минус 1. Комплексное число записывается как z = a плюс b умножить на i, где a — действительная часть, а b — мнимая часть. Например, 3 плюс 4i — это комплексное число с a = 3 и b = 4.
        </p>
        <p className="lesson-text">
          Операции включают сложение (сумма действительных и мнимых частей), умножение (с использованием правила i в квадрате = -1) и деление (с умножением числителя и знаменателя на сопряжённое число, которое имеет ту же действительную часть и противоположную мнимую). Модуль комплексного числа z равен корень из a в квадрате плюс b в квадрате, а аргумент — угол, определяемый через арктангенс b делить на a, с учётом четверти координатной плоскости.
        </p>
        <p className="lesson-text">
          Применения включают решение уравнений, таких как x в квадрате плюс 1 = 0, где корни — i и минус i, а также анализ в физике и инженерии, например, для моделирования электрических цепей или колебаний. На ЕНТ могут быть задачи на выполнение операций с комплексными числами или их геометрическое представление на комплексной плоскости.
        </p>
        <div className="lesson-note">
          <h3>Полезно знать:</h3>
          <ul>
            <li>i в квадрате равно -1</li>
            <li>модуль 3 плюс 4i равен 5</li>
            <li>сопряжённое к a плюс bi — a минус bi</li>
            <li>корень x в квадрате плюс 1 = 0 — i и -i</li>
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
            Перейти к уроку 9
          </Button>
        )}
      </div>
    </div>
  );
};

export default MathLesson8;