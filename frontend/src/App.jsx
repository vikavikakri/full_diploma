// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditUserProfile';

function AppContent() {
  const location = useLocation();

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
        location.pathname !== '/profile' && 
        location.pathname !== '/edit-profile' && <Footer />}
    </>
  );
}

function App() {
  return (
    <ProfileProvider>
      <Router>
        <ScrollToTop />
        <AchievementNotifier /> {/* Добавляем уведомления */}
        <AppContent />
      </Router>
    </ProfileProvider>
  );
}

export default App;