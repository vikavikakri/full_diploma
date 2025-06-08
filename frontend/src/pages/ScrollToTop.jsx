import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Проверка: если это страницы, на которых скролл отключён — просто выходим
    const disabledPaths = ["/python", "/csh", "/html", "/golang", "/matgram"];
    if (disabledPaths.includes(pathname)) return;

    // Иначе — плавный скролл к верху
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }, [pathname]);

  return null;
}
