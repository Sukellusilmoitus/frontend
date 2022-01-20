import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/helloworld')
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
      });
  }, []);

  return (
    <div>
      {message}
    </div>
  );
}

export default App;
