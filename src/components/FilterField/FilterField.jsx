import { Component } from "react";

export const FilterField = ({ onChangeFilter }) => {
  const onHandleChange = (e) => {
    onChangeFilter(e.target.value);
  };

  return (
    <label>
      <span className="label-form">Search contact</span>
      <input
        type="text"
        name="filter"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={onHandleChange}
      />
    </label>
  );
};
