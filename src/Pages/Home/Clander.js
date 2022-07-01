import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const Clander = () => {
    const [value, onChange] = useState(new Date());
    return (
        <div className='card card-compact  bg-base-100 shadow-xl '>
      <div className='card-body mx-auto'>
      <Calendar onChange={onChange} value={value} />
      </div>
    </div>
    );
};

export default Clander;