import React from "react";

export default function RecipeSearchMain({ setSearch }) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(e.target[0].value);
        }}
      >
        <input type="text"></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
