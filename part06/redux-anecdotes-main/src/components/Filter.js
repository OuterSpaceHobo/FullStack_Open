import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'


const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        console.log('filter change', event.target.value)
        dispatch(filterChange(event.target.value))
      // input-field value is in variable event.target.value
    }
    const style = {
      marginBottom: 10
    }
  
    return (
    <>
    <h2>Anecdotes</h2>
    <div 
        style={style}>
        filter:
            <input 
            onChange={handleChange} />
    </div>
    </>
    )
  }
  
  export default Filter