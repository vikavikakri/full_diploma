import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Chip, Grid, IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProfileContext } from '../context/ProfileContext';
import Avataaars from 'awesome-react-avataaars';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { profile, isLoading, fetchProfile } = useContext(ProfileContext);
  const [showEditPrompt, setShowEditPrompt] = useState(false);
  const [activeCourses, setActiveCourses] = useState([]);
  const [xp, setXp] = useState(0);
  const [achievementNotification, setAchievementNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProfile();
      try {
        const response = await fetch('http://localhost:5000/api/progress', {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setActiveCourses(data.active_courses || []);
        setXp(data.points || 0);

        if (data.new_achievements && data.new_achievements.length > 0) {
          const latestAchievement = data.new_achievements[0];
          setAchievementNotification({
            id: latestAchievement.id,
            name: latestAchievement.name,
            xp: latestAchievement.xp_reward,
          });
        } else if (profile && Array.isArray(profile.achievements) && profile.achievements.length > 0) {
          const newbieAchievement = profile.achievements.find((a) => a.id === 1); // "Новичок на борту"
          if (newbieAchievement && !localStorage.getItem('isFirstAchievementNotified')) {
            setAchievementNotification({
              id: newbieAchievement.id,
              name: newbieAchievement.name,
              xp: newbieAchievement.xp_reward,
            });
            localStorage.setItem('isFirstAchievementNotified', 'true');
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки прогресса:', error.message);
      }
    };

    if (profile) {
      fetchData();
    }

    const isFirstVisit = !localStorage.getItem('isFirstProfileVisit');
    if (isFirstVisit && profile) {
      setShowEditPrompt(true);
      localStorage.setItem('isFirstProfileVisit', 'true');
    }
  }, [profile, fetchProfile]);

  const handleBackClick = () => {
    navigate('/');
  };

  const calculateAge = () => {
    if (!profile?.birth_date) return 'Возраст не указан';
    const today = new Date();
    const birth = new Date(profile.birth_date);
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      return `${age - 1} лет`;
    }
    return `${age} лет`;
  };

  const handleCloseNotification = () => {
    setAchievementNotification(null);
  };

  if (isLoading) {
    return <Typography sx={{ fontFamily: 'Tektur' }}>Загрузка...</Typography>;
  }

  if (!profile) {
    return <Typography sx={{ fontFamily: 'Tektur' }}>Профиль не найден. Пожалуйста, войдите в систему.</Typography>;
  }

  return (
    <Box
      sx={{
        bgcolor: '#F2E8D5',
        minHeight: '100vh',
        p: 2,
        position: 'relative',
      }}
    >
      <Box sx={{ textAlign: 'center', py: 2, mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#374D45', fontFamily: 'Tektur, sans-serif' }}>
          Профиль
        </Typography>
      </Box>

      <IconButton
        className="back-button"
        onClick={handleBackClick}
        aria-label="назад"
        sx={{
          position: 'absolute',
          top: 40,
          left: 50,
          zIndex: 20,
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box
        sx={{
          width: { xs: '90%', sm: 900 },
          border: '3px solid #374D45',
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: '#FCF8EE',
          margin: '0 auto',
        }}
      >
        <Box sx={{ bgcolor: '#C4C2E0', height: 100, borderBottom: '3px solid #374D45' }}></Box>
        <Box
          sx={{
            width: { xs: 70, sm: 100 },
            height: { xs: 70, sm: 100 },
            border: '3px solid #374D45',
            borderRadius: '50%',
            position: 'absolute',
            top: 50,
            left: '15%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            overflow: 'hidden',
            bgcolor: profile.avatar?.avatarBackground,
          }}
        >
          <Avataaars
            style={{ width: '100%', height: '100%' }}
            topType={profile.avatar?.topType}
            hairColor={profile.avatar?.hairColor}
            skinColor={profile.avatar?.skinColor}
            eyeType={profile.avatar?.eyeType}
            clotheType={profile.avatar?.clotheType}
            clotheColor={profile.avatar?.clotheColor}
            mouthType={profile.avatar?.mouthType}
            accessoriesType={profile.avatar?.accessoriesType}
            facialHairType={profile.avatar?.facialHairType}
          />
        </Box>
        <Box sx={{ p: 3, pt: 7 }}>
          <Grid container justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#374D45', fontFamily: 'Tektur' }}>
                {profile.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#374D45', fontFamily: 'Tektur' }}>
                {calculateAge()}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#374D45', fontFamily: 'Tektur' }}>
              Роль: {profile.role}
            </Typography>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#374D45',
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 'bold',
                color: '#fcf8ee',
                fontFamily: 'Tektur',
              }}
              onClick={() => navigate('/edit-profile')}
            >
              Редактировать профиль
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 'bold',
                color: '#374D45',
                borderColor: '#374D45',
                fontFamily: 'Tektur',
              }}
            >
              Настройки
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#374D45', fontFamily: 'Tektur' }}>
              Навыки:
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {profile.skills.length > 0 ? (
                profile.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    sx={{ bgcolor: '#E3F0A0', fontWeight: 'bold', fontFamily: 'Tektur' }}
                  />
                ))
              ) : (
                <Typography variant="body2" sx={{ color: '#374D45', fontFamily: 'Tektur' }}>
                  Навыков пока нет
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ mt: 3, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Paper
              sx={{
                flex: 1,
                bgcolor: '#2F4F46',
                p: { xs: 1, sm: 2 },
                borderRadius: '20px',
                color: 'white',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#D7ED93', fontFamily: 'Tektur' }}>
                Активные курсы
              </Typography>
              {activeCourses.length > 0 ? (
                activeCourses.map((course, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs>
                        <Typography variant="body2" sx={{ color: '#D7ED93', fontFamily: 'Tektur' }}>
                          {course.name || `Курс ${course.course_id}`}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" sx={{ color: '#D7ED93', fontFamily: 'Tektur', mr: 6 }}>
                          {Math.min(course.progress || 0, 100)}%
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: '#D7ED93', fontFamily: 'Tektur' }}>
                  Нет активных курсов
                </Typography>
              )}
            </Paper>
            <Paper
              sx={{
                flex: 1,
                bgcolor: '#2F4F46',
                p: { xs: 1, sm: 2 },
                borderRadius: '20px',
                color: 'white',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#D7ED93', fontFamily: 'Tektur' }}>
                Ваши баллы
              </Typography>
              <Typography variant="body2" sx={{ color: '#D7ED93', fontFamily: 'Tektur' }}>
                {xp} XP
              </Typography>
            </Paper>
          </Box>
          <Box
            sx={{
              mt: 3,
              bgcolor: '#D7ED93',
              p: { xs: 1, sm: 2 },
              borderRadius: '20px',
              minHeight: { xs: 200, sm: 300 },
              width: '95%',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#374D45', fontFamily: 'Tektur' }}>
              Ачивки:
            </Typography>
            {Array.isArray(profile.achievements) && profile.achievements.length > 0 ? (
              profile.achievements.map((achievement, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ color: '#374D45', fontFamily: 'Tektur', display: 'block' }}
                >
                  {achievement.name} (+{achievement.xp_reward} XP)
                </Typography>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: '#374D45', fontFamily: 'Tektur' }}>
                Пока нет достижений
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Dialog open={showEditPrompt} onClose={() => setShowEditPrompt(false)}>
        <DialogTitle sx={{ fontFamily: 'Tektur', color: '#374D45' }}>
          Добро пожаловать!
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#374D45' }}>
            Отредактируйте и добавьте информацию о себе, чтобы получить персонализированный опыт обучения.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: '16px' }}>
          <Button
            onClick={() => navigate('/edit-profile')}
            sx={{
              backgroundColor: '#C1E1C1',
              color: '#3a5a40',
              border: '3px solid #3a5a40',
              fontFamily: 'Tektur',
              '&:hover': { backgroundColor: '#B2D6B2' },
            }}
          >
            Приступим
          </Button>
          <Button
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: '#FAD2E1',
              color: '#3a5a40',
              border: '3px solid #3a5a40',
              fontFamily: 'Tektur',
              '&:hover': { backgroundColor: '#F8C1D1' },
            }}
          >
            Позже
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!achievementNotification}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity="success"
          sx={{ width: '100%', bgcolor: '#edf7ed', color: '#374D45', fontFamily: 'Tektur' }}
        >
          Новая ачивка: {achievementNotification?.name} (+{achievementNotification?.xp} XP)!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfilePage;