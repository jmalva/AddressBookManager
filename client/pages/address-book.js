import Head from 'next/head'
import Layout from '../components/layout/layout'
import Input from '../components/input/input'
import Card from '../components/card/card'
import Button from '../components/button/button'

import Contacts from '../components/contacts/contacts'
import { deleteAddress, saveAddress} from '../components/functions/functions'
import { useState,useEffect } from 'react'

export default function Home(  ) {

  // get all cards
  const [cards, setCards] = useState([]);
  // const [cards, setCards] = useState({addresses: []}); //original
  const [editOpen, setEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect( () =>{
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3001/address-book",);
        // {params: {query: 'asdasd'}}); //for search
        const jsonData = await res.json();
        setCards(jsonData);
      } catch (error) {
        console.log(error.message)
      }
    };

    fetchData();
    setIsLoading(false);
  }, []);
  // to toggle states
 
  // to add a card 
  const handleAdd = async (data) =>{
    setCards((cards) => [...cards, data])
  };
  // to delete cards
  const handleRemove = async (id) => {
    const status = await deleteAddress(id);
    const newList = cards.filter((item) => item.id !== id);
    setCards(newList);
  }
  
  // to edit cards
  function editCard (id) {
    const card = cards.filter((item) => item.id === id);
    console.log(card)
    toggle();
    console.log("changed state->",editOpen)
    // setCards(newList);
  }
  
      
  return (
    <Layout home>
      <Head>
        <title>Address Book</title>
      </Head>
      <h1 className="mb-8">Address Book</h1>
      <div className="w-full md:w-1/2">
        <Input
          icon="icon-search.svg"
          label="HELLO"
        ></Input>
      </div>
      <div className="mt-10">
        <Card editState={false} addState={true} onAdd={handleAdd}>
          <p className="text-lg">Add a new user's address</p>
        </Card>

        {/* my list of contacts */}
        <Contacts cards={cards} isLoading={isLoading} edit={editCard} editState={editOpen} onRemove={handleRemove} />
        

        {/* <Card editState={true}>
          <p>Harry Lobster</p>
          <p>185 Berry St #6100, San Francisco, CA 94107</p>
        </Card> */}
        {/* <Card>
          <p>Harry Lobster</p>
          <p>185 Berry St #6100, San Francisco, CA 94107</p>
        </Card> */}
      </div>
    </Layout>
  )
}