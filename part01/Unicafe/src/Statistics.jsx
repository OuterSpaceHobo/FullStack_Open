import { StatisticLine } from "./StatisticLine"

export default function Statistics (props) { 
    console.log('Total average', props)

    if (props.totalClick === 0) {
        return <p>No feedback given</p>
    }

    return (
    <>
        <h1>Statistics</h1>
        <table>
            <tbody>
                <StatisticLine text="good" stat={props.good} />
                <StatisticLine text="neutral" stat={props.neutral} />
                <StatisticLine text="bad" stat={props.bad}/>
                <StatisticLine text="all" stat={props.totalClick} />
                <StatisticLine text="average" stat={props.totalAvg} />
                <StatisticLine text="positive" stat={props.posPercent} />
            </tbody>
        </table>
    </>
    )
}
