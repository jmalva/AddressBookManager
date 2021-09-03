import styles from './card.module.scss'
import Button from '../button/button'
import Input from '../input/input'
import {deleteButton, AddForm, EditCard} from '../functions/functions'
import { useCallback, useState } from 'react'

export default function Card({children, editState, addState, onAdd, onEdit, onRemove, data}) {
  const [isAddOpen, setAddOpen] = useState(false); //toggle addForm
  function toggleAdd() {
    setAddOpen(!isAddOpen);
  }

  // handle data for edit state
  const initialData = (!editState && addState) ? {
      userName: "",
      line1: "",
      line2: "",
      city: "",
      zip: ""
    } : data;
    // console.log("ITEM=",initialData)
  
  const [cardData, setCardData] = useState(initialData);
  

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
            <Button variant="secondary" func={onEdit}>Edit</Button>
              <Button variant="error" func={() => {
                onRemove(data.id),
                deleteButton(data.id)}}>Delete</Button>
          </>
        }
      </div>
    </div>
    <div className={`border-2 border-purple p-8 mt-8 w-full md:w-1/2 ${editState ? styles['card__edit--visible']: styles['card__edit']}`}>
      <form>
        <Input label="Line 1" 
        value={cardData.line1}
        ></Input>
        <Input label="City"></Input>
        <Input label="Zip"></Input>
        <Button variant="primary">Save</Button>
      </form>
    </div>
    {addState && <AddForm show={isAddOpen} styles={styles}/>}
  </div>
  )
}