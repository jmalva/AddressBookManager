import Card from '../card/card'

const AddAddress = (props) => {
  const handleAdd = props.handleAdd;
  return <Card editState={false} addState={true} onAdd={handleAdd}>
          <p className="text-lg">Add a new user's address</p>
        </Card>
}
export default AddAddress;