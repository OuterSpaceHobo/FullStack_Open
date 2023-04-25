import Content from "./Content"

export default function Course ({ courses }) { 

  return (
  <>
    <h1>Web development curriculum</h1>
    <Content courses={courses[0]} />
    <Content courses={courses[1]} />
  </>
  )
}
