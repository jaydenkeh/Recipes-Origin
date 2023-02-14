import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import RecipeSearchMain from "./RecipeSearchMain";
import RecipeSearchResults from "./RecipeSearchResults";

export default function RecipeSearchContainer() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_KEY2 = import.meta.env.VITE_API_KEY2;

  useEffect(() => {
    const handleSearchQuery = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`,
          {
            params: {
              query: search,
              addRecipeInformation: "true",
              number: "100",
            },
          }
        );
        setResults(response.data.results);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}`,
          {
            params: {
              query: search,
              addRecipeInformation: "true",
              number: "100",
            },
          }
        );
        setResults(response.data.results);
        console.log(response.data);
      }
    };
    handleSearchQuery();
  }, [search]);

  return (
    <>
      <div className="main-header">
        <h2>What would you like to cook today?</h2>
      </div>
      <RecipeSearchMain setSearch={setSearch} />
      <div className="search-results-header">
        <h3>
          {search === ""
            ? "Top Favorite Recipes Just For You"
            : `Recipes search for: ${search}`}
        </h3>
      </div>
      <RecipeSearchResults results={results} />
    </>
  );
}
