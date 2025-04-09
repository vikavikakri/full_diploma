import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./forgotpass.css";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios"; // не забудь установить: npm install axios

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleBackClick = () => {
    navigate('/loginreg');
  };

  const handleSendCode = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/forgot-password", {
        email
      });

      setMessage(response.data.message); 
      localStorage.setItem("resetEmail", email);
      setTimeout(() => {
        navigate('/resetpass');
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage("Пользователь с таким email не найден");
      } else {
        setMessage("Ошибка при отправке запроса");
      }
    }
  };

  return (
    <div className="forgot-password-container-forgpass">
      <div className="forgot-password-card-forgpass">
        <button className="back-button-forgpass" onClick={handleBackClick}>
          <ArrowBackIcon style={{ color: "#2b2b2b" }} />
        </button>

        <h2 className="title-forgpass">Забыли пароль?</h2>

        <label htmlFor="email" className="email-label-forgpass">Email</label>
        <TextField
          id="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input-forgpass"
        />

        <Button
          variant="contained"
          className="send-code-button-forgpass"
          onClick={handleSendCode}
        >
          Отправить код
        </Button>

        {message && <p style={{ marginTop: "1rem", color: "#444" }}>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
