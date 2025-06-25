import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfileContext } from '../context/ProfileContext';
import './mathlesson.css';

const MathLesson4 = () => {
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
          const isCompleted = mathCourse.completed_lessons.includes(4);
          setIsLessonCompleted(isCompleted);
          if (isCompleted) {
            setCompletedTasks([true, true, true]);
            setCurrentTask(1);
            setXpReward(25);
          } else {
            setCompletedTasks([false, false, false]);
            setCurrentTask(1);
            const lessonReward = mathCourse?.lessons?.find(l => l.lesson_number === 4)?.xp_reward || 0;
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
      question: 'Какое значение имеет выражение 2 в кубе умноженное на 2 в минус первой степени?',
      options: { a: '4', b: '2', c: '1', d: '1/2' },
      correct: 'a',
      solution: 'Решение: Применим правило: при умножении степеней с одинаковым основанием складываем показатели. Имеем 2 в кубе умноженное на 2 в минус первой степени равно 2 в степени (3 + (-1)) = 2 в квадрате = 4.',
    },
    {
      question: 'Какой корень из 16 равен 4?',
      options: { a: 'Четвёртый', b: 'Кубический', c: 'Квадратный', d: 'Пятый' },
      correct: 'c',
      solution: 'Решение: Квадратный корень из 16 равен 4, так как 4 в квадрате равно 16. Другие корни, такие как кубический, дают другие значения.',
    },
    {
      question: 'Какое значение имеет функция y = x в кубе при x = 2?',
      options: { a: '6', b: '8', c: '10', d: '12' },
      correct: 'b',
      solution: 'Решение: Подставим x = 2 в y = x в кубе: y = 2 в кубе = 8.',
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
        body: JSON.stringify({ course_id: 2, lesson_number: 4, xp_reward: isLessonCompleted ? 25 : xpReward }),
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

      navigate('/less5math');
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

        <h1 className="lesson-title">Урок 4: Степени и корни, степенная функция</h1>
        <p className="lesson-text">
          Добро пожаловать на четвёртый урок курса! Сегодня мы подробно разберём тему степеней, корней и степенных функций, которые являются фундаментальными понятиями алгебры. Эти знания помогут вам решать сложные задачи ЕНТ и анализировать математические модели. Степень числа обозначается как a в степени n, где a — основание, а n — показатель степени. Например, 2 в кубе равно 8, а 10 в минус второй степени равно 0.01. Степени могут быть целыми, дробными или отрицательными, и каждая форма имеет свои особенности.
        </p>
        <p className="lesson-text">
          Свойства степеней упрощают вычисления. Основные правила включают: произведение степеней с одинаковым основанием складывает показатели, то есть a в степени m умноженное на a в степени n равно a в степени (m + n); степень степени умножает показатели, то есть (a в степени m) в степени n равно a в степени (m умножить на n); а любая ненулевая величина в нулевой степени равна 1, если a не равно 0. Например, 3 в квадрате умножить на 3 в кубе равно 3 в степени (2 + 3) = 3 в пятой степени = 243. Эти правила часто используются для преобразования выражений.
        </p>
        <p className="lesson-text">
          Корни — это обратная операция к возведению в степень. Квадратный корень из a — это число, квадрат которого равен a, например, корень из 9 равен 3, так как 3 в квадрате равно 9. Кубический корень из a — это число, куб которого равен a, например, корень из 8 равен 2. Свойства корней: корень из a умножить на корень из b равно корень из (a умножить на b), и корень из (a делить на b) равно корень из a делить на корень из b, при условии что a и b больше 0. Корни с индексом n обозначаются как корень n-ой степени из a, и их можно выразить через степени: корень n-ой степени из a равно a в степени 1/n.
        </p>
        <p className="lesson-text">
          Степенная функция имеет вид y = k умножить x в степени n, где k — коэффициент, а n — показатель степени. Это обобщение линейных и квадратичных функций. Например, y = x в квадрате — это парабола, открытая вверх, а y = 1 делить на x — это гипербола, убывающая к нулю при больших x. Поведение функции зависит от n: если n больше 0, функция монотонна, то есть растёт или убывает в зависимости от знака k; если n меньше 0, она стремится к нулю при больших значениях по модулю x. Анализ таких функций важен для построения графиков и решения уравнений, что часто требуется на ЕНТ.
        </p>
        <div className="lesson-note">
          <h3>Полезно знать:</h3>
          <ul>
            <li>a в степени m умножить на a в степени n равно a в степени (m + n)</li>
            <li>(a в степени m) в степени n равно a в степени (m умножить на n)</li>
            <li>a в нулевой степени равно 1, если a не равно 0</li>
            <li>корень n-ой степени из a равно a в степени 1/n</li>
            <li>Степенная функция: y = k умножить x в степени n, поведение зависит от n</li>
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
            Перейти к уроку 5
          </Button>
        )}
      </div>
    </div>
  );
};

export default MathLesson4;