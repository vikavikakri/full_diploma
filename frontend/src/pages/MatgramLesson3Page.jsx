import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfileContext } from '../context/ProfileContext';
import './mathlesson.css';

const MathLesson3 = () => {
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
          const isCompleted = mathCourse.completed_lessons.includes(3);
          setIsLessonCompleted(isCompleted);
          if (isCompleted) {
            setCompletedTasks([true, true, true]);
            setCurrentTask(1);
            setXpReward(25);
          } else {
            setCompletedTasks([false, false, false]);
            setCurrentTask(1);
            const lessonReward = mathCourse?.lessons?.find(l => l.lesson_number === 3)?.xp_reward || 0;
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
      question: 'Какое значение имеет многочлен 2x^2 - 3x + 1 при x = 2?',
      options: { a: '7', b: '5', c: '3', d: '1' },
      correct: 'c',
      solution: 'Решение: Подставим x = 2 в многочлен 2x^2 - 3x + 1: 2(2)^2 - 3(2) + 1 = 2(4) - 6 + 1 = 8 - 6 + 1 = 3.',
    },
    {
      question: 'Какой коэффициент при x^2 в многочлене (x + 1)(x - 2)?',
      options: { a: '1', b: '2', c: '0', d: '-1' },
      correct: 'a',
      solution: 'Решение: Разложим (x + 1)(x - 2): x^2 - 2x + x - 2 = x^2 - x - 2. Коэффициент при x^2 равен 1.',
    },
    {
      question: 'Какое разложение имеет многочлен x^2 - 5x + 6?',
      options: { a: '(x - 1)(x - 6)', b: '(x + 2)(x + 3)', c: '(x + 1)(x + 6)', d: '(x - 2)(x - 3)' },
      correct: 'd',
      solution: 'Решение: Разложим x^2 - 5x + 6 на множители. Ищем числа, чьё произведение 6, а сумма -5: -2 и -3. Таким образом, x^2 - 5x + 6 = (x - 2)(x - 3).',
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
        body: JSON.stringify({ course_id: 2, lesson_number: 3, xp_reward: isLessonCompleted ? 25 : xpReward }),
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

      navigate('/less4math');
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

        <h1 className="lesson-title">Урок 3: Многочлены</h1>
        <p className="lesson-text">
          Добро пожаловать на третий урок курса! Сегодня мы изучим многочлены — важную тему алгебры, которая часто встречается в задачах ЕНТ. Многочлен — это выражение вида a_n x^n + a_(n-1) x^(n-1) + ... + a_0, где a_i — коэффициенты, а n — степень многочлена.
        </p>
        <p className="lesson-text">
          Многочлены бывают линейными (степень 1, например, 2x + 1), квадратичными (степень 2, например, x^2 - 5x + 6) и кубическими (степень 3 и выше). С многочленами можно выполнять операции: складывать, вычитать, умножать и делить. Например, чтобы найти значение многочлена при заданном x, подставьте это значение и выполните вычисления. Разложение на множители помогает упростить выражения и решить уравнения.
        </p>
        <p className="lesson-text">
          Важные навыки включают нахождение корней (решение уравнения многочлена = 0) и определение степени. Например, для x^2 - 5x + 6 корни находятся через разложение: (x - 2)(x - 3) = 0, что даёт x = 2 и x = 3. Эти методы пригодятся для анализа задач ЕНТ, где требуется работать с уравнениями и их графиками.
        </p>
        <div className="lesson-note">
          <h3>Полезно знать:</h3>
          <ul>
            <li>Степень многочлена — наибольшая степень x</li>
            <li>Разложение: ищем числа, чьё произведение равно свободному члену, а сумма — коэффициенту при x</li>
            <li>Значение многочлена: подставляем x и вычисляем</li>
            <li>Корни: решаем уравнение многочлен = 0</li>
            <li>При умножении степеней складываются</li>
          </ul>
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
            Завершить урок 3
          </Button>
        )}
      </div>
    </div>
  );
};

export default MathLesson3;