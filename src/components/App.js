import { useState } from "react";
import "./App.css";
import { Form } from "./Form/Form";
import { ContactsList } from "./ContactsList/ContactsList";
import { FilterField } from "./FilterField/FilterField";
import useLocalStorage from "../hooks/useLocaleStorage";

export default function App() {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const [filterContacts, setFilterContacts] = useState([]);

  const Contacts = [...contacts];

  const handleSubmitForm = (contact) => {
    const checkedName = contacts.some((item) => item.name === contact.name);

    if (checkedName) {
      return alert("Sorry, but this Name is in this Phone book");
    }
    console.log(Contacts);
    Contacts.push(contact);
    setContacts(Contacts);
  };

  const deleteContact = (id) => {
    setContacts((prevState) => prevState.filter((item) => item.id !== id));
  };

  const handleFilter = (name) => {
    const filter = Contacts.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilterContacts(filter);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Form onSubmit={handleSubmitForm} />

      {contacts.length > 0 && (
        <ContactsList
          contacts={contacts}
          title="All contacts"
          onDeleteContact={deleteContact}
        />
      )}
      <FilterField onChangeFilter={handleFilter} value={contacts} />

      {filterContacts.length > 0 && (
        <ContactsList contacts={filterContacts} title="Filter Contacts" />
      )}
    </>
  );
}
