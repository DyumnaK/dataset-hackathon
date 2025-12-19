import React from 'react';
import { Link } from 'react-router-dom';

export default function DigitalActivities() {
  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Digital Activities</h1>
      <p>Open interactive worksheets and activities.</p>

      <ul>
        <li><Link to="/patientside/festivals">Festivals matching worksheet</Link></li>
        <li><Link to="/patientside/food">Food matching worksheet</Link></li>
        <li><Link to="/patientside/aac">AAC Demo (speech buttons)</Link></li>
        <li><Link to="/patientside/teacher">Teacher: Create worksheet</Link></li>
        <li><Link to="/patientside/student">Student: Play latest worksheet</Link></li>
      </ul>
    </div>
  );
}
