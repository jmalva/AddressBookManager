import styles from './card.module.scss'
import Button from '../button/button'
import Input from '../input/input'
import { AddForm, EditForm} from '../functions/functions'
import { useCallback, useState } from 'react'

export default function Card({children, editState, addState, onAdd, toggleEdit, onRemove, data, onEdit}) {
  const [isAddOpen, setAddOpen] = useState(false); //toggle addForm
  function toggleAdd() {
    setAddOpen(!isAddOpen);
  }

  const handleNewAddress = (data) =>{
    // update the state in the parent..
    onAdd(data);
  }
  
  return (
  <div className={styles.card}>
    <div className={`flex flex-wrap justify-between items-center`}>
      <div className="mb-4 md:mb-0">
        {children}
      </div>
      <div >
        {addState ? 
            <Button variant="secondary" func={toggleAdd}>Add Address</Button>
        : 
          <>
            <Button variant="secondary" func={toggleEdit}>Edit</Button>
              <Button variant="error" func={() => {
                onRemove(data.id)
                }}>Delete</Button>
          </>
        }
      </div>
    </div>
    {/* toggleEdit = toggles edit */}
    {editState &&
     <EditForm show={editState} styles={styles} data={data} id={data.id} toggle={toggleEdit} onEditSave={onEdit}/>
     }
    
    {addState && <AddForm show={isAddOpen} styles={styles} toggle={toggleAdd} onAdd={handleNewAddress} />}
  </div>
  )
}