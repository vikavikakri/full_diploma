package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"go-password-reset/db"
	"net/http"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type ResetPasswordRequest struct {
	Email           string `json:"email"`
	Code            string `json:"code"`
	NewPassword     string `json:"newPassword"`
	ConfirmPassword string `json:"confirmPassword"`
}

func ResetPassword(w http.ResponseWriter, r *http.Request) {
	var req ResetPasswordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Неверный формат запроса", http.StatusBadRequest)
		return
	}

	if req.NewPassword != req.ConfirmPassword {
		http.Error(w, "Пароли не совпадают", http.StatusBadRequest)
		return
	}

	var userID int
	err := db.DB.QueryRow("SELECT id FROM users WHERE email=$1", strings.ToLower(req.Email)).Scan(&userID)
	if err == sql.ErrNoRows {
		http.Error(w, "Пользователь не найден", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return
	}

	var codeFromDB string
	var createdAt time.Time
	err = db.DB.QueryRow("SELECT reset_code, created_at FROM password_resets WHERE user_id=$1 ORDER BY created_at DESC LIMIT 1", userID).Scan(&codeFromDB, &createdAt)
	if err == sql.ErrNoRows {
		http.Error(w, "Код не найден", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return
	}

	// Проверка срока действия кода (10 минут)
	if time.Since(createdAt) > 10*time.Minute {
		http.Error(w, "Код сброса истёк", http.StatusBadRequest)
		return
	}

	fmt.Println("Код, введённый пользователем:", req.Code)
	fmt.Println("Код из базы данных:", codeFromDB)

	// Проверка кода
	if strings.TrimSpace(strings.ToLower(req.Code)) != strings.TrimSpace(strings.ToLower(codeFromDB)) {
		http.Error(w, "Неверный код", http.StatusBadRequest)
		return
	}

	// Хеширование нового пароля
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Ошибка при хешировании пароля", http.StatusInternalServerError)
		return
	}

	// Обновление пароля пользователя
	_, err = db.DB.Exec("UPDATE users SET password_hash=$1 WHERE id=$2", string(hashedPassword), userID)
	if err != nil {
		http.Error(w, "Ошибка при обновлении пароля", http.StatusInternalServerError)
		return
	}

	// Удаление использованных кодов
	_, _ = db.DB.Exec("DELETE FROM password_resets WHERE user_id=$1", userID)

	json.NewEncoder(w).Encode(map[string]string{"message": "Пароль успешно сброшен"})
}
