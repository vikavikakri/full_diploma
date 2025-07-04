import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfileContext } from '../context/ProfileContext';
import solution4 from '../assets/solution4.jpg';
import solution6 from '../assets/solution6.jpg';
import './mathlesson.css';

const MathLesson2 = () => {
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
          const isCompleted = mathCourse.completed_lessons.includes(2);
          setIsLessonCompleted(isCompleted);
          if (isCompleted) {
            setCompletedTasks([true, true, true]);
            setCurrentTask(1);
            setXpReward(25);
          } else {
            setCompletedTasks([false, false, false]);
            setCurrentTask(1);
            const lessonReward = mathCourse?.lessons?.find(l => l.lesson_number === 2)?.xp_reward || 0;
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
      question: 'Какое значение синуса для угла 30°?',
      options: { a: '1/2', b: '√3/2', c: '√2/2', d: '1' },
      correct: 'a',
      solution: 'Решение: Значение синуса для угла 30° равно 1/2, что является стандартным тригонометрическим значением для этого угла в прямоугольном треугольнике.',
    },
    {
      question: 'Какое значение косинуса для угла 60°?',
      options: { a: '1/2', b: '√3/2', c: '√2/2', d: '0' },
      correct: 'b',
      solution: 'Решение: Значение косинуса для угла 60° равно √3/2. Это основное тригонометрическое значение, которое можно вывести из равнобедренного треугольника с углами 30°-60°-90°.',
    },
    {
      question: 'Какое уравнение описывает график функции y = sin(x)?',
      options: { a: 'Период 2π, амплитуда 1', b: 'Период π, амплитуда 2', c: 'Период 4π, амплитуда 1', d: 'Период 2π, амплитуда 2' },
      correct: 'a',
      solution: 'Решение: Функция y = sin(x) имеет период 2π и амплитуду 1, что соответствует стандартному синусоидальному графику, колеблющемуся между -1 и 1.',
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
        body: JSON.stringify({ course_id: 2, lesson_number: 2, xp_reward: isLessonCompleted ? 25 : xpReward }),
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

      navigate('/less3math');
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

        <h1 className="lesson-title">Урок 2: Тригонометрические функции</h1>
        <p className="lesson-text">
          Добро пожаловать на второй урок! Сегодня мы углубимся в изучение тригонометрических функций — синуса, косинуса и тангенса, которые играют ключевую роль в математике и задачах ЕНТ. Эти функции связывают углы и длины сторон в треугольниках и описывают периодические процессы, такие как колебания или волны.
        </p>
        <p className="lesson-text">
          Синус (sin) угла в прямоугольном треугольнике — это отношение противолежащего катета к гипотенузе. Косинус (cos) — отношение прилежащего катета к гипотенузе. Тангенс (tan) вычисляется как отношение синуса к косинусу или противолежащего катета к прилежащему. Например, для угла 30° sin = 1/2, cos = √3/2, tan = 1/√3. Эти значения можно запомнить, используя специальные треугольники или единичную окружность.
        </p>
        <p className="lesson-text">
          Графики тригонометрических функций имеют периодическую природу. Для y = sin(x) и y = cos(x) период равен 2π, а амплитуда — 1, что означает колебания между -1 и 1. Тангенс имеет период π и не определён в точках, где косинус равен нулю (например, 90°). Важно уметь находить значения функций для заданных углов и анализировать их свойства, такие как чётность или нечётность, для решения задач.
        </p>
        <div className="lesson-note">
          <h3>Полезно знать:</h3>
          <ul>
            <li>sin 30° = 1/2, cos 30° = √3/2</li>
            <li>sin 60° = √3/2, cos 60° = 1/2</li>
            <li>Период sin и cos: 2π, тангенса: π</li>
            <li>Амплитуда sin и cos: 1 (если не указано иное)</li>
            <li>Тангенс не определён, когда cos = 0</li>
          </ul>
          <p>Решение задач укрепит понимание!</p>
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
                  src={currentTask === 1 ? solution4 : solution6}
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
            Перейти к уроку 3
          </Button>
        )}
      </div>
    </div>
  );
};

export default MathLesson2;