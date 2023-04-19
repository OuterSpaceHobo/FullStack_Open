
export const StatisticLine = (props) => (
    <tr>
        <td style={{paddingRight: "5px"}}>  
            {props.text}
        </td>  
        <td>
            {props.stat}
        </td>
    </tr>
)