import axios from "axios";
import { useEffect, useState } from "react";

const Input = ({ value, onChange }) => (
  <input value={value} onChange={onChange} />
);

const Form = ({ name, phone, onNameChange, onPhoneChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <Input value={name} onChange={onNameChange} />
    </div>
    <div>
      number: <Input value={phone} onChange={onPhoneChange} />
    </div>
    <button type="submit">add</button>
  </form>
);

const Person = ({ person }) => (
  <li>
    {person.name} {person.phone}
  </li>
);

const Persons = ({ persons }) => (
  <ul>
    {persons.map((person) => (
      <Person key={person.name} person={person} />
    ))}
  </ul>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameToFilter, setNameToFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data))
      .catch((error) => console.log("error occured", error))
      .then(() => console.log("cleanup tasks"));
  }, []);

  const addDetails = (event) => {
    event.preventDefault();

    // todo: do you want to restrict user to add only digits in phone

    // todo: may have to check empty name and name with only space before adding
    const found = persons.some(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
    if (!found) {
      setPersons(persons.concat({ name: name, phone: phone }));
    } else {
      alert(`'${name}' is already added to phonebook`);
    }

    setName("");
    setPhone("");
  };

  const changeName = (event) => setName(event.target.value);

  const changePhone = (event) => setPhone(event.target.value);

  const changeNameToFilter = (event) => {
    setNameToFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(nameToFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter names conatining{" "}
        <Input value={nameToFilter} onChange={changeNameToFilter} />
      </div>
      <h2>Add new detail</h2>
      <Form
        name={name}
        phone={phone}
        onNameChange={changeName}
        onPhoneChange={changePhone}
        onSubmit={addDetails}
      />
      <h2>Name and Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
