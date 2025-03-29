import React, { useState, useEffect } from "react";
import useSWR from "swr";
import CountryList from "./CountryList";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function SearchInputs() {
  const [countryName, setCountryName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const {
    data: countries,
    error,
    isLoading,
  } = useSWR("https://restcountries.com/v3.1/all", fetcher);

  useEffect(() => {
    if (!countries) return;

    let filtered = countries;

    if (countryName.trim() !== "") {
      filtered = filtered.filter((country) =>
        country.name?.common?.toLowerCase().includes(countryName.toLowerCase())
      );
    }

    if (selectedRegion !== "") {
      filtered = filtered.filter(
        (country) => country.region === selectedRegion
      );
    }

    setFilteredCountries(filtered);
  }, [countryName, selectedRegion, countries]);

  function handleSubmit(e) {
    e.preventDefault();
    setCountryName(e.target.query.value.trim());
  }

  function handleRegionChange(e) {
    setSelectedRegion(e.target.value);
  }

  return (
    <div className="inputSection">
      <div className="search-container">
        <div className="search-box">
          <form onSubmit={handleSubmit}>
            <button className="search-button">
              <i className="fa fa-search"></i>
            </button>
            <input type="search" name="query" placeholder="Search..." />
          </form>
        </div>

        <div className="filter-box">
          <select
            id="region"
            className="region-select"
            onChange={handleRegionChange}
            value={selectedRegion}
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>

      <CountryList
        countries={filteredCountries}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default SearchInputs;
