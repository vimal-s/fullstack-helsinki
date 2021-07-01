import Weather from "./Weather";

const Country = ({ country }) => {
  console.log("rendering Country");

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>

      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="100" alt="country-flag" />

      <h2>Weather in {country.capital}</h2>
      <Weather countryCapital={country.capital} />
    </div>
  );
};

export default Country;
