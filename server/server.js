const express = require( 'express' );
const addressController = require('./controllers/address/index');


const app = express();
app.use(express.json());

// grab one address
app.get( '/address-book/:id', async ( req, res ) => {
  let addrId = req.params.id;
  try {
    const getAddress = await addressController.get(addrId);
    if (!getAddress){
      res.status(404).json({err: "ID not found"});
    }
    res.status(200).json(getAddress); 
    
  } catch (error) {
    res.send(error);
  }
});

// add an address
app.post( '/address-book', async (req, res) => {
  let address = { line1: req.body.line1, city: req.body.city, state: req.body.state, zip: req.body.zip};
  try {
    let addrId = await addressController.add(address); //returns ID
    const addrData = await addressController.get( addrId);
    res.send({'new id':addrId})
  } catch (err) {
    res.status(400).json(err);
  }
});

//update an address

// delete an address
app.delete('/address-book/:id', async (req, res) => {
  let addrId = req.params.id;
  console.log(addrId)
  try {
    const addr = await addressController.get(addrId);
    if (!addr){
      res.status(404).json({error: "ID not found."});
    }
    else{
      const deleteAddr = await addressController.delete(addrId);
      res.status(200).json({msg: "Address deleted."});
    }
  } catch (error) {
    res.send(error);
  }
});


app.listen( process.env.PORT );
