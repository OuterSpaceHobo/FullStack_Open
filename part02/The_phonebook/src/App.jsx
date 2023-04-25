import { useState, useEffect } from 'react'
import NumbersList from './components/NumbersList'
import Filter from './components/Filter'
import Form from './components/Form'
import { GetAll, Create, Delete, Update } from './services/persons.js'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    console.log('effect')
      GetAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

    const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber,
        id: newName
      }
      if (persons.some(person => person.name === newName && person.number === newNumber)) {
        setNotification(
          `'${newName}' is already added to the phonebook`
        )
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      } else if (persons.some(person => person.name === newName && person.number !== newNumber)) {
        window.confirm(`add new number for ${newName} ?`)
        Update(newName, personObject)
        .then(response => {
          console.log('updated person', response)
          setPersons(persons.map(person =>
            person.id !== personObject.id ? person : personObject))
          setNewName('')
          setNewNumber('')
          setNotification(
            `'${personObject.name}' phone succesfully updated`
          )
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(error => {
          setNotification(
            `Error '${personObject.name}' phone not updated`
          )
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
      } else {
        Create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNotification(
            `'${personObject.name}' succesfully added`
          )
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(error => {
          setNotification(
            `Error '${personObject.name}' not added`
          )
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
      }
    }

    const deletePerson = (id, name) => {
      window.confirm(`delete ${name} ?`)
        Delete(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification(
            `'${name}' succesfully deleted`
          )
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(error => {
          setNotification(
            `Error '${name}' not deleted`
          )
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
    }

    const handleNameChange = (event) => {
      console.log('name change', event.target.value)
      setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
      console.log('number change', event.target.value)
      setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
      console.log('filter change', event.target.value)
      setFilter(event.target.value)
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter 
        filter={filter} 
        handleFilter={handleFilter}
      />
      <h2>Add a new contact</h2>
      <Form 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <NumbersList 
        persons={persons} 
        deletePerson={deletePerson}
        filter={filter} 
      />
    </div>
  )
}

export default App