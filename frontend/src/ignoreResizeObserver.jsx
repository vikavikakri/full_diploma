const observerError = "ResizeObserver loop completed with undelivered notifications";
const originalError = console.error;
console.error = (...args) => {
  if (args[0]?.toString().includes(observerError)) return;
  originalError(...args);
};
