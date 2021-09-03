import { useState } from 'react';
import Card from '../card/card'
import { addNewAddress } from '../functions/functions'

const Contacts = ({cards, isLoading, onRemove}) => {
  
  return (
    <>
      {isLoading ? <div>Loading..</div> : cards?.map((item) => {
        // to controll edit
        const [edit, setEdit] = useState(false);
        const handleEdit = () => {
          setEdit(!edit);
        };
        // Line formatting
        let line2 = item.line1;
        if (item.line2) {
          //  to replace the suite with #
          line2 += item.line2.replace(/[^0-9]+/g, " #");
        }
        return (

          <Card key={item.id} editState={edit} data={item} onAdd={addNewAddress} onEdit={handleEdit} onRemove={onRemove}>
            <p>User Name</p>
            <p>{` ${line2}, ${item.city}, ${item.zip}`}</p>
          </Card>
        )
      }
      )}
    </>
  )
}
export default Contacts;