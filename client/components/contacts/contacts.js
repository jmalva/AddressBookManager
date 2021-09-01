import Card from '../components/card/card'

export const Contacts = ({cards}) => {
  return (
    <>
      {isLoading ? <div>Loading..</div> : cards?.map((item, index) => {
        let line2 = item.line1;
        if (item.line2) {
          //  to replace the suite with #
          line2 += item.line2.replace(/[^0-9]+/g, " #");
        }
        return (
          <Card editState={false}>
            <p>User Name</p>
            <p>{` ${line2}, ${item.city}, ${item.zip}`}</p>
          </Card>
        )
      }
      )}
    </>
  )
}