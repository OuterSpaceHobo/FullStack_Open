export default function Header (props) { 
    console.log('Header props', props)

    return <h1>{props.course.name}</h1> 
}

