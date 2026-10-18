import { useRef } from "react";

function OtpInput({ length = 5, code, setCode }) {
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newCode = code.split("");
    newCode[index] = digit;

    setCode(newCode.join(""));

    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    setCode(pasted.padEnd(length, "").slice(0, length));

    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div dir="ltr" className="mt-8 flex justify-center gap-3">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(element) => (inputsRef.current[index] = element)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={code[index] || ""}
          onChange={(event) => handleChange(event.target.value, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onPaste={handlePaste}
          className="h-14 w-12 rounded-xl border border-[var(--border-color)]
          bg-[var(--bg-secondary)] text-center text-xl font-bold
          text-[var(--text-primary)] outline-none transition
          focus:border-[var(--color-primary)] sm:h-16 sm:w-14"
        />
      ))}
    </div>
  );
}

export default OtpInput;
