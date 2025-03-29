import Header from "../Components/Header.jsx";
import SearchInputs from "../Components/SearchInputs.jsx";
import "../sass/main.css";
import CountryList from "../Components/CountryList.jsx";

function Countries() {
  return (
    <>
      <div>
        <Header />
        <SearchInputs />
        <CountryList />
      </div>
    </>
  );
}

export default Countries;
