import React from 'react';
import moment from 'moment';

function EventList(props) {
  return props.list.map(function(item, i) {
    let key = 'event' + i;
    let date = moment(item.date).format('dddd, MMMM D, YYYY');

    return (
      <div className={['event', item.status].join(' ')} key={key}>
        <h3 className="eventTitle">{item.title}</h3>
        <h5 className="eventDate">on {date}</h5>
        <h5 className="eventContent">{item.content}</h5>
        <button className="delete" onClick={props.handleClick}>
          X
        </button>
      </div>
    );
  });
}

export default EventList;
