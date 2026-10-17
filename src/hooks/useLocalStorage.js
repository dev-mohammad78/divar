import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const updateValue = (newValue) => {
    setValue((prev) => {
      const valueToStore =
        typeof newValue === "function" ? newValue(prev) : newValue;

      try {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch {}

      return valueToStore;
    });
  };

  return [value, updateValue];
}

export default useLocalStorage;
