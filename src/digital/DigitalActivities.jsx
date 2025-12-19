import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/worksheets.css";
import "../styles/aacTheme.css";

export default function DigitalActivities() {
  const items = [
    { to: '/patientside/festivals', title: 'Festivals matching worksheet', desc: 'Drag & drop festival pictures to their names.' },
    { to: '/patientside/food', title: 'Food matching worksheet', desc: 'Match popular Indian foods to their names.' },
    { to: '/patientside/aac', title: 'AAC Demo (speech buttons)', desc: 'Try the assistive communication buttons.' },
    { to: '/patientside/teacher', title: 'Teacher: Create worksheet', desc: 'Create new matching worksheets.' },
    { to: '/patientside/student', title: 'Student: Play latest worksheet', desc: 'Play the most recently created worksheet.' },
  ];

  return (
    <div className="aac-bg">
      <div className="flower-container">
        <div className="flower flower-left" />
        <div className="flower flower-right" />
      </div>

      <div className="aac-content">
        <div className="page-grid">
          <div className="worksheets-root">
            <div className="worksheet-header">
              <h1>Digital Activities</h1>
              <p>Open interactive worksheets and activities.</p>
            </div>

            <div className="activities-grid">
              {items.map(i => (
                <div key={i.to} className="activity-card">
                  <div style={{ flex: 1 }}>
                    <Link to={i.to}>{i.title}</Link>
                    <p>{i.desc}</p>
                  </div>
                  <div>
                    <Link className="btn secondary" to={i.to}>Open</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="side-panel">
            <div className="hero-card">
              <h3>Welcome</h3>
              <p style={{ margin: 0 }}>Choose an activity to practice matching, communication, and learning.</p>
            </div>

            <div className="hero-card">
              <h3>Getting started</h3>
              <ul className="tips">
                <li>Try Festivals or Food worksheets to begin.</li>
                <li>Use the Teacher page to create custom worksheets.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
