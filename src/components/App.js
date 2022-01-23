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

// class OldApp extends Component {
//   state = {
//     contacts: [
//       { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//       { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//       { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//       { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
//     ],
//     filter: "",
//   };

//   FilterList = [];
//   Contacts = [...this.state.contacts];

//   handleFilter = (value) => {
//     this.setState({ filter: value });
//     this.FilterList = [...this.Contacts].filter(({ name }) =>
//       name.toLowerCase().includes(value.toLowerCase())
//     );
//   };

//   handleSubmitForm = (data) => {
//     const checkedName = this.onSearchNameInState(data);

//     if (checkedName) {
//       return alert("Sorry, but this Name is in this Phone book");
//     }
//     this.createNewContact(data);
//   };

//   onSearchNameInState = (target) => {
//     return this.state.contacts.some((item) => item.name === target.name);
//   };

//   createNewContact = (contact) => {
//     this.Contacts.push(contact);
//     this.setState({ contacts: this.Contacts });
//   };

//   deleteContact = (contact) => {
//     this.setState((prevState) => ({
//       contacts: prevState.contacts.filter(({ id }) => id !== contact),
//     }));
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const isEmptyFilterList = filter.length > 0;
//     const isEmptyContactList = contacts.length >= 0;
//     return (
//       <>
//         <Form onSubmit={this.handleSubmitForm} />

//         {isEmptyContactList && (
//           <ContactsList
//             contacts={contacts}
//             title="All contacts"
//             onDeleteContact={this.deleteContact}
//           />
//         )}
//         <FilterField onChange={this.handleFilter} value={filter} />

//         {isEmptyFilterList && (
//           <ContactsList contacts={this.FilterList} title="Filter Contacts" />
//         )}
//       </>
//     );
//   }
// }
