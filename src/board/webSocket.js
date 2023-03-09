import React from 'react';
import useWebSocket from 'react-use-websocket';



const WS_URL = 'ws://127.0.0.1:3000';

function Slsp() {
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    }
  });

  return (
    <div>Hello WebSockets!</div>
  );
}

export default Slsp;