import React from "react";

export default function RecipeSearchMain({ setSearch }) {
  return (
    <div className="search-bar-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(e.target[0].value);
        }}
      >
        <input
          className="search-input"
          type="text"
          placeholder="Search by ingredient or cuisine"
        ></input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
