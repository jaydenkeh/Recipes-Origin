import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

export default function RecipeSearchResults({ results }) {
  const recipesPerRow = 15;
  const [next, setNext] = useState(recipesPerRow);

  const handleMoreRecipes = () => {
    setNext(next + recipesPerRow);
  };

  //implement setInterval function?
  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      handleMoreRecipes();
    }
  };

  const uppCaseFirstLetter = (arr) => {
    return arr
      .map((str) =>
        str
          .split(" ")
          .map((val) => val.replace(val.charAt(0), val.charAt(0).toUpperCase()))
          .join(" ")
      )
      .join(", ");
  };

  return (
    <div className="recipeContainer">
      {results?.slice(0, next)?.map((d, i) => {
        return (
          <Link to={`/recipe/${d.id}`} key={i}>
            <Box
              sx={{
                width: "18%",
                display: "inline-block",
                margin: "10px 0.5%",
                verticalAlign: "top",
                boxShadow: 3,
                borderRadius: "8px",
                "&:hover": {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <div className="imageContainer">
                <img
                  src={d?.image}
                  alt={d?.title}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </div>
              <p>{d?.title}</p>
              <p>
                Dietary:{" "}
                {uppCaseFirstLetter(
                  d?.diets.filter(
                    (data) =>
                      data === "gluten free" ||
                      data === "vegan" ||
                      data === "diary free"
                  )
                )}
              </p>
              <p>Est. Preparation Time: {d?.readyInMinutes} minutes</p>
            </Box>
          </Link>
        );
      })}
    </div>
  );
}
