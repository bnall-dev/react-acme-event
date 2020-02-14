import React, { useState } from 'react';
import CreateEvent from './CreateEvent';
import EventList from './EventList';
import moment from 'moment';
import './App.css';

function App() {
  let [list, setList] = useState([]);
  const currentDate = new Date();
  const currentWeekday = currentDate.getDay();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();

  let [title, setTitle] = useState('');
  let [content, setContent] = useState('');

  let [inputDate, setInputDate] = useState(
    moment(currentDate).format('YYYY-MM-DD')
  );

  const handleSubmit = e => {
    e.preventDefault();

    let newItem = {
      date: e.target.elements[0].value,
      title: e.target.elements[1].value,
      content: e.target.elements[2].value,
      status: undefined,
    };
    let newList = [...list, newItem];
    let sortedList = newList.sort(function(a, b) {
      if (Date.parse(a.date) > Date.parse(b.date)) {
        return 1;
      } else if (Date.parse(a.date) < Date.parse(b.date)) {
        return -1;
      }
    });

    let currentDate = moment().toDate();
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    sortedList.map(function(item, i) {
      let itemDate = moment(item.date).toDate();
      if (itemDate > currentDate) {
        item.status = 'future';
      } else if (itemDate < currentDate) {
        item.status = 'past';
      } else {
        item.status = 'current';
      }
      return sortedList;
    });
    setList(sortedList);
    setInputDate(moment(currentDate).format('YYYY-MM-DD'));
    setTitle('');
    setContent('');
  };
  const handleClick = e => {
    if (e.target.className === 'delete') {
      let listCopy = [...list];
      let deleteList = document.querySelectorAll('.delete');
      let newDeleteList = [...deleteList];
      let i = newDeleteList.indexOf(e.target);
      listCopy.splice(i, 1);
      setList(listCopy);
    }
  };

  const week = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleChange = e => {
    if (e.target.id === 'date') {
      setInputDate(e.target.value);
    } else if (e.target.id === 'title') {
      setTitle(e.target.value);
    } else if (e.target.id === 'content') {
      setContent(e.target.value);
    }
  };

  return (
    <div id="app">
      <header>
        <h1>The Acme Event Site</h1>
        <h3>
          Welcome! Today is {week[currentWeekday]}, {months[currentMonth]}{' '}
          {currentDay}, {currentYear}
        </h3>
      </header>
      <div id="body">
        <CreateEvent
          currentDate={currentDate}
          handleSubmit={handleSubmit}
          list={list}
          inputDate={inputDate}
          handleChange={handleChange}
          title={title}
          content={content}
          handleClick={handleClick}
        />
        <div id="eventList">
          <h3>Events</h3>
          <div id="listDiv">
            {' '}
            <EventList list={list} handleClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
