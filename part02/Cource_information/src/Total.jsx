export default function Total ({ courses }) { 
const total = courses.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0,)
    
return (
    <>
        <p style={{fontWeight: 'bold'}}> 
            Total of {total} exersices
        </p>
    </>
    )
  }
