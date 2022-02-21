import { useState } from "react";
import Input from "../components/input/input";
export default function Search(props) {
  const [term, setTerm] = useState("");

  function changeValue(val) {
    setTerm(val);
    props.setSearch(val);
  }
  return (
    <div className="w-full lg:w-1/2">
      <form>
        <Input
          icon="icon-search.svg"
          label="Search"
          id="search"
          value={term}
          placeholder="Press Enter to Submit"
          func={(e) => {
            changeValue(e.target.value);
          }}
        >
          <button
            className="absolute"
            type="submit"
            onClick={props.handleSearch}
          ></button>
          <button
            className="absolute inset-y-0 right-0 flex items-center px-2 text-white bg-indigo-600 hover:bg-indigo-500 focus:bg-indigo-700"
            onClick={() => {
              setTerm(()=> "")
              props.clear();
            }}
          >
            clear
          </button>
        </Input>
      </form>
    </div>
  );
}
