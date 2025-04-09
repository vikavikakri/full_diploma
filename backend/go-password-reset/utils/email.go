package utils

import (
	"fmt"
	"net/smtp"
	"os"
)

func SendResetEmail(to string, code string) error {
	from := os.Getenv("SMTP_EMAIL")
	password := os.Getenv("SMTP_PASSWORD")
	host := os.Getenv("SMTP_HOST")
	port := os.Getenv("SMTP_PORT")

	auth := smtp.PlainAuth("", from, password, host)

	msg := []byte("To: " + to + "\r\n" +
		"Subject: Код сброса пароля\r\n" +
		"\r\n" +
		"Ваш код сброса пароля: " + code + "\r\n")

	addr := host + ":" + port
	err := smtp.SendMail(addr, auth, from, []string{to}, msg)
	if err != nil {
		fmt.Println("Ошибка отправки письма:", err)
		return err
	}
	return nil
}
