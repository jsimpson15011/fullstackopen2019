import React, {useState} from 'react'

const FilterForm = (props) => {
    return(
            <form>
                filter shown with<input value={props.nameFilter} onChange={props.handleNameFilterChange}/>
            </form>
        )
}
const NewPersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                name:
                <input
                    value={props.nameValue}
                    onChange={props.onNameChange}
                />
            </div>
            <div>
                number:
                <input
                    value={props.numberValue}
                    onChange={props.onNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
const Person = (props) => {
    return (
        <p>{props.name} {props.number}</p>
    )

}
const Persons = ({persons}) => persons.map(
    (person) => {
        return <Person key={person.name} name={person.name} number={person.number}/>
    }
)

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ])
    const [filteredPersons, setFilteredPersons] = useState(persons)

    const [nameFilter, setNameFilter] = useState('')
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameFilterChange = (event) => {
        const newFilteredPersons = persons.filter(
            (person)=>{
                return(
                    person.name.toLowerCase().includes(event.target.value.toLowerCase())
                )
            }
        )
        setNameFilter(event.target.value)
        setFilteredPersons(newFilteredPersons)
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleNewPersonSubmit = (event) => {
        event.preventDefault()
        const newNameObject = {
            name: newName,
            number: newNumber
        }
        const nameCheck = persons.filter(
            (person) => person.name === newName
        ).length

        if (nameCheck) {
            alert(`${newName} is already added to phonebook`)
        }
        else {
            setPersons(persons.concat(newNameObject))
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <FilterForm
                nameFilter={nameFilter}
                handleNameFilterChange={handleNameFilterChange}
            />
            <h2>Add new Person</h2>
            <NewPersonForm
                onSubmit={handleNewPersonSubmit}
                nameValue={newName}
                onNameChange={handleNameChange}
                numberValue={newNumber}
                onNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={filteredPersons} />
        </div>
    )
}

export default App
