const Ajv = require( 'ajv' );

module.exports = ( schema, data ) => {
  const ajv = new Ajv();
  const validate = ajv.compile( schema );
  const ok = validate( data );

  if ( !ok ) {
    throw new Error( JSON.stringify( validate.errors ) );
  }
};
