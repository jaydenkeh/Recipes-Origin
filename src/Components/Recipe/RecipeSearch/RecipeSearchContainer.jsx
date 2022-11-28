import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import RecipeSearchMain from "./RecipeSearchMain";
import RecipeSearchResults from "./RecipeSearchResults";

export default function RecipeSearchContainer() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const API_KEY = "183a2db63a2541348149f88b22f8870f";
  // const API_KEY = import.meta.env.VITE_API_KEY;
  const API_KEY2 = import.meta.env.VITE_API_KEY2;
  const API_KEY3 = "4423f871ebd2424e8b1b80a9946595d4";

  useEffect(() => {
    const handleSearchQuery = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY3}`,
          {
            params: {
              query: search,
              addRecipeInformation: "true",
              number: "100",
            },
          }
        );
        setResults(response.data.results);
        console.log(response.data); //to check whether axios fetched the data
      } catch (error) {
        console.log(error);
      }
    };
    handleSearchQuery();
  }, [search]);

  return (
    <div>
      <h3>What would you like to cook today?</h3>
      <RecipeSearchMain setSearch={setSearch} />
      <h4>Recipes Just For You</h4>
      <RecipeSearchResults results={results} />
    </div>
  );
}
