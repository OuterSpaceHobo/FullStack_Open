import Name from "./Name"

const NumbersList = ( props ) => {
    return (
        <ul>
            {props.persons.filter(person => 
                person.name.includes(props.filter)).map(person =>
                <Name key={person.id} person={person} deletePerson={props.deletePerson}/>
            )}
        </ul>
    )
  }
  
  export default NumbersList