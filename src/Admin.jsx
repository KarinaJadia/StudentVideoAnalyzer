import React, { useEffect, useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
 
  // fake data for now 
  useEffect (() => {
    const user_data = [
      {id : 1, name: "Karina", upload: true, transcript: true, admin: true},
      {id : 2, name: "Priya", upload: true, transcript: true, admin: true},
      {id : 3, name: "Faiyhaa", upload: true, transcript: true, admin: true},
      {id : 4, name: "Neev", upload: true, transcript: true, admin: true},
      {id : 5, name: "Xinyi", upload: true, transcript: true, admin: true},
      {id : 6, name: "JonathontheHusky", upload: true, transcript: true, admin: false}
    ];
    
    setUsers(user_data);
  }, []);

  return (
    <div className='page-container'>
      {/* top half has three cards -- chart, # of logins, calendar */}
      <div className='top-half-cards'>
        {/* <div className='chart-card'> Card 1</div>
        <div className='logins-card'> Card 1</div>
        <div className='calendar-card'> Card 1</div> */}

        <div className='floating-top-card'>
          <div className='chart-card'>
            {/* placeholder bar chart, will pull from db eventually */}
            <div className="bar" style={{ height: "60%" }}></div>
            <div className="bar" style={{ height: "80%" }}></div>
            <div className="bar" style={{ height: "40%" }}></div>
            <div className="bar" style={{ height: "70%" }}></div>         
          </div>
        </div>
        
        <div className='floating-top-card'>
          <div className="card-metric">
            {/* will also eventually have db stuff, shows number of users/logins */}
            <h3>125 Users</h3>
            <p>Active This Month</p>
          </div>
        </div>
        <div className='floating-top-card'> 
          <h3> 📅 </h3>
        </div> 
      </div>

      
      {/* bottom half of the webpage is users + permissions */}
      <div className="bottom-half-admin">
        <div className="user-header permissions-header">
          <span className="user-name">User</span>
          <div className="permissions">Permissions</div>
        </div>

        {/* add users from fake db */}
        {users.map(user => (
          <div key={user.id} className='user-row'>
            <span className="user-name">👤 {user.name}</span>

          {/* for now you can't check off checkboxes regardless of admin or not, just reading from db */}
            <div className='permissions'>
              <label className="permission">
                <input type='checkbox' checked={user.admin} readOnly/> 
                  Access Admin Page
              </label>

              <label className="permission">
                <input type='checkbox' checked={user.transcript} readOnly/> 
                  Save Transcript 
              </label>

              <label className="permission">
                <input type='checkbox'checked={user.upload} readOnly/> 
                  Upload Videos 
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
