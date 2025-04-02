import { Link } from "react-router-dom";
function CountryList({ countries, isLoading, error }) {
  if (error) return <div className="failure">Failed to load data</div>;
  if (isLoading) return <div className="loading">Loading, please wait...</div>;
  if (!countries || countries.length === 0)
    return <div className="failure"></div>;

  return (
    <div className="details">
      <ul className="list">
        {countries.map((country) => (
          <li key={country.cca3} className="country-box">
            <img
              src={country.flags?.png}
              alt={`flag of ${country.name?.common}`}
            />
            <h2 className="text">
              <Link to={`/country/${country.cca3}`}>
                {country.name?.common}
              </Link>
            </h2>
            <p className="text1">
              <span>Capital</span>:{" "}
              {country.capital ? country.capital[0] : "N/A"}
            </p>
            <p className="text1">
              <span>Region</span>: {country.region}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CountryList;
