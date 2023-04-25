import Total from "./Total"
import Header from "./Header"

export default function Content ({ courses }) { 

    return (
    <>
        <Header courses={courses} />
        <ul>
            {courses.parts.map(part => 
                <li key={part.id}>
                    {part.name} {part.exercises}
                </li>
            )}
        </ul>
        <Total courses={courses} />
    </>
    )
  }