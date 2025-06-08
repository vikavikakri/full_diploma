// src/components/AchievementNotifier.jsx
import React, { useContext, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { ProfileContext } from '../context/ProfileContext';

const AchievementNotifier = () => {
  const { newAchievement, setNewAchievement } = useContext(ProfileContext);

  const handleClose = () => {
    setNewAchievement(null);
  };

  useEffect(() => {
    if (newAchievement) {
      const timer = setTimeout(() => {
        setNewAchievement(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [newAchievement, setNewAchievement]);

  return (
    <Snackbar
      open={!!newAchievement}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Поздравляем! Вы получили новую ачивку: {newAchievement}!
      </Alert>
    </Snackbar>
  );
};

export default AchievementNotifier;