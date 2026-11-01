import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = "انتخاب کنید",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  const selectHandler = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative">
      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="input-style flex items-center justify-between text-right"
      >
        <span className={selectedOption ? "" : "text-[var(--text-muted)]"}>
          {selectedOption?.label || placeholder}
        </span>

        <IoIosArrowDown
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {/* Options */}
      {isOpen && (
        <ul className="absolute right-0 top-full z-50 mt-2 max-h-50 w-full overflow-y-auto rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-1 shadow-lg">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => selectHandler(option)}
                className={`w-full rounded-md px-4 py-3 text-right text-sm transition-colors hover:bg-[var(--bg-tertiary)] ${
                  option.value === value
                    ? "bg-[var(--bg-tertiary)] text-[var(--color-primary)]"
                    : "text-[var(--text-primary)]"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;
