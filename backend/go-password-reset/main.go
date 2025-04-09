package main

import (
	"go-password-reset/db"
	"go-password-reset/handlers"
	"log"
	"net/http"

	"github.com/joho/godotenv"
)

func enableCORS(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Разрешить запросы от frontend (localhost:3000)
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Если это preflight-запрос от браузера, просто завершаем его
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Продолжаем выполнение хендлера
		h.ServeHTTP(w, r)
	}
}

func main() {
	_ = godotenv.Load()

	if err := db.Init(); err != nil {
		log.Fatal("Ошибка подключения к БД:", err)
	}

	http.HandleFunc("/api/forgot-password", enableCORS(handlers.SendResetCode)) //обработчик забыл пароль
	http.HandleFunc("/api/reset-password", enableCORS(handlers.ResetPassword))  //обработчик сменить пароль

	log.Println("Сервер запущен на :5001")
	log.Fatal(http.ListenAndServe(":5001", nil))
}
