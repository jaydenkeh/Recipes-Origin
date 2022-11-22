import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [image, setImage] = useState({});
  const [input, setInput] = useState("");

  //* test out fetch
  //* In Edamam API --> based on the number of counts of recipes per request, map out all the recipes
  //? Inputs by user --> types of proteins, types of ingredients, types of sauces
  //? Outputs --> based on the inputs generate recommended recipes

  const apikey = "7ea5440820be1e1b904afbc6c8f3d309"; //* Edamam API Key
  const applicationid = "aeebdfb6"; //* Edamam ID

  useEffect(() => {
    const edamamUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${applicationid}&app_key=${apikey}`;
    const handleSearchQuery = async () => {
      const res = await fetch(edamamUrl);
      const data = await res.json();
      setImage(data);
    };
    handleSearchQuery();
    console.log(image);
  }, [input]);

  // useEffect(() => {
  //   let controller = new AbortController();
  //   const signal = controller.signal;

  //   const fetch = async () => {
  //     const testUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${applicationid}&app_key=${apikey}`;
  //     const res = await fetch(testUrl);
  //     const data = await res.json();
  //     setImage(data.hits[0].recipe.images.THUMBNAIL.url);
  //   };
  //   fetch();
  //   console.log(image);

  //   return () => {
  //     controller.abort();
  //   };
  // }, [input]);

  return (
    <div className="App">
      <form onSubmit={(e) => setInput(e.target.value)}>
        <input type="text"></input>
        <button type="submit">Search</button>
      </form>
      <img src={image}></img>
    </div>
  );
}
