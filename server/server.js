const express = require( 'express' );
const addressController = require('./controllers/address/index');
var cors = require('cors');

const app = express();
// to read JSON
app.use(express.json());
// allow cross origin requests..
app.use(cors());




// get all 
app.get('/address-book', async (req, res) => {
  
  try {
    const addressList = await addressController.display();
    res.send(addressList);
   
  } catch (error) {
    res.send(error);
  }
});

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
    res.send({'new address id':addrId})
  } catch (err) {
    res.status(400).json(err);
  }
});

//update an address
app.put('/address-book/:id', async (req, res) => {
  let addrId = req.params.id;
  // construct address from form fields
  const address = { 
    line1: req.body.line1, 
    city: req.body.city, 
    state: req.body.state, 
    zip: req.body.zip 
  };
  // new variables
 
  try {
    // update address
    await addressController.update( addrId, {
      ...address,
      id: addrId,
    });
    const addr = await addressController.get(addrId);
    // res.send({msg: "Address updated.", addr});
    res.status(200).json(addr);
    
  } catch (error) {
    res.send(error);
  }
});

// delete an address
app.delete('/address-book/:id', async (req, res) => {
  let addrId = req.params.id;
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

//search 
app.get('/address-book/search', (req,res) =>{
  // 
  console.log(req.params.query)
});

app.listen( process.env.PORT );
