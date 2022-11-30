import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import veganLogo from "../../../assets/veganlogo.svg";
import glutenLogo from "../../../assets/glutenfreelogo.svg";
import lactoseLogo from "../../../assets/lactosefreelogo.svg";

export default function RecipeSearchResults({ results }) {
  const recipesPerRow = 15;
  const [next, setNext] = useState(recipesPerRow);
  const navigate = useNavigate();

  const handleMoreRecipes = () => {
    setNext(next + recipesPerRow);
  };

  //implement setInterval function?
  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      handleMoreRecipes();
    }
  };

  return (
    <div className="recipeContainer">
      {results?.slice(0, next)?.map((d, i) => {
        return (
          <Box
            className="recipe"
            key={i}
            onClick={() => navigate(`/recipe/${d.id}`)}
            sx={{
              width: "18%",
              display: "inline-block",
              margin: "10px 0.5%",
              verticalAlign: "top",
              boxShadow: 3,
              borderRadius: "8px",
              "&:hover": {
                cursor: "pointer",
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
            <div className="recipe-title">{d?.title}</div>
            <div className="recipe-dietary">
              {d.diets.includes("vegan") ||
              d.diets.includes("gluten free") ||
              d.diets.includes("dairy free")
                ? d.diets?.map((diet, i) => {
                    if (diet === "vegan") {
                      return (
                        <img
                          className="dietary-logo"
                          src={veganLogo}
                          alt="vegan-logo"
                          key={i}
                        />
                      );
                    }
                    if (diet === "gluten free") {
                      return (
                        <img
                          className="dietary-logo"
                          src={glutenLogo}
                          alt="gluten-logo"
                          key={i}
                        />
                      );
                    }
                    if (diet === "dairy free") {
                      return (
                        <img
                          className="dietary-logo"
                          src={lactoseLogo}
                          alt="lactose-logo"
                          key={i}
                        />
                      );
                    }
                    return null;
                  })
                : "-"}
            </div>
            {d?.readyInMinutes / 60 < 1 ? (
              <p>Cooking Time: {d?.readyInMinutes} mins</p>
            ) : (
              <p>Cooking Time: {(d?.readyInMinutes / 60).toFixed(1)} hrs </p>
            )}
          </Box>
        );
      })}
    </div>
  );
}
