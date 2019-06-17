import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
    return(
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    if (props.all===0){
        return(
            <h2>No feedback given</h2>
        )
    }
    else{
        return(
            <>
                <h2>statistics</h2>
                <table>
                    <tbody>
                        <Statistic text="good" value={props.good}/>
                        <Statistic text="neutral" value={props.neutral}/>
                        <Statistic text="bad" value={props.bad}/>
                        <Statistic text="all" value={props.all}/>
                        <Statistic text="average" value={(props.good-props.bad)/props.all}/>
                        <Statistic text="positive" value={(props.good/props.all)*100}/>
                    </tbody>
                </table>

            </>
        )
    }

}

const Button = ({text,onClick}) => {
    return(
        <button onClick={onClick}>{text}</button>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const updateValue= (functionName,value) => ()=>{
        functionName(value)
    }
    const all= good+neutral+bad

    return (
        <div>
            <h2>give feedback</h2>
            <Button onClick={updateValue(setGood,good+1)} text={'good'}/>
            <Button onClick={updateValue(setNeutral,neutral+1)} text={'neutral'}/>
            <Button onClick={updateValue(setBad,bad+1)} text={'bad'}/>
            <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)