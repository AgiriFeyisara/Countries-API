import { Routes, Route } from "react-router-dom";
import Countries from "./Components/Countries";
import CountryDetails from "./Components/CountryDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Countries />} />
      <Route path="/country/:cca3" element={<CountryDetails />} />
    </Routes>
  );
}

export default App;
