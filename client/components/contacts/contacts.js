import { useState } from 'react';
import Card from '../card/card'

const AddressCard  = ({data, remove}) =>{
  const [edit, setEdit] = useState(false); //toggles editState
 
  // console.log("originally:", data)
  const [newData , setNewData] = useState(data);

  // changesValue on card after save is pressed
  const saveValue = (savedData) =>{
    setNewData(savedData);
  }

  const handleEdit = () => {
    setEdit(!edit);
  };

  let line2 = newData.line1;
  //  to replace the suite with #
  if (newData.line2) line2 += " #"+ newData.line2.replace(/[^0-9]+/g, "");
  
  return(
    <Card editState={edit} data={newData} toggleEdit={handleEdit} onRemove={remove} onEdit={saveValue}>
      <p>User Name</p>
      <p>{` ${line2}, ${newData.city}, ${newData.state} ${newData.zip}`}</p>
    </Card>
  );
};

const Contacts = ({cards, isLoading, onRemove}) => {
  
  return (
    <>
      {isLoading ? <div>Loading..</div> : cards?.map((item) => {
        
        return (
          <AddressCard key={item.id} data={item} remove={onRemove}/>
        )
      }
      )}
    </>
  )
}
export default Contacts;