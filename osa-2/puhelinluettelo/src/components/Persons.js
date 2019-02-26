import React from "react";

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      <table>
        <tbody>
          {persons.map(person => (
            <Person
              key={person.id}
              person={person}
              onDelete={deletePerson(person)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Person = ({ person, onDelete }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={onDelete}>poista</button>
      </td>
    </tr>
  );
};

export default Persons;
