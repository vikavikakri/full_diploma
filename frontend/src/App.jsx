import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Programming from "./pages/Programming";
import ScrollToTop from "./pages/ScrollToTop";
import EntPage from "./pages/EntPage";
import PythonCoursePage from "./pages/PythonCoursePage";
import CSHcoursePage from "./pages/CSHcoursePage";
import HtmlCoursePage from "./pages/HtmlCoursePage";
import GolangPage from "./pages/GolangPage";
import MatGramCoursePage from "./pages/MatGramCoursePage";
import GramChtenCoursePage from "./pages/GramChtenCoursePage";
import OsnovInfoPage from "./pages/OsnovInfoPage";
import LoginRegistPage from "./pages/LoginRegistPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPasswordPage";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* Условно рендерим Header, скрываем его на страницах CoursePage и Programming */}
      {location.pathname !== "/courses" && location.pathname !== "/programming" && location.pathname !== "/ent" && location.pathname !== "/python" && location.pathname !== "/csh" && location.pathname !== "/html" && location.pathname !== "/golang" && location.pathname !== "/matgram" && location.pathname !== "/gramchten" && location.pathname !== "/osnovinfo" && location.pathname !== "/loginreg" && location.pathname !== "/forgpass" && location.pathname !== "/resetpass" && <Header />}
      
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
      </Routes>
      
      {/* Условно рендерим Footer, скрываем его только на странице CoursePage */}
      {location.pathname !== "/courses" && location.pathname !== "/programming" && location.pathname !== "/ent" && location.pathname !== "/python" && location.pathname !== "/csh" && location.pathname !== "/html" && location.pathname !== "/golang" && location.pathname !== "/matgram" && location.pathname !== "/gramchten" && location.pathname !== "/osnovinfo" && location.pathname !== "/loginreg" && location.pathname !== "/forgpass" && location.pathname !== "/resetpass" && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
