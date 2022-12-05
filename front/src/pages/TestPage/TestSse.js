const sse = new EventSource('http://localhost:8080/connect');

sse.addEventListener('connect', (e) => {
  const { data: receivedConnectData } = e;
  console.log('connect event data: ', receivedConnectData); // "connected!"
});
