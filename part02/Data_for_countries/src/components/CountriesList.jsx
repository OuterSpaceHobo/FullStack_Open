import Name from "./Name"
import SingleCountry from "./SingleCountry"


const CountriesList = ( props ) => {
    const filteredList = props.countries.filter(country => 
        country.name.official.includes(props.filter))
    
    if (filteredList.length > 10) {
        return <p>Too many countries, try to specify seach</p>
    } else if (filteredList.length <= 10 && filteredList.length !== 1) {
        return <ul>{filteredList.map(country => <Name key={country.name.official} country={country} />)}</ul>
    } else if (filteredList.length === 1) {
        return <ul>{filteredList.map(country => <SingleCountry key={country.name.official} country={country} />)}</ul>
    }
  }
  
  export default CountriesList