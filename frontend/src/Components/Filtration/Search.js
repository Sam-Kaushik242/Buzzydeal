import React, { Fragment, useState } from 'react'
import MetaData from '../layout/MetaData'
import "./Search.css"
const Search = () => {
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
        window.history.pushState(null, null, `/products/${keyword}`);
        window.dispatchEvent(new Event('popstate'));
      } else {
        window.history.pushState(null, null, '/products');
        window.dispatchEvent(new Event('popstate'));
      }
    };
  return (
    <Fragment>
      <MetaData title="Search A Product" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  )
}

export default Search
