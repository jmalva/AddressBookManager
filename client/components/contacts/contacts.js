import { useState } from 'react';
import Card from '../card/card'
const AddressCard  = ({editState, data, remove}) =>{
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(!edit);
  };

  // Line formatting
  let line2 = data.line1;
  if (data.line2) {
    //  to replace the suite with #
    line2 += data.line2.replace(/[^0-9]+/g, " #");
  }
  return(
    <Card editState={edit} data={data} toggleEdit={handleEdit} onRemove={remove}>
      <p>User Name</p>
      <p>{` ${line2}, ${data.city}, ${data.state} ${data.zip}`}</p>
    </Card>
  );
};
const Contacts = ({cards, isLoading, onRemove}) => {
  
  return (
    <>
      {isLoading ? <div>Loading..</div> : cards?.map((item) => {
        // DONT PUT HOOKS INSIDE HERE, no state inside loops
        
        return (
          <AddressCard key={item.id} data={item} remove={onRemove}/>
        )
      }
      )}
    </>
  )
}
export default Contacts;