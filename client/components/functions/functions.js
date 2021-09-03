import { useState } from "react";
import Button from "../button/button";
import Input from '../input/input'

export const deleteButton = async (id) => {
  console.log("deleting this..", id)
  try {
    // make fetch call
    const deleteAddr = await fetch('http://localhost:3001/address-book/'+id, {
      method: "DELETE"
    });
    console.log(deleteAddr.status);
  } catch (err) {
    console.error(err.message);
  }

};

export const AddForm = ({show, styles}) =>{
  const initialAddress = {
    // userName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: ""
  };
  const [address, setAddress] = useState(initialAddress); //to change initialAddress
  // const [submitted, setSubmit] = useState(false); // toggle view address state

  // tracks the values of the input, sets state for changes
  const handleInputChange = event => {
    const { name, value } = event.target;
    setAddress({ ...address, [name]: value });
  };

  // sends POST request
  const saveAddress = async () => {
    // userName: address.userName,
    var data = {
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
      zip: address.zip
    };
    try{
      const addNew = await fetch('http://localhost:3001/address-book/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
     
      console.log(addNew,JSON.stringify(data))
    }catch (err) {
        console.log("eror time",err);
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
export const EditCard = async (id, data) =>{
  try {
    const editAddr = await fetch('http://localhost:3001/address-book/'+id, {
      method: "PUT"
    });
  } catch (error) {
    console.error(error.message); 
  }
};