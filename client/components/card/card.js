import styles from './card.module.scss'
import Button from '../button/button'
import Input from '../input/input'

export default function Card({children, editState, addState}) {
  return (
  <div className={styles.card}>
    <div className={`flex flex-wrap justify-between items-center`}>
      <div className="mb-4 md:mb-0">
        {children}
      </div>
      <div >
        {addState ? 
          <Button variant="secondary">Add Address</Button>
        : 
          <>
            <Button variant="secondary">Edit</Button>
            <Button variant="error">Delete</Button>        
          </>
        }
      </div>
    </div>
    <div className={`border-2 border-purple p-8 mt-8 w-full md:w-1/2 ${editState ? styles['card__edit--visible']: styles['card__edit']}`}>
      <Input></Input>
      <Input></Input>
      <Button variant="primary">Save</Button>
    </div>
  </div>
  )
}