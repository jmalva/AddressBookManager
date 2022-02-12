import Input from "../components/input/input";
export default function Search(props) {
  return (
    <div className="w-full lg:w-1/2">
      <form className="search-bar">
        <Input
          icon="icon-search.svg"
          label="Search"
          func={(e) => {
            props.setSearch(e.target.value);
          }}
        ></Input>
        <button type="submit" onClick={props.handleSearch}></button>
      </form>
    </div>
  );
}
