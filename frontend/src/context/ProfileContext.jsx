import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lessonCompletionNotification, setLessonCompletionNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Нет токена авторизации');
        setIsLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке профиля:', error.message, error.response?.data);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updatedProfile) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Нет токена авторизации для обновления профиля');
        return false;
      }

      const response = await axios.put('http://localhost:5000/api/profile', updatedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
      return true;
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error.message, error.response?.data);
      return false;
    }
  };

  const showLessonCompletion = useCallback((xpAdded) => {
    setLessonCompletionNotification({ xpAdded, timeoutId: setTimeout(() => {
      setLessonCompletionNotification(null);
    }, 5000) });
    console.log('Lesson completion notification shown with XP:', xpAdded);
  }, []);

  const showErrorNotification = useCallback((message) => {
    setErrorNotification({ message, timeoutId: setTimeout(() => {
      setErrorNotification(null);
    }, 5000) });
  }, []);

  const isLessonCompletionDone = () => {
    return lessonCompletionNotification === null;
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile: updateProfile, isLoading, fetchProfile, showLessonCompletion, showErrorNotification, isLessonCompletionDone }}>
      {children}
      {lessonCompletionNotification && (
        <Snackbar
          open={true}
          onClose={() => setLessonCompletionNotification(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          className="lesson-completion-snackbar"
          style={{ transition: 'all 0.5s ease-in-out' }}
        >
          <Alert severity="success">
            Отлично! Вы успешно прошли урок и получили {lessonCompletionNotification.xpAdded} XP.
          </Alert>
        </Snackbar>
      )}
      {errorNotification && (
        <Snackbar
          open={true}
          onClose={() => setErrorNotification(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          className="error-snackbar"
          style={{ transition: 'all 0.5s ease-in-out' }}
        >
          <Alert severity="error">
            {errorNotification.message}
          </Alert>
        </Snackbar>
      )}
    </ProfileContext.Provider>
  );
};