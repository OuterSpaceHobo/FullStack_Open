export default function Part (props) { 
    console.log('Part props', props)

    return <p>{props.name} {props.ex}</p>  
}
