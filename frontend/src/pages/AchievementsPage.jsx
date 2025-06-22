import React from 'react';

// Функция проверки ачивок
const checkAchievements = (courseId, lessonData, totalXp, existingAchievements = []) => {
  // Преобразуем existingAchievements в массив, если оно не массив
  const achievementsArray = Array.isArray(existingAchievements) ? existingAchievements : [];

  const newAchievements = [];
  const { completedLessons, totalLessons } = lessonData || { completedLessons: [], totalLessons: 0 };

  // "Новичок на борту" (при первой загрузке с пустыми ачивками)
  if (achievementsArray.length === 0 && newAchievements.length === 0) {
    newAchievements.push({ id: 1, name: "Новичок на борту", xp_reward: 10 });
  }

  // "Первый шаг к звездам" (первый пройденный урок)
  if (completedLessons.length === 1 && !achievementsArray.some(a => a.id === 2)) {
    newAchievements.push({ id: 2, name: "Первый шаг к звездам", xp_reward: 20 });
  }

  // "Триумф новичка" (3 урока подряд)
  if (completedLessons.length >= 3 && areLessonsConsecutive(completedLessons) && !achievementsArray.some(a => a.id === 3)) {
    newAchievements.push({ id: 3, name: "Триумф новичка", xp_reward: 50 });
  }

  // "Сборщик XP" (300 XP)
  if (totalXp >= 300 && !achievementsArray.some(a => a.id === 7)) {
    newAchievements.push({ id: 7, name: "Сборщик XP", xp_reward: 30 });
  }

  return newAchievements;
};

// Вспомогательная функция для проверки последовательности уроков
const areLessonsConsecutive = (lessons) => {
  lessons.sort((a, b) => a - b);
  for (let i = 1; i < lessons.length; i++) {
    if (lessons[i] !== lessons[i - 1] + 1) return false;
  }
  return true;
};

const AchievementsPage = () => {
  return null; // Страница пока не отображается, только логика
};

export default AchievementsPage;
export { checkAchievements }; // Экспортируем функцию