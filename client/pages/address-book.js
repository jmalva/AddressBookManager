import Head from 'next/head'
import Layout from '../components/layout/layout'
import Card from '../components/card/card'
import Button from '../components/button/button'

import Contacts from '../components/contacts/contacts'
import { deleteAddress} from '../components/functions/functions'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Search from '../components/search'
import Pagination from '../components/pagination'

export default function Home(  ) {
  // get all cards
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false); //
  const [search, setSearch] = useState("");
  // pagination
  let postsPerPage = 5;
  const [currPage, setCurrPage] = useState(1);

  //get current page's cards
  const indexOfLastCard = currPage * postsPerPage;
  const indexOfFirstCard = indexOfLastCard - postsPerPage;
  const currentPosts = cards.slice(indexOfFirstCard, indexOfLastCard); //slices out 5 posts

  // runs whenever component mounts or updates
  useEffect(() => {
    //
    const fetchData = async () => {
      setIsLoading(true); //in the process of fetching
      try {
        const res = await axios.get("http://localhost:3001/address-book/");
        setCards(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []); //[] only runs when it mounts

  // Change page
  const paginate = (pageNumber) => {
    setCurrPage(pageNumber)
  };

  // to add a card
  const handleAdd = async (data) => {
    setCards((cards) => [...cards, data]);
  };
  // to delete cards
  const handleRemove = async (id) => {
    const newList = cards.filter((item) => item.id !== id);
    setCards(newList);
  };

  //search
  const handleSearch = async (e) => {
    e.preventDefault();
    searchAddress(search);
  };
  const exitSearch = () =>{
    searchAddress();
  }
  const searchAddress = async (searchTerm) => {
    try {
      const res = await fetch(`http://localhost:3001/search?q=${searchTerm}`);
      const jsonData = await res.json();
      setCards(jsonData);
      setCurrPage(1);
    } catch (error) {
      console.log(error.message);
    }

  };

  return (
    <Layout home>
      <Head>
        <title>Address Book</title>
      </Head>
        <Search setSearch={setSearch} handleSearch={handleSearch} />
          
          <Card editState={false} addState={true} onAdd={handleAdd}>
            <p className="text-lg">Add a new user's address</p>
          </Card>
      <div className="mt-5">
        {/* my list of contacts */}
        <Contacts
          cards={currentPosts}
          isLoading={isLoading}
          onRemove={handleRemove}
        />
        {/* current={currPage} */}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={cards.length}
          paginate={paginate}
          current={currPage}
        />
      </div>
    </Layout>
  );
}