import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return(
            <button onClick={props.onClick}>{props.text}</button>
        )
}
const Votes = (props) => {
    return(
        <p>has {props.votes} votes</p>
    )
}
const Anecdote= (props) => {
    return(
        <>
            <p>{props.ancedote}</p>
            <Votes votes={props.votes}/>
        </>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVote] = useState(props.voteArray)
    const [highestVote, setHighestVote] = useState(0)
    const [highestVoteIndex, setHighestVoteIndex] = useState(0)

    const randomNumberGenerator= ()=>{
        let randomNumber=Math.floor(Math.random()*(anecdotes.length));
        return(randomNumber)
    }
    const newAnecdote= ()=>{
        setSelected(randomNumberGenerator())
    }
    const updateVote= (voteIndex)=>()=>{
        const copy = [...votes]
        copy[voteIndex]+=1;
        setVote(
            copy
        )
        if (copy[voteIndex]>highestVote){
            const highestIndex= copy.findIndex((vote)=>{return vote===copy[voteIndex]})
            setHighestVote(copy[highestIndex])
            setHighestVoteIndex(highestIndex)
        }
    }

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <Anecdote ancedote={props.anecdotes[selected]} votes={votes[selected]}/>
            <Button text="vote" onClick={updateVote(selected)}/>
            <Button text="next anecdote" onClick={newAnecdote}/>
            <h2>Anecdote with most votes</h2>
            <Anecdote ancedote={props.anecdotes[highestVoteIndex]} votes={votes[highestVoteIndex]}/>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const voteArray= new Array(anecdotes.length+1).join('0').split('').map(parseFloat)

ReactDOM.render(
    <App anecdotes={anecdotes} voteArray={voteArray}/>,
    document.getElementById('root')
)