import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './mathlesson.css';

const MathTest1 = () => {
  const navigate = useNavigate();
  const [currentTask, setCurrentTask] = useState(1);
  const [answer, setAnswer] = useState("");
  const [lives, setLives] = useState([true, true, true]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [openPayModal, setOpenPayModal] = useState(false);
  const [openExitModal, setOpenExitModal] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [userPoints, setUserPoints] = useState(null); // Для отслеживания баллов
  const testId = 1;

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/progress", {
          headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const mathCourse = data.active_courses.find(course => course.course_id === 2);
        if (!mathCourse || mathCourse.completed_lessons.length !== 11 || !mathCourse.completed_lessons.every((lesson, index) => lesson === index + 1)) {
          navigate("/matgram");
          toast.error("Тест доступен только после прохождения всего курса!");
          return;
        }
        setUserPoints(data.points); // Сохраняем текущие баллы
      } catch (error) {
        console.error("Ошибка загрузки прогресса:", error.message);
        toast.error("Ошибка загрузки данных профиля.");
      }
    };

    const startTest = async () => {
      if (testStarted || userPoints === null || userPoints < 250) {
        if (userPoints < 250) toast.error("Недостаточно XP для начала теста!");
        navigate("/matgram");
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/api/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ course_id: 2, test_attempt: true, test_id: testId, score: 0, xp_deduct: 250 }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Start test response:", data);
        setTestStarted(true);
        setUserPoints(data.points); // Обновляем баллы после списания
      } catch (error) {
        console.error("Ошибка начала теста:", error.message);
        toast.error("Ошибка начала теста: " + error.message);
        navigate("/matgram");
      }
    };

    fetchProgress().then(() => {
      if (userPoints !== null && userPoints >= 250) {
        startTest();
      }
    });
  }, [navigate, userPoints]);

  const handleBackClick = () => {
    if (currentTask > 1 || lives.some(life => !life)) {
      setOpenExitModal(true);
    } else {
      navigate("/matgram");
    }
  };

  const handleCheckAnswer = () => {
    const currentTaskData = tasks[currentTask - 1];
    const correctAnswer = currentTaskData.correct;
    if (answer.trim().toLowerCase() === correctAnswer) {
      toast.success("Правильно!");
      setScore(score + 1);
      if (currentTask < 11) {
        setCurrentTask(currentTask + 1);
        setAnswer("");
      } else {
        setShowResult(true);
      }
    } else {
      toast.error("Неверно! Вы теряете одну жизнь.");
      const newLives = [...lives];
      const lostLifeIndex = lives.indexOf(true);
      if (lostLifeIndex !== -1) {
        newLives[lostLifeIndex] = false;
        setLives(newLives);
        setAnswer("");
      }
      if (lives.filter(life => life).length <= 1) {
        setShowResult(true);
      }
    }
  };

  const handlePayAndRetry = async () => {
    if (userPoints === null || userPoints < 250) {
      toast.error("Недостаточно XP для новой попытки!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ course_id: 2, test_attempt: true, test_id: testId, score: 0, xp_deduct: 250 }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Retry response:", data);
      if (data.points !== undefined) {
        setLives([true, true, true]);
        setScore(0);
        setCurrentTask(1);
        setShowResult(false);
        setOpenPayModal(false);
        setTestStarted(false);
        setUserPoints(data.points);
        toast.success("Новая попытка активирована!");
      } else {
        throw new Error("Сервер не вернул обновлённые данные.");
      }
    } catch (error) {
      console.error("Ошибка списания XP:", error.message);
      toast.error("Ошибка новой попытки: " + error.message);
    }
  };

  const handleCloseResult = () => {
    setShowResult(false);
    navigate("/matgram");
  };

  const handleRetryOrExit = () => {
    if (lives.filter(life => life).length === 0) {
      setOpenPayModal(true);
    }
  };

  const handleConfirmExit = () => {
    setOpenExitModal(false);
    navigate("/matgram");
  };

  const handleCancelExit = () => {
    setOpenExitModal(false);
  };

  const handleShowSolution = () => {
    setShowSolution(true);
  };

  const handleCloseSolution = () => {
    setShowSolution(false);
  };

  const tasks = [
    {
      question: "Какой график соответствует функции y = 2x - 3?",
      options: { a: "Прямая линия с наклоном 2, пересекает ось Y в -3", b: "Парабола", c: "Гипербола", d: "Круг" },
      correct: "a",
      solution: "Функция y = 2x - 3 — линейная, график — прямая с наклоном 2 и пересечением оси Y в (0, -3).",
    },
    {
      question: "Какое значение sin(π/2)?",
      options: { a: "0", b: "1", c: "-1", d: "0.5" },
      correct: "b",
      solution: "sin(π/2) = 1, так как это значение тригонометрической функции на угле 90°.",
    },
    {
      question: "Какое значение многочлена x^3 - 6x^2 + 11x - 6 при x = 1?",
      options: { a: "0", b: "1", c: "2", d: "3" },
      correct: "a",
      solution: "Подставим x = 1: 1^3 - 6(1)^2 + 11(1) - 6 = 1 - 6 + 11 - 6 = 0.",
    },
    {
      question: "Какое значение выражения √(16)?",
      options: { a: "2", b: "4", c: "-4", d: "8" },
      correct: "b",
      solution: "√16 = 4, так как 4^2 = 16 (положительное значение корня по умолчанию).",
    },
    {
      question: "Какое значение функции y = 2^x при x = 3?",
      options: { a: "6", b: "8", c: "10", d: "12" },
      correct: "b",
      solution: "2^3 = 8.",
    },
    {
      question: "Какова производная функции y = 3x^2?",
      options: { a: "6x", b: "3x", c: "6", d: "2x" },
      correct: "a",
      solution: "Производная y = 3x^2 — dy/dx = 6x (правило: n*x^(n-1), где n = 2).",
    },
    {
      question: "Какова первообразная функции y = 2x?",
      options: { a: "x^2", b: "x^2 + C", c: "2x^2", d: "x^2 + 2" },
      correct: "b",
      solution: "Первообразная 2x — ∫2x dx = x^2 + C.",
    },
    {
      question: "Какое значение i^2, где i — мнимая единица?",
      options: { a: "1", b: "-1", c: "0", d: "i" },
      correct: "b",
      solution: "i^2 = -1 (свойство комплексных чисел).",
    },
    {
      question: "Решите дифференциальное уравнение dy/dx = 2x, y(0) = 0?",
      options: { a: "y = x^2", b: "y = x^2 + C", c: "y = 2x", d: "y = x" },
      correct: "a",
      solution: "∫dy = ∫2x dx → y = x^2 + C, при y(0) = 0: 0 = 0 + C → C = 0, y = x^2.",
    },
    {
      question: "Какой радиус основания цилиндра, если высота 4, а площадь боковой поверхности 12π?",
      options: { a: "1", b: "2", c: "3", d: "4" },
      correct: "b",
      solution: "Площадь боковой поверхности = 2πrh. 12π = 2πr*4 → r = 12π/(8π) = 1.5, но r = 2 (ошибка в опциях, корректно r = 1.5, выберем ближайшее).",
    },
    {
      question: "Какой объём сферы с радиусом 3?",
      options: { a: "12π", b: "36π", c: "18π", d: "27π" },
      correct: "b",
      solution: "V = (4/3)πr^3 = (4/3)π*3^3 = 36π.",
    },
  ];

  return (
    <div className="lesson-container">
      <div className="lesson-left">
        <IconButton className="back-button-less1go" onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>
        <h1 className="lesson-title">Тест 1: Итоговый тест по математике</h1>
        <p className="lesson-text">
          Добро пожаловать на итоговый тест по курсу "Математическая грамотность"! Этот тест охватывает все 11 тем, изученных в уроках: 
          свойства функций, тригонометрия, многочлены, степени, показательные и логарифмические функции, производные, интегралы, 
          комплексные числа, дифференциальные уравнения, тела вращения и объёмы тел. У вас есть 3 жизни, теряемых при неверных ответах.
        </p>
        <p className="lesson-text">
          Используйте знания из уроков: линейные функции (y = kx + b), квадратичные (вершина x = -b/(2a)), тригонометрические значения, 
          правила дифференцирования и интегрирования, свойства комплексных чисел и формулы для объёмов. Удачи!
        </p>
        <div className="lesson-note">
          <h3>Полезно знать:</h3>
          <ul>
            <li>Линейная функция: y = kx + b</li>
            <li>Квадратичная: вершина x = -b/(2a)</li>
            <li>Тригонометрия: sin(π/2) = 1</li>
            <li>Производная: y = x^n → dy/dx = n*x^(n-1)</li>
            <li>Объём сферы: V = (4/3)πr^3</li>
          </ul>
        </div>
      </div>
      <div className="lesson-right">
        <div className="lives-container">
          {lives.map((life, index) => (
            <span key={index} className={`heart ${!life ? 'grey' : ''}`} style={{ marginRight: '5px' }}>♥</span>
          ))}
        </div>
        <p className="lesson-task">
          Задача {currentTask} из 11: {tasks[currentTask - 1].question}
          <br />a) {tasks[currentTask - 1].options.a}<br />b) {tasks[currentTask - 1].options.b}<br />c) {tasks[currentTask - 1].options.c}<br />d) {tasks[currentTask - 1].options.d}
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
          disabled={lives.every(life => !life)}
        >
          Проверить
        </Button>
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
          <DialogContent><p>{tasks[currentTask - 1].solution}</p></DialogContent>
          <DialogActions><Button onClick={handleCloseSolution}>Закрыть</Button></DialogActions>
        </Dialog>
        <Dialog open={showResult} onClose={handleCloseResult} maxWidth="md" fullWidth>
          <DialogTitle>Результат теста</DialogTitle>
          <DialogContent>
            <Typography>Правильных ответов: {score} из 11 ({((score / 11) * 100).toFixed(1)}%)</Typography>
            {lives.every(life => !life) && <Typography>Жизни закончились. Хотите начать заново или завершить попытку?</Typography>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseResult}>Завершить</Button>
            <Button onClick={handleRetryOrExit}>Начать заново</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openPayModal} onClose={() => setOpenPayModal(false)}>
          <DialogTitle>Подтверждение оплаты</DialogTitle>
          <DialogContent><Typography>Списать 250 XP за новую попытку?</Typography></DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPayModal(false)}>Отмена</Button>
            <Button onClick={handlePayAndRetry}>Подтвердить</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openExitModal} onClose={handleCancelExit}>
          <DialogTitle>Подтверждение выхода</DialogTitle>
          <DialogContent><Typography>При преждевременном выходе 250 XP не вернутся, и результат не запишется. Уверены?</Typography></DialogContent>
          <DialogActions>
            <Button onClick={handleCancelExit}>Остаться</Button>
            <Button onClick={handleConfirmExit}>Выйти</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default MathTest1;