import React from "react";

export default function SavedRecipes({ favorites }) {
  return (
    <div className="saved-recipes">
      {favorites?.map((d, i) => {
        return (
          <div className="one-saved-recipe" key={i}>
            {d.title}
          </div>
        );
      })}
    </div>
  );
}
