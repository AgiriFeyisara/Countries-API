import { useState } from "react";
import { Sun, Moon } from "lucide-react";

function ToggleBtn() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme");
  };

  return (
    <button onClick={toggleTheme} className="theme-button">
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default ToggleBtn;
