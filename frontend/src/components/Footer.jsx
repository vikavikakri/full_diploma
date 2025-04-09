import React, { useState, useEffect } from 'react';
import './components.css';

const Footer = () => {
  const [totalDots, setTotalDots] = useState(16);

  useEffect(() => {
    const updateDots = () => {
      if (window.innerWidth <= 480) {
        setTotalDots(8);
      } else if (window.innerWidth <= 768) {
        setTotalDots(12);
      } else {
        setTotalDots(16);
      }
    };

    updateDots(); // Вызываем при загрузке
    window.addEventListener('resize', updateDots); // Обновляем при изменении экрана

    return () => window.removeEventListener('resize', updateDots); // Чистим событие
  }, []);

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-text">Контакты: +7 (701) 777-77-77</p>
        <p className="footer-text">Адрес: ул. Т</p>
      </div>
      <div className="dots-container">
        {Array.from({ length: totalDots }, (_, index) => (
          <div key={index} className="footer-dot"></div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;