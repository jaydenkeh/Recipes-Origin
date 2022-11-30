import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecipeIngredients from "./RecipeIngredients";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

export default function RecipeSearchSingle({
  favorites,
  addToFavorite,
  deleteFromFavorite,
}) {
  const [nutritionImage, setNutritionImage] = useState("");
  const [recipe, setRecipe] = useState("");
  const params = useParams();
  const [cansave, setCanSave] = useState(true);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_KEY2 = import.meta.env.VITE_API_KEY2;
  const API_KEY3 = import.meta.env.VITE_API_KEY3;

  useEffect(() => {
    fetchRecipeInfo();
    fetchNutrition();
  }, [params.id]);

  const fetchRecipeInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${API_KEY2}`
      );
      setRecipe(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNutrition = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${params.id}/nutritionWidget.png`,
        {
          params: {
            apiKey: API_KEY2,
          },
        }
      );
      setNutritionImage(response.request.responseURL);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    function setButtonState() {
      favorites.forEach((data) => {
        if (data.id === recipe.id) {
          setCanSave(false);
        }
      });
    }
    setButtonState();
  }, [recipe]);

  const handleSave = (recipe) => {
    if (cansave === true) {
      addToFavorite(recipe);
      setCanSave(false);
    } else if (cansave === false) {
      deleteFromFavorite(recipe);
      setCanSave(true);
    }
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
              <p>
                Cuisines:
                {recipe?.cuisines.length < 0
                  ? recipe?.cuisines?.join(", ")
                  : " N.A."}
              </p>
            </div>
            <div className="recipe-summary-time">
              {recipe?.readyInMinutes / 60 < 1 ? (
                <p>Cooking Time: {recipe?.readyInMinutes} mins</p>
              ) : (
                <p>
                  Cooking Time: {(recipe?.readyInMinutes / 60).toFixed(1)} hrs
                </p>
              )}
            </div>
            <div className="recipe-summary-dishtypes">
              <p>
                Good for:{" "}
                {recipe?.dishTypes
                  ? uppCaseFirstLetter(recipe?.dishTypes)
                  : " "}
              </p>
            </div>
          </div>
          <div className="save-recipe">
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={
                  cansave === true ? <TurnedInNotIcon /> : <TurnedInIcon />
                }
                sx={
                  cansave === true
                    ? { backgroundColor: "white", minWidth: "180px" }
                    : {
                        backgroundColor: "#1a6bdb",
                        color: "white",
                        minWidth: "180px",
                        "&:hover": {
                          color: "#1a6bdb",
                        },
                      }
                }
                onClick={() => handleSave(recipe)}
              >
                {cansave === true ? "Save Recipe" : "Unsave Recipe"}
              </Button>
            </Stack>
          </div>
        </div>
        <div className="recipe-image">
          <img
            src={recipe?.image}
            alt={recipe?.title}
            style={{ borderRadius: "8px", maxWidth: "450px" }}
          />
        </div>
      </div>
      <br />
      <Divider>
        <Chip label="Ingredients" />
      </Divider>
      <RecipeIngredients recipe={recipe} />
      <Divider>
        <Chip label="Directions" />
      </Divider>
      <div className="directions">
        {recipe?.instructions !== null ||
        recipe?.instructions !== "" ||
        recipe?.instructions !== undefined ? (
          <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
        ) : (
          <p>
            Please check out <a href={recipe.sourceUrl}>{recipe.sourceUrl}</a>{" "}
            for more information.
          </p>
        )}
      </div>
      <Divider>
        <Chip label="Nutrition Facts" />
      </Divider>
      <div className="recipe-nutrition-image">
        <img src={nutritionImage} alt="nutritionfacts" />
      </div>
    </div>
  );
}
