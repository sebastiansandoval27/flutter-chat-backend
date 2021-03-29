const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');


const bands = new Bands();

bands.addBand( new Band('Ed Sheeran') );
bands.addBand( new Band('Santiago Cruz') );
bands.addBand( new Band('Mana') );
bands.addBand( new Band('U2') );


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands',bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
      console.log('Mensaje', payload);

      io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    });

    client.on('emit-message', ( payload ) => {
      /* io.emit( 'new-message', payload ); // Emite a todos */
      client.broadcast.emit('new-message', payload ); // Emite a todos menos el que lo emitió
    });

    client.on('vote-band', ( payload ) => {
      bands.voteBand(payload.id);
      io.emit('active-bands',bands.getBands());
    });

    client.on('add-band', ( payload ) => {
      var band = new Band(payload.name);
      bands.addBand(band);
      io.emit('active-bands',bands.getBands());
    });

    client.on('delete-band', ( payload ) => {
      bands.deleteBand(payload.id);
      io.emit('active-bands',bands.getBands());
    });
});
