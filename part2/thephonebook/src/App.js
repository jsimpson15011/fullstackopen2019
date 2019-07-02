import React, {useState, useEffect} from 'react'
import FilterForm from './components/FilterForm'
import NewPersonForm from './components/NewPersonForm'
import Person from './components/Person'
import personService from './services/persons'
import Notification from "./components/Notification"

const App = () => {

    useEffect(() => {
        personService.getAll()
            .then(
                (persons) => {
                    setPersons(persons)
                    setFilteredPersons(persons)
                }
            )
    }, [])


    const [persons, setPersons] = useState([])
    const [filteredPersons, setFilteredPersons] = useState([])
    const [nameFilter, setNameFilter] = useState('')
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [message, setMessage] = useState('')
    const [notificationClass, setNotificationClass] = useState('')

    const personsToShow = nameFilter.length === 0 ? persons : filteredPersons

    const newMessage = (newMessage, newClass) => {
        setMessage(
            newMessage
        )
        setNotificationClass(
            newClass
        )
        setTimeout(() => {
            setMessage(null)
            setNotificationClass(null)
        }, 5000)
    }

    const handleNameFilterChange = (event) => {
        const newFilteredPersons = persons.filter(
            (person) => {
                return (
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
            if (window.confirm(`${newName} is already added to the phonebook, do you wish to replace the old number with this number?`)) {
                const nameToBeUpdated = persons.filter(person => person.name === newName)[0]
                const nameObjectWithId = {...newNameObject, id: nameToBeUpdated.id}
                console.log(nameObjectWithId)
                personService.update(nameToBeUpdated.id, nameObjectWithId)
                    .then(
                        setPersons(persons.map(person => person.name === newName ? nameObjectWithId : person)),
                        setFilteredPersons(filteredPersons.map(person => person.name === newName ? nameObjectWithId : person))
                    )
                    .then(
                        newMessage(`${nameObjectWithId.name} number changed successfully`, 'success')
                    )
                    .catch(
                        (error)=>{
                            newMessage(`${nameObjectWithId.name} has already been deleted from the server`, 'error')
                        }
                    )
            }
        }
        else {
            personService.create(newNameObject)
                .then(
                    (person) => {
                        setPersons(persons.concat(person))
                    }
                )
                .then(
                    newMessage(`${newNameObject.name} added successfully`, 'success')
                )
        }
    }
    const deletePerson = (id) => {
        const personToBeDeleted = persons.filter((person) => person.id === id)[0]
        if (window.confirm(`delete ${personToBeDeleted.name}?`)) {
            personService.remove(id)
                .then(
                    setPersons(persons.filter((person) => person.id !== id)),
                    setFilteredPersons(filteredPersons.filter((person) => person.id !== id)),
                    newMessage(`${personToBeDeleted.name} deleted successfully`, 'success')
                )
        }
    }
    useEffect(() => {
        const newFilteredPersons = persons.filter(
            (person) => {
                return (
                    person.name.toLowerCase().includes(nameFilter.toLowerCase())
                )
            }
        )
        setFilteredPersons(newFilteredPersons)
    }, [persons, nameFilter])

    const personRows = personsToShow.map(
        (person) => {
            return <Person key={person.name} name={person.name} number={person.number}
                           deletePerson={() => deletePerson(person.id)}/>
        }
    )

    return (
        <div>
            <Notification
                className={notificationClass}
                message={message}
            />
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
            {personRows}
        </div>
    )
}

export default App
