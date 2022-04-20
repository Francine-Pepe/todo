import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import '../App.css';

function Calendario() {
  const [value, onChange] = useState(new Date());

  return (
    <div className='date-picker' style={{color: '#fff'}}> 
      <DatePicker onChange={onChange} value={value} />
    </div>
  );
}

export default Calendario;