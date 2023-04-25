const SingleCountry = ( {country} ) => {

    return (
    <>
    <h2>{country.name.official}</h2>
    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area} km2</p>
    <p>Languages:</p>

    {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}

    <img src={country.flags.svg} width={'200px'} alt="" />
    </>
    )
  }
  export default SingleCountry