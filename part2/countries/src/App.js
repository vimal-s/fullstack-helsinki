import axios from "axios";
import { useEffect, useState } from "react";
import Country from "./components/Country";

const App = () => {
  const [filterInput, setFilterInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.log("error occured", error));
  }, []);

  const changeFilterInput = (event) => {
    setFilterInput(event.target.value);
    setCountryName(event.target.value);
  };

  const changeCountryName = (countryName) => setCountryName(countryName);

  let countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(countryName.toLowerCase())
  );

  if (countriesToShow.length === 1) {
    countriesToShow = countriesToShow.map((country) => (
      <Country key={country.name} country={country} />
    ));
  } else if (countriesToShow.length <= 10) {
    countriesToShow = (
      <ul>
        {countriesToShow.map((country) => (
          <li key={country.name}>
            {country.name}{" "}
            <button onClick={() => changeCountryName(country.name)}>
              show
            </button>
          </li>
        ))}
      </ul>
    );
  } else {
    countriesToShow = (
      <p>
        Too many matches ({countriesToShow.length} found). You need to change
        the filter
      </p>
    );
  }

  console.log("rendering App");

  return (
    <div>
      find countries <input value={filterInput} onChange={changeFilterInput} />
      {countriesToShow}
    </div>
  );
};

export default App;
