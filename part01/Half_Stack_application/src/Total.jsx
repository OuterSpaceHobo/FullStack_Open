export default function Total (props) { 
    console.log('Total props', props)

    return (
    <p>
        Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
    </p>
    )
}

