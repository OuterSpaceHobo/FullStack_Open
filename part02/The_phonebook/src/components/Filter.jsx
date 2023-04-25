
const Filter = ( props ) => {
    return (
        <div>
            Filter by name: <input       
            value={props.filter}
            onChange={props.handleFilter}
            />
        </div>
    )
  }
  
  export default Filter