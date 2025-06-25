import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import AchievementNotifier from './components/AchievementNotifier';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Programming from './pages/Programming';
import ScrollToTop from './pages/ScrollToTop';
import EntPage from './pages/EntPage';
import PythonCoursePage from './pages/PythonCoursePage';
import CSHcoursePage from './pages/CSHcoursePage';
import HtmlCoursePage from './pages/HtmlCoursePage';
import GolangPage from './pages/GolangPage';
import MatGramCoursePage from './pages/MatGramCoursePage';
import GramChtenCoursePage from './pages/GramChtenCoursePage';
import OsnovInfoPage from './pages/OsnovInfoPage';
import LoginRegistPage from './pages/LoginRegistPage';
import ForgotPassword from './pages/ForgotPasswordPage';
import ResetPassword from './pages/ResetPasswordPage';
import Lesson1Python from './pages/Lesson1PythonPage';
import Lesson2Python from './pages/Lesson2PythonPage';
import Lesson3Python from './pages/Lesson3PythonPage';
import Lesson4Python from './pages/Lesson4PythonPage';
import Lesson5Python from './pages/Lesson5PythonPage';
import Lesson6Python from './pages/Lesson6PythonPage';
import CSHlesson1Page from './pages/CSHlesson1Page';
import CSHlesson2Page from './pages/CSHlesson2Page';
import CSHlesson3Page from './pages/CSHlesson3Page';
import CSHlesson4Page from './pages/CSHlesson4Page';
import HtmlLesson1Page from './pages/HtmlLesson1Page';
import HtmlLesson2Page from './pages/HtmlLesson2Page';
import HtmlLesson3Page from './pages/HtmlLesson3Page';
import HtmlLesson4Page from './pages/HtmlLesson4Page';
import HtmlLesson5Page from './pages/HtmlLesson5Page';
import GoLesson1Page from './pages/GoLesson1Page';
import GoLesson2Page from './pages/GoLesson2Page';
import GoLesson3Page from './pages/GoLesson3Page';
import GoLesson4Page from './pages/GoLesson4Page';
import GoLesson5Page from './pages/GoLesson5Page';
import MatgramLesson1Page from './pages/MatgramLesson1Page';
import MatgramLesson2Page from './pages/MatgramLesson2Page';
import MatgramLesson3Page from './pages/MatgramLesson3Page';
import MatgramLesson4Page from './pages/MatgramLesson4Page';
import MatgramLesson5Page from './pages/MatgramLesson5Page';
import MatgramLesson6Page from './pages/MatgramLesson6Page';
import MatgramLesson7Page from './pages/MatgramLesson7Page';
import MatgramLesson8Page from './pages/MatgramLesson8Page';
import MatgramLesson9Page from './pages/MatgramLesson9Page';
import MatgramLesson10Page from './pages/MatgramLesson10Page';
import MatgramLesson11Page from './pages/MatgramLesson11Page';
import MathTest1 from './pages/MathTest1';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditUserProfile';
import { ToastContainer } from 'react-toastify';
import Lesson7Python from './pages/Lesson7PythonPage';
import Lesson8Python from './pages/Lesson8PythonPage';
import Lesson9Python from './pages/Lesson9PythonPage';
import Lesson10Python from './pages/Lesson10PythonPage';
import Lesson11Python from './pages/Lesson11PythonPage';
import Lesson12Python from './pages/Lesson12PythonPage';
import Lesson13Python from './pages/Lesson13PythonPage';
import Lesson14Python from './pages/Lesson14PythonPage';
import Lesson15Python from './pages/Lesson15PythonPage';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const inactivityTimeout = 1200000; 

  useEffect(() => {
    // Очищаем токен и сбрасываем сессию при загрузке /loginreg
    if (location.pathname === '/loginreg') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      setSessionExpired(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return; // Не отслеживаем, если токен отсутствует

    const handleActivity = () => {
      if (!sessionExpired) {
        setLastActivity(Date.now());
      }
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastActivity > inactivityTimeout && !sessionExpired) {
        setSessionExpired(true);
      }
    }, 2000);

    return () => {
      clearInterval(checkInactivity);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [lastActivity, sessionExpired]);

  const handleLoginAgain = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    navigate('/loginreg', { replace: true });
    setSessionExpired(false);
  };

  // Проверка токена при изменении маршрута
  useEffect(() => {
    const token = localStorage.getItem('token');
    const protectedRoutes = [
      '/profile', '/edit-profile', '/python', '/csh', '/html', '/golang', '/matgram',
      '/gramchten', '/osnovinfo', '/less1python', '/less2python', '/less3python',
      '/less4python', '/less5python', '/less6python', '/less7python', '/less8python',
      '/less9python', '/less10python', '/less11python', '/less12python', '/less13python',
      '/less14python', '/less15python', '/less1csh', '/less2csh', '/less3csh', '/less4csh',
      '/less1html', '/less2html', '/less3html', '/less4html', '/less5html', '/less1go',
      '/less2go', '/less3go', '/less4go', '/less5go', '/less1math', '/less2math',
      '/less3math', '/less4math', '/less5math', '/less6math', '/less7math', '/less8math', '/less9math', '/less10math', '/less11math', '/test1math'
    ];

    if (!token && protectedRoutes.includes(location.pathname)) {
      navigate('/loginreg', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <>
      {location.pathname !== '/loginreg' &&
        location.pathname !== '/forgpass' &&
        location.pathname !== '/resetpass' &&
        location.pathname !== '/less1python' &&
        location.pathname !== '/less2python' &&
        location.pathname !== '/less3python' &&
        location.pathname !== '/less4python' &&
        location.pathname !== '/less5python' &&
        location.pathname !== '/less6python' &&
        location.pathname !== '/less7python' &&
        location.pathname !== '/less8python' &&
        location.pathname !== '/less9python' &&
        location.pathname !== '/less10python' &&
        location.pathname !== '/less11python' &&
        location.pathname !== '/less12python' &&
        location.pathname !== '/less13python' &&
        location.pathname !== '/less14python' &&
        location.pathname !== '/less15python' &&
        location.pathname !== '/less1csh' &&
        location.pathname !== '/less2csh' &&
        location.pathname !== '/less3csh' &&
        location.pathname !== '/less4csh' &&
        location.pathname !== '/less1html' &&
        location.pathname !== '/less2html' &&
        location.pathname !== '/less3html' &&
        location.pathname !== '/less4html' &&
        location.pathname !== '/less5html' &&
        location.pathname !== '/less1go' &&
        location.pathname !== '/less2go' &&
        location.pathname !== '/less3go' &&
        location.pathname !== '/less4go' &&
        location.pathname !== '/less5go' &&
        location.pathname !== '/less1math' &&
        location.pathname !== '/less2math' &&
        location.pathname !== '/less3math' &&
        location.pathname !== '/less4math' &&
        location.pathname !== '/less5math' &&
        location.pathname !== '/less6math' &&
        location.pathname !== '/less7math' &&
        location.pathname !== '/less8math' &&
        location.pathname !== '/less9math' &&
        location.pathname !== '/less10math' &&
        location.pathname !== '/less11math' &&
        location.pathname !== '/test1math' &&
        location.pathname !== '/profile' && 
        location.pathname !== '/edit-profile' && <Header />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/programming" element={<Programming />} />
        <Route path="/ent" element={<EntPage />} />
        <Route path="/python" element={<PythonCoursePage />} />
        <Route path="/csh" element={<CSHcoursePage />} />
        <Route path="/html" element={<HtmlCoursePage />} />
        <Route path="/golang" element={<GolangPage />} />
        <Route path="/matgram" element={<MatGramCoursePage />} />
        <Route path="/gramchten" element={<GramChtenCoursePage />} />
        <Route path="/osnovinfo" element={<OsnovInfoPage />} />
        <Route path="/loginreg" element={<LoginRegistPage />} />
        <Route path="/forgpass" element={<ForgotPassword />} />
        <Route path="/resetpass" element={<ResetPassword />} />
        <Route path="/less1python" element={<Lesson1Python />} />
        <Route path="/less2python" element={<Lesson2Python />} />
        <Route path="/less3python" element={<Lesson3Python />} />
        <Route path="/less4python" element={<Lesson4Python />} />
        <Route path="/less5python" element={<Lesson5Python />} />
        <Route path="/less6python" element={<Lesson6Python />} />
        <Route path="/less7python" element={<Lesson7Python />} />
        <Route path="/less8python" element={<Lesson8Python />} />
        <Route path="/less9python" element={<Lesson9Python />} />
        <Route path="/less10python" element={<Lesson10Python />} />
        <Route path="/less11python" element={<Lesson11Python />} />
        <Route path="/less12python" element={<Lesson12Python />} />
        <Route path="/less13python" element={<Lesson13Python />} />
        <Route path="/less14python" element={<Lesson14Python />} />
        <Route path="/less15python" element={<Lesson15Python />} />
        <Route path="/less1csh" element={<CSHlesson1Page />} />
        <Route path="/less2csh" element={<CSHlesson2Page />} />
        <Route path="/less3csh" element={<CSHlesson3Page />} />
        <Route path="/less4csh" element={<CSHlesson4Page />} />
        <Route path="/less1html" element={<HtmlLesson1Page />} />
        <Route path="/less2html" element={<HtmlLesson2Page />} />
        <Route path="/less3html" element={<HtmlLesson3Page />} />
        <Route path="/less4html" element={<HtmlLesson4Page />} />
        <Route path="/less5html" element={<HtmlLesson5Page />} />
        <Route path="/less1go" element={<GoLesson1Page />} />
        <Route path="/less2go" element={<GoLesson2Page />} />
        <Route path="/less3go" element={<GoLesson3Page />} />
        <Route path="/less4go" element={<GoLesson4Page />} />
        <Route path="/less5go" element={<GoLesson5Page />} />
        <Route path="/less1math" element={<MatgramLesson1Page />} />
        <Route path="/less2math" element={<MatgramLesson2Page />} />
        <Route path="/less3math" element={<MatgramLesson3Page />} />
        <Route path="/less4math" element={<MatgramLesson4Page />} />
        <Route path="/less5math" element={<MatgramLesson5Page />} />
        <Route path="/less6math" element={<MatgramLesson6Page />} />
        <Route path="/less7math" element={<MatgramLesson7Page />} />
        <Route path="/less8math" element={<MatgramLesson8Page />} />
        <Route path="/less9math" element={<MatgramLesson9Page />} />
        <Route path="/less10math" element={<MatgramLesson10Page />} />
        <Route path="/less11math" element={<MatgramLesson11Page />} />
        <Route path="/test1math" element={<MathTest1 />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Routes>
      
      {location.pathname !== '/courses' &&
        location.pathname !== '/programming' &&
        location.pathname !== '/ent' &&
        location.pathname !== '/python' &&
        location.pathname !== '/csh' &&
        location.pathname !== '/html' &&
        location.pathname !== '/golang' &&
        location.pathname !== '/matgram' &&
        location.pathname !== '/gramchten' &&
        location.pathname !== '/osnovinfo' &&
        location.pathname !== '/loginreg' &&
        location.pathname !== '/forgpass' &&
        location.pathname !== '/resetpass' &&
        location.pathname !== '/less1python' &&
        location.pathname !== '/less2python' &&
        location.pathname !== '/less3python' &&
        location.pathname !== '/less4python' &&
        location.pathname !== '/less5python' &&
        location.pathname !== '/less6python' &&
        location.pathname !== '/less7python' &&
        location.pathname !== '/less8python' &&
        location.pathname !== '/less9python' &&
        location.pathname !== '/less10python' &&
        location.pathname !== '/less11python' &&
        location.pathname !== '/less12python' &&
        location.pathname !== '/less13python' &&
        location.pathname !== '/less14python' &&
        location.pathname !== '/less15python' &&
        location.pathname !== '/less1csh' &&
        location.pathname !== '/less2csh' &&
        location.pathname !== '/less3csh' &&
        location.pathname !== '/less4csh' &&
        location.pathname !== '/less1html' &&
        location.pathname !== '/less2html' &&
        location.pathname !== '/less3html' &&
        location.pathname !== '/less4html' &&
        location.pathname !== '/less5html' &&
        location.pathname !== '/less1go' &&
        location.pathname !== '/less2go' &&
        location.pathname !== '/less3go' &&
        location.pathname !== '/less4go' &&
        location.pathname !== '/less5go' &&
        location.pathname !== '/less1math' &&
        location.pathname !== '/less2math' &&
        location.pathname !== '/less3math' &&
        location.pathname !== '/less4math' &&
        location.pathname !== '/less5math' &&
        location.pathname !== '/less6math' &&
        location.pathname !== '/less7math' &&
        location.pathname !== '/less8math' &&
        location.pathname !== '/less9math' &&
        location.pathname !== '/less10math' &&
        location.pathname !== '/less11math' &&
        location.pathname !== '/test1math' &&
        location.pathname !== '/profile' && 
        location.pathname !== '/edit-profile' && <Footer />}
      
      <Dialog
        open={sessionExpired && !!localStorage.getItem('token')} // Показываем только если токен есть
        onClose={() => {}} 
        disableBackdropClick
        disableEscapeKeyDown
        BackdropProps={{
          style: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 },
        }}
        sx={{
          '& .MuiDialog-paper': {
            border: '3px solid #374D45',
            borderRadius: '16px',
            zIndex: 1300,
          },
        }}
      >
        <DialogTitle sx={{ fontFamily: 'Tektur', color: '#374D45' }}>Сессия завершена</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#374D45', fontFamily: 'Tektur' }}>
            Ваша сессия была прекращена из-за длительного бездействия. Пожалуйста, войдите заново.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: '16px' }}>
          <Button
            onClick={handleLoginAgain}
            sx={{
              backgroundColor: '#C1E1C1',
              color: '#3a5a40',
              border: '3px solid #3a5a40',
              fontFamily: 'Tektur',
              '&:hover': { backgroundColor: '#B2D6B2' },
            }}
          >
            Войти заново
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function App() {
  return (
    <ProfileProvider>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ScrollToTop />
        <AchievementNotifier />
        <AppContent />
      </Router>
    </ProfileProvider>
  );
}

export default App;