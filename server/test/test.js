require( '../controllers/address/index.test' );

after( async () => {
  require( '../singletons/redis' ).end();
});
