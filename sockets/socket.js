const {io} = require('../index');

// Socket Messages
io.on('connection', client => {
  console.log('Connected');
  client.on('disconnect', () => {
    console.log('Disconnected');
  });
  client.on( 'message', ( payload ) => {
    console.log('Message:', payload.name);
    io.emit('message',{ admin:'Message received' });
  });
});