const msgpack = require( 'msgpack-lite' );

const ENCODING_TYPE = 'base64';

module.exports = {
  serialize( payload ) {
    const val = msgpack.encode( payload );
    return val.toString( ENCODING_TYPE );
  },
  deserialize( payload ) {
    const buff = Buffer.from( payload, ENCODING_TYPE );
    return msgpack.decode( buff );
  },
};
