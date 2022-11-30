import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

export default function SavedRecipes({ favorites, deleteFromFavorite }) {
  const navigate = useNavigate();

  const handleDelete = (recipe) => {
    deleteFromFavorite(recipe);
  };

  return (
    <div className="saved-recipes">
      <h2>Saved Recipes</h2>
      {favorites?.map((d, i) => {
        return (
          <div className="recipe" key={i}>
            <Box
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
              <p>{d?.title}</p>
            </Box>
            <div className="remove-recipe-btn">
              <button onClick={() => handleDelete(d)}>Remove Recipe</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
