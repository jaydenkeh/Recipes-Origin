import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import RecipeIngredients from "./RecipeIngredients";

export default function RecipeSearchSingle() {
  const [nutritionImage, setNutritionImage] = useState("");
  const [recipe, setRecipe] = useState("");
  const params = useParams();

  const API_KEY = "183a2db63a2541348149f88b22f8870f";
  const API_KEY2 = import.meta.env.VITE_API_KEY2;
  const API_KEY3 = "4423f871ebd2424e8b1b80a9946595d4";

  useEffect(() => {
    const fetchNutrition = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${params.id}/nutritionWidget.png`,
          {
            params: {
              apiKey: API_KEY,
            },
          }
        );
        setNutritionImage(response.request.responseURL);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNutrition();
  }, [params.id]);

  useEffect(() => {
    const fetchRecipeInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${API_KEY}`
        );
        setRecipe(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipeInfo();
  }, [params.id]);

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
    <div className="singleRecipe">
      <div className="recipe-main-info">
        <div className="recipe-info">
          <div className="recipe-title">
            <h2>{recipe?.title}</h2>
          </div>
          <div className="recipe-summary-wrapper">
            <div className="recipe-summary-cuisine">
              Cuisines:{" "}
              {recipe?.cuisines !== null ? recipe?.cuisines?.join(", ") : "-"}
            </div>
            <div className="recipe-summary-time">
              Total Preparation Time: {recipe?.readyInMinutes} minutes
            </div>
            <div className="recipe-summary-dishtypes">
              Good for:{" "}
              {recipe?.dishTypes ? uppCaseFirstLetter(recipe?.dishTypes) : " "}
            </div>
          </div>
        </div>
        <div className="recipe-image">
          <img
            src={recipe?.image}
            style={{ borderRadius: "8px", maxWidth: "450px" }}
          />
        </div>
      </div>
      <Divider>
        <Chip label="Ingredients" />
      </Divider>
      <RecipeIngredients recipe={recipe} />
      <Divider>
        <Chip label="Directions" />
      </Divider>
      <div className="directions">
        <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
      </div>
      <Divider>
        <Chip label="Nutrition Facts" />
      </Divider>
      <div className="recipe-nutrition-image">
        <img src={nutritionImage} />
      </div>
      {/* <div className="recipeTasteImage"></div> to be considered */}
    </div>
  );
}
