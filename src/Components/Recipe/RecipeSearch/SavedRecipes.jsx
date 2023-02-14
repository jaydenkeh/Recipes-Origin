import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

export default function SavedRecipes({ favorites, deleteFromFavorite }) {
  const navigate = useNavigate();

  const handleDelete = (recipe) => {
    deleteFromFavorite(recipe);
  };

  return (
    <>
      <div className="saved-recipes-header">
        <h3>Saved Recipes</h3>
      </div>
      <div className="saved-recipes">
        {favorites?.map((d, i) => {
          return (
            <Box
              className="one-saved-recipe"
              key={i}
              sx={{
                width: "18%",
                height: "280px",
                display: "flex",
                flexDirection: "column",
                margin: "10px 0.5%",
                boxShadow: 3,
                borderRadius: "8px",
              }}
            >
              <div className="image-container">
                <img
                  src={d?.image}
                  alt={d?.title}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </div>
              <div
                className="saved-recipe-title"
                onClick={() => navigate(`/recipe/${d.id}`)}
              >
                <p>{d?.title}</p>
              </div>
              <div className="remove-recipe-overlay">
                <span className="remove-recipe" onClick={() => handleDelete(d)}>
                  Remove Recipe
                </span>
              </div>
            </Box>
          );
        })}
      </div>
    </>
  );
}
