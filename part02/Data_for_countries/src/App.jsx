import { useState, useEffect } from 'react'
import CountriesList from './components/CountriesList'
import Filter from './components/Filter'
import { GetAll } from './services/persons.js'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
      GetAll()
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('fetched', countries, 'list')

    const handleFilter = (event) => {
      console.log('filter change', event.target.value)
      setFilter(event.target.value)
    }

  return (
    <div>
      <Filter 
      filter={filter} 
      handleFilter={handleFilter}
      />
      <CountriesList 
      countries={countries} 
      filter={filter} 
      /> 
    </div>
  )
}

export default App