import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Components/Header";

function CountryDetails() {
  const { cca3 } = useParams(); // Get country code from URL
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        console.log(`Fetching details for: ${cca3}`);
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${cca3}`
        );
        if (!response.ok) {
          throw new Error("Country not found");
        }
        const data = await response.json();
        if (!data.length) {
          throw new Error("Invalid country code");
        }
        const countryData = data[0];
        setCountry(countryData);

        // Fetch Border Countries
        if (countryData.borders && countryData.borders.length > 0) {
          const borderResponse = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(
              ","
            )}`
          );
          const borderData = await borderResponse.json();
          setBorderCountries(
            borderData.map((border) => ({
              name: border.name.common,
              cca3: border.cca3,
            }))
          );
        } else {
          setBorderCountries([]); // No border countries
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [cca3]);

  if (loading) return <div>Loading country details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!country) return <div>No country found.</div>;

  return (
    <div>
      <Header />
      <Link to="/">
        <button className="btn2">⬅ Back</button>
      </Link>

      <div className="detail">
        <img
          src={country.flags?.png}
          alt={`Flag of ${country.name?.common}`}
          className="country-flag"
        />
        <div className="details-text">
          <h1 className="name">{country.name?.common}</h1>
          <div className="details-wrapper">
            <div className="details1">
              <p>
                <strong>Native Name:</strong>{" "}
                {country.name?.nativeName
                  ? Object.values(country.name.nativeName)[0]?.common
                  : "N/A"}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Sub-region:</strong> {country.subregion || "N/A"}
              </p>
              <p>
                <strong>Capital:</strong>{" "}
                {country.capital ? country.capital[0] : "N/A"}
              </p>
            </div>
            <div className="details2">
              <p>
                <strong>Top Level Domain:</strong>{" "}
                {country.tld ? country.tld.join(", ") : "N/A"}
              </p>
              <p>
                <strong>Currencies:</strong>{" "}
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((curr) => curr.name)
                      .join(", ")
                  : "N/A"}
              </p>
              <p>
                <strong>Languages:</strong>{" "}
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Border Countries */}
          <div className="border">
            <h1>Border Countries: </h1>
            {borderCountries.length > 0 ? (
              borderCountries.map((border) => (
                <Link key={border.cca3} to={`/country/${border.cca3}`}>
                  <button>{border.name}</button>
                </Link>
              ))
            ) : (
              <p>No border countries</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
