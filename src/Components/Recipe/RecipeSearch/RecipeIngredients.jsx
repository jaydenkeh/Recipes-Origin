import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function RecipeIngredients({ recipe }) {
  const [measure, setMeasure] = useState("us"); //either us or metric

  const handleToggle = (event, newToggle) => {
    setMeasure(newToggle);
  };

  return (
    <div className="recipe-ingredients">
      <div className="recipe-ingredients-wrapper">
        <div className="servings">{recipe.servings} servings</div>
        <div className="toggle-button">
          <ToggleButtonGroup
            color="primary"
            value={measure}
            exclusive
            onChange={handleToggle}
            aria-label="Platform"
          >
            <ToggleButton value="us">US</ToggleButton>
            <ToggleButton value="metric">METRIC</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="ingredients">
        <ul>
          {recipe?.extendedIngredients?.map((d, i) => {
            return (
              <li key={i}>
                {d.measures[measure].amount % 1 !== 0
                  ? Math.ceil(d.measures[measure].amount)
                  : d.measures[measure].amount}{" "}
                {d.measures[measure].unitLong} {d.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
