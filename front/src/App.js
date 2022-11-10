import { useState, useEffect } from 'react';
import axios from './api/axios';

const App = () => {
  const [testData, setTestData] = useState('');

  useEffect(() => {
    axios.get('/').then((response) => {
      return setTestData(response.data.testBody);
    });
  }, [testData]);

  return (
    <>
      <div>version: {process.env.REACT_APP_SERVICE_VERSION}</div>
      <span>{testData}</span>
    </>
  );
};

export default App;
