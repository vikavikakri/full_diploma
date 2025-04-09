import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import "./resetpass.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("resetEmail") || "");

  const handleBackClick = () => {
    navigate("/loginreg");
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Пароли не совпадают");
      return;
    }

    try {
      const email = localStorage.getItem("resetEmail");
      const response = await axios.post("http://localhost:5001/api/reset-password", {
        email,
        code,
        newPassword,
        confirmPassword,
      });
  
      setMessage(response.data.message || "Пароль успешно сброшен");
  
      // 🔐 авторизация после сброса
      const loginResponse = await axios.post("http://localhost:5000/api/login", {
        email,
        password: newPassword,
      });
  
      const { token, user } = loginResponse.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("username", user.username);
  
      setTimeout(() => {
        navigate("/"); // 🏠 редирект на главную
      }, 1000);
  
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage("Неверный код сброса");
      } else {
        setMessage("Ошибка при сбросе пароля");
      }
    }
  };

  return (
    <div className="reset-password-container-resetpass">
      <div className="reset-password-card-resetpass">
        <button className="back-button-resetpass" onClick={handleBackClick}>
          <ArrowBackIcon style={{ color: "#2b2b2b" }} />
        </button>

        <h2 className="title-resetpass">Сброс пароля</h2>

        <TextField
          label="Код сброса"
          fullWidth
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="input-resetpass"
        />

        <TextField
          label="Новый пароль"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input-resetpass"
          style={{ marginTop: "20px" }}
        />

        <TextField
          label="Подтвердите пароль"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-resetpass"
          style={{ marginTop: "20px" }}
        />

        <Button
          variant="contained"
          className="reset-button-resetpass"
          onClick={handleResetPassword}
        >
          Сбросить пароль
        </Button>

        {message && <p className="message-resetpass">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
