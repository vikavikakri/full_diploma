import './ignoreResizeObserver';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 👇 Этот блок теперь можно спокойно вставить после импортов
const observerError = "ResizeObserver loop completed with undelivered notifications";
const originalError = console.error;
console.error = (...args) => {
    if (args[0]?.toString().includes(observerError)) {
        return;
    }
    originalError(...args);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();
