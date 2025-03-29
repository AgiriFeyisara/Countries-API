import ToggleBtn from "./ToggleBtn";

function Header({ darkMode, toggleTheme }) {
  return (
    <div className={`header ${darkMode ? "dark-header" : ""}`}>
      <h1>Where in the world?</h1>
      <ToggleBtn darkMode={darkMode} toggleTheme={toggleTheme} />
    </div>
  );
}

export default Header;
