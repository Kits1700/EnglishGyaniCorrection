import React from 'react';

function Child(props) {
  return (
    <div>
      <h1>{props.myStateProp}</h1>
    </div>
  );
}
export default Child;