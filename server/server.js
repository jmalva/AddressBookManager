const express = require( 'express' );
const addressController = require( './controllers/address/index' );
const cors = require( 'cors' );

const app = express();
// to read JSON
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );

// allow cross origin requests..
app.use( cors() );

// get all
app.get( '/address-book/', async ( req, res ) => {
  try {
    const addressList = await addressController.display();
    res.send( addressList );
  } catch ( error ) {
    res.send( error );
  }
});

// grab one address
app.get( '/address-book/:id', async ( req, res ) => {
  const addrId = req.params.id;
  try {
    const getAddress = await addressController.get( addrId );
    if ( !getAddress ) {
      res.status( 404 ).json({ err: 'ID not found' });
    }
    res.status( 200 ).json( getAddress );
  } catch ( error ) {
    res.send( error );
  }
});

// add an address
app.post( '/address-book', async ( req, res ) => {
  try {
    // const {userName,line1,city, state} = req.body;
    // console.log(city,state)
    const address = {
      // userName: userName,
      // line1: line1 ,
      // state: state,
      userName: req.body.userName,
      line1: req.body.line1,
      // line2: req.body?.line2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
    };
   
    if ( req.body.line2 ) address.line2 = req.body.line2;

    const addrId = await addressController.add( address ); // returns ID
    const addrData = await addressController.get( addrId );
    if ( addrId ) {
      res.send( addrData ); // send this data + new ID back to front-end
    }
  } catch ( err ) {
    res.status( 400 ).json( err );
  }
});

// update an address
app.put( '/address-book/:id', async ( req, res ) => {

  const addrId = req.params.id;
  const address = {
    userName: req.body.userName,
    line1: req.body.line1,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    id: req.body.id,
  };
  // if it exists add to address
  if ( req.body.line2 ) address.line2 = req.body.line2;

  try {
    // update address
    await addressController.update( addrId, { ...address });
    const addr = await addressController.get( addrId );
    res.status( 200 ).json( addr );
  } catch ( error ) {
    res.send( error );
  }
});

// delete an address
app.delete( '/address-book/:id', async ( req, res ) => {
  const addrId = req.params.id;
  try {
    const addr = await addressController.get( addrId );
    if ( !addr ) {
      res.status( 404 ).json({ error: 'ID not found.' });
    } else {
      const deleteAddr = await addressController.delete( addrId );
      res.status( 200 ).json({ msg: 'Address deleted.' });
    }
  } catch ( error ) {
    res.send( error );
  }
});

// search

app.get( '/search', async ( req, res ) => {
  const search = req.query.q;
  try {
    const results = await addressController.search( search );
    res.send( results );
  } catch ( error ) {
    res.send( error );
  }
});

app.listen( process.env.PORT || 3001 );
