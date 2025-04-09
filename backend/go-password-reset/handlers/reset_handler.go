package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"go-password-reset/db"
	"go-password-reset/utils"
	"log"
	"math/rand"
	"net/http"
	"strings"
	"time"
)

type ResetRequest struct {
	Email string `json:"email"`
}

func SendResetCode(w http.ResponseWriter, r *http.Request) {
	log.Println("Получен запрос на сброс пароля")

	var req ResetRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Println("Ошибка декодирования JSON:", err)
		http.Error(w, "Неверный формат запроса", http.StatusBadRequest)
		return
	}

	log.Println("Email для сброса:", req.Email)

	var userID int
	err := db.DB.QueryRow("SELECT id FROM users WHERE email=$1", strings.ToLower(req.Email)).Scan(&userID)
	if err == sql.ErrNoRows {
		log.Println("Email не найден в базе:", req.Email)
		http.Error(w, "Пользователь с таким email не найден", http.StatusNotFound)
		return
	} else if err != nil {
		log.Println("Ошибка при запросе к базе данных:", err)
		http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
		return
	}

	log.Println("Найден пользователь с ID:", userID)

	// Генерация кода сброса
	rand.Seed(time.Now().UnixNano())
	code := fmt.Sprintf("%06d", rand.Intn(1000000))
	log.Println("Сгенерированный код сброса:", code)

	// Сохранение кода в БД
	_, err = db.DB.Exec("INSERT INTO password_resets (user_id, reset_code) VALUES ($1, $2)", userID, code)
	if err != nil {
		log.Println("Ошибка при сохранении кода сброса в БД:", err)
		http.Error(w, "Не удалось сохранить код", http.StatusInternalServerError)
		return
	}

	log.Println("Код сброса сохранён в БД")

	// Отправка email
	err = utils.SendResetEmail(req.Email, code)
	if err != nil {
		log.Println("Ошибка при отправке письма:", err)
		http.Error(w, "Ошибка при отправке письма", http.StatusInternalServerError)
		return
	}

	log.Println("Код сброса успешно отправлен на email:", req.Email)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Код сброса отправлен на email"})
}
