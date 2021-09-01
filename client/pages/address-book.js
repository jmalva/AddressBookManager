import Head from 'next/head'
import Layout from '../components/layout/layout'
import Input from '../components/input/input'
import Card from '../components/card/card'
import Button from '../components/button/button'

import { useState,useEffect } from 'react'

export default function Home(  ) {

  // get all cards
  const [cards, getCards] = useState([]);
  // const [cards, getCards] = useState({addresses: []}); //original
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect( () =>{
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch("http://localhost:3001/address-book/");
      // {params: {query: 'asdasd'}}); //for search
      const jsonData = await res.json();
    
      getCards(jsonData);
    };
    fetchData();
    setIsLoading(false);
    console.log("after fetch:", cards)
  }, []);

  const Contacts = () =>{
   return( 
     <>
       {isLoading ? <div>Loading..</div> : cards?.map((item, index) => {
         let line2 = item.line1;
         if (item.line2) {
          //  to replace the suite with #
           line2 +=  item.line2.replace(/[^0-9]+/g, " #"); 
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
        <Card editState={false} addState={true}>
          <p className="text-lg">Add a new user's address</p>
        </Card>

        {/* my list of contacts */}
        <Contacts />
        

        <Card editState={true}>
          <p>Harry Lobster</p>
          <p>185 Berry St #6100, San Francisco, CA 94107</p>
        </Card>
        <Card>
          <p>Harry Lobster</p>
          <p>185 Berry St #6100, San Francisco, CA 94107</p>
        </Card>
      </div>
    </Layout>
  )
}