import { useState } from 'react';
import Card from '../card/card'
import DisplayCard from '../card/displaycard';

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
  
  return (
    <Card
      editState={edit}
      data={newData}
      toggleEdit={handleEdit}
      onRemove={remove}
      onEdit={saveValue}
    >
      <h3>{newData.userName}</h3>
      <div className="max-w-md">
        <p className="flow-text break-words">{` ${line2}, ${newData.city}, ${newData.state} ${newData.zip}`}</p>
      </div>
    </Card>
  );
};

const Contacts = ({cards, isLoading, onRemove}) => {
  
  return (
    <div className="min-h-screen">
      {isLoading ? (
        <DisplayCard>Loading..</DisplayCard>
      ) : (
        cards?.map((item) => {
          return <AddressCard key={item.id} data={item} remove={onRemove} />;
        })
      )}
    </div>
  );
}
export default Contacts;