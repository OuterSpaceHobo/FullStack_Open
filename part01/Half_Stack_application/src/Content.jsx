import Part from "./Part";

export default function Content (props) { 

    return (
    <>
        <Part name={props.parts[0].name} ex={props.parts[0].exercises}/>
        <Part name={props.parts[1].name} ex={props.parts[0].exercises}/>
        <Part name={props.parts[2].name} ex={props.parts[0].exercises}/>
    </>
    )
}