import WebSocket from 'ws';

const server = new WebSocket.Server({ port: 8080 }); // Cambia el puerto si es necesario
const clients = new Set();

let gameState = Array(9).fill(null); // Estado inicial del tablero

server.on('connection', (socket) => {
  clients.add(socket);
  console.log('Jugador conectado.');

  // Enviar el estado inicial del tablero al nuevo jugador
  socket.send(JSON.stringify({ type: 'state', gameState }));

  socket.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'move') {
      // Actualizar el estado del juego
      const { index, player } = data;
      if (!gameState[index]) {
        gameState[index] = player;

        // Difundir el cambio a todos los clientes
        clients.forEach((client) => {
          client.send(JSON.stringify({ type: 'move', gameState }));
        });
      }
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
    console.log('Jugador desconectado.');
  });
});

console.log('Servidor WebSocket ejecutándose en el puerto 5173');
