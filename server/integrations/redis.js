const util = require( 'util' );
const assert = require( 'assert' );
const { URL } = require( 'url' );
const redis = require( 'redis' );
const { serialize, deserialize } = require( '../utils/message-pack' );

const redisClient = ( redisUrl ) => {
  const parsedUrl = new URL( redisUrl );
  assert(
    !parsedUrl.pathname,
    `Url parsed out to having a path ${parsedUrl} - check the URL since it's not supposed to have one`,
  );

  const config = {
    url: redisUrl,
    tls: parsedUrl.port === '6380'
      ? { servername: parsedUrl.hostname }
      : undefined,
  };

  const client = redis.createClient( config );

  const clientFns = [];
  for ( const key in client ) {
    const val = client[key];
    if ( typeof val === 'function' && typeof val.bind === 'function' ) {
      clientFns.push([ key, val ]);
    }
  }

  return {
    ...clientFns
      .reduce( ( prev, entry ) => {
        const [ key, value ] = entry;
        return {
          ...prev,
          [key]: util.promisify( value.bind( client ) ),
        };
      }, {}),
    serialize,
    deserialize,
    get configOpts() {
      return config;
    },
  };
};

module.exports = redisClient;
