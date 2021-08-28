const express = require( 'express' );

const app = express();

app.get( '/', ( req, res ) => {
  res.send({ greeting: 'Hello world!' });
});

app.listen( process.env.PORT );
