const addressSchema = require( './address.schema.json' );
const validate = require( '../../utils/validate' );
const { serialize, deserialize } = require( '../../utils/message-pack' );
const uuid = require( 'uuid' ).v4;

const redis = require( '../../singletons/redis' );
const addressList = require('../../data/addresses.json');

const ADDRESSES = 'addresses';

// eslint-disable-next-line
const log = console.log;

module.exports = {
  async display () {
    log( 'displaying all addresses');
    const addresses = await redis.HGETALL( ADDRESSES)

    // if empty populate with data
    if (!addresses){
      log( 'populating empty db with data')
      for (var data in addressList){
        // log(addressList[data])
        this.add(addressList[data])
      }
    }
    else{
      // deserialize addresses
      for (var key in addresses) {
        addresses[key] = await this.get(key)
      }
    }
    return Object.values(addresses);
  },

  async add( address ) {
    const id = 'addr_' + uuid();

    log( 'creating', id );

    const withId = {
      ...address,
      id,
    };

    validate( addressSchema, withId );

    await redis.HSET( ADDRESSES, withId.id, serialize( withId ) );

    return id;
  },

  async update( id, newData ) {
    log( 'updating', id );
    validate( addressSchema, newData );
    
    await redis.HSET( ADDRESSES, id, serialize( newData ) );
  },

  async delete( id ) {
    log( 'deleting', id );

    await redis.HDEL( ADDRESSES, id );
  },

  async get( id ) {
    log( 'getting', id );

    const res = await redis.HGET( ADDRESSES, id );
    if ( !res ) return;
    
    return deserialize( res );
  },

  async search( searchString = '' ) {
    log( 'searching', searchString );

    // hint for the interview: Why won't this work in production?

    const addresses = await redis.HGETALL( ADDRESSES );

    return Object.values( addresses )
      .map( ( buffer ) => deserialize( buffer ) )
      // turn the addresses into a flat string
      .filter( ( address ) => {
        const searchable = Object.values( address ).join( ' ' ).toLowerCase();
        return searchable.includes( searchString.toLowerCase() );
      });
  },
};
