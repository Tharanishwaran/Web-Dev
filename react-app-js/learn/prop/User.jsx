import React from 'react'

function User(props) {
  return (
    <div>
    <h1>{props.Name}</h1>
    <h2>{props.Age}</h2>
    </div>
  );
}

export default User;