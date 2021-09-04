import { useState } from "react";
import Button from "../button/button";
import Input from '../input/input'

export const deleteAddress = async (id) => {
  console.log("deleting this..", id)
  try {
    // make fetch call
    const deleteAddr = await fetch('http://localhost:3001/address-book/'+id, {
      method: "DELETE"
    });
  } catch (err) {
    console.error(err.message);
  }

};

// a form that lets us add a new address
export const AddForm = ({show, styles, toggle, onAdd}) =>{
  const initialAddress = {
    // userName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: ""
  };
  const [address, setAddress] = useState(initialAddress); //to change initialAddress

  // tracks the values of the input, sets state for changes
  const handleInputChange = event => {
    const { name, value } = event.target;
    setAddress({ ...address, [name]: value });
  };

  // sends POST request to add a new address
  const saveAddress = async (event) => {
    event.preventDefault();
    // userName: address.userName,
    var data = {
      line1: address.line1,
      // line2: address.line2,
      city: address.city,
      state: address.state,
      zip: address.zip
    };
    if (address.line2) data.line2 = address.line2;
    try {
      const addNew = await fetch('http://localhost:3001/address-book/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const addrID = await addNew.json(); //get address w/ ID
      onAdd(addrID); // adds new card to hook
      toggle();
    } catch (err) {
      console.error(err);
    }
  }; //saveAddress


  return (
    <div className={`border-2 border-purple p-8 mt-8 w-full md:w-1/2 ${show ? styles['card__edit--visible'] : styles['card__edit']}`}>
      <form>
        {/* <Input label={'Name:'} placeholder={"ex: Jane Doe"} name="userName"
        // func={handleInputChange}
        ></Input> */}
        <Input label={"Street:"} placeholder={"ex: 185 Berry Dr."}
          func={handleInputChange} name="line1"
        />
        <Input label={"Street Line2:"} placeholder={"ex: Suite 105"}
          func={handleInputChange} name="line2"></Input>
        <Input label={"City:"} func={handleInputChange} name="city" placeholder={"ex: San Francisco"}></Input>
        <Input label="State:" name="state" placeholder={"ex: CA"} func={handleInputChange}/>
        <Input label={"Zip:"} placeholder={"ex: 94107"} func={handleInputChange} name="zip" maxL={5}></Input>
        {/* send post request */}
        <Button variant="primary" func={saveAddress}>Save</Button>
      </form>

    </div>
  );
};

export const EditForm = ({show, styles, data, id, toggle, onEditSave}) =>{
  var originalData = {
    line1: data.line1,
    line2: data?.line2 || "",
    city: data.city,
    state: data.state,
    zip: data.zip,
    id: id
  };
  const [address, setAddress] = useState(originalData);
  
  // change the value based on input
  const handleInputChange = event => {
    event.persist();
    const { name, value } = event.target;
    setAddress({ ...address, [name]: value });
  };
  
  const saveEditedAddress = async (event) =>{
    event.preventDefault();
    // change the value of card
   
    const newData = {
      line1: address.line1,
      city: address.city,
      state: address.state,
      zip: address.zip,
      id: address.id
    };
    if (address.line2.length > 0) newData.line2 = address.line2;
    try {
      const editAddr = await fetch('http://localhost:3001/address-book/'+id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      onEditSave(newData);
      toggle();
        } catch (error) {
            console.error(error.message); 
  }
          // close address card
  };
  return(
    <div className={`border-2 border-purple p-8 mt-8 w-full md:w-1/2 ${show ? styles['card__edit--visible'] : styles['card__edit']}`}>
      <form>
        <Input 
          label="Address Line 1:"
          name="line1"
          placeholder={address.line1}
          func={handleInputChange}
        />
        <Input label="Address Line 2:"
          name="line2"
          placeholder={address.line2} 
          func={handleInputChange}
        ></Input>
        <Input label="City:"
          name="city"
          placeholder={address.city}
          func={handleInputChange}
          ></Input>
          
        <Input label="State:" name="state" placeholder={address.state} func={handleInputChange}></Input>
        <Input label="Zip:" name="zip" placeholder={address.zip} func={handleInputChange}
        ></Input>
        <Button variant="primary" func={saveEditedAddress}>Save</Button>
      </form>
    </div>
  );
};