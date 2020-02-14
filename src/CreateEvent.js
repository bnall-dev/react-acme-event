import React from 'react';
import moment from 'moment';

function CreateEvent(props) {
  return (
    <form id="createEvent" onSubmit={props.handleSubmit}>
      <input
        id="date"
        type="date"
        placeholder={moment(props.currentDate).format('YYYY-MM-DD')}
        value={props.inputDate}
        onChange={props.handleChange}
        required
      ></input>
      <input
        id="title"
        type="text"
        value={props.title}
        placeholder="Title"
        onChange={props.handleChange}
        onClick={props.handleClick}
        maxLength="30"
        required
      ></input>
      <textarea
        id="content"
        type="text"
        value={props.content}
        placeholder="Event Details"
        onChange={props.handleChange}
        onClick={props.handleClick}
        required
      ></textarea>
      <input id="submit" type="submit" value="Submit Event"></input>
    </form>
  );
}

export default CreateEvent;
