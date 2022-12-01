import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import RecipeSearchContainer from "./Components/Recipe/RecipeSearch/RecipeSearchContainer";
import RecipeSearchSingle from "./Components/Recipe/RecipeSearch/RecipeSearchSingle";
import SavedRecipes from "./Components/Recipe/RecipeSearch/SavedRecipes";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import mainLogo from "./assets/recipes-origin-main-logo.png";

export default function App() {
  const [favorites, setFavorites] = useState([]);

  const addToFavorite = (recipe) => {
    setFavorites([...favorites, recipe]);
  };

  const deleteFromFavorite = (recipe) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.id !== recipe.id
    );
    setFavorites(newFavoriteList);
  };

  useEffect(() => {
    const savedRecipesFromLocalStorage = JSON.parse(
      localStorage.getItem("savedrecipes")
    );
    if (savedRecipesFromLocalStorage !== null) {
      setFavorites(savedRecipesFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedrecipes", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <img className="main-logo" src={mainLogo} alt="recipes-origin-logo" />
        </Toolbar>
        <List>
          <Link to="/">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Search Recipes" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/savedrecipes">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Saved Recipes" />
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DinnerDiningIcon />
              </ListItemIcon>
              <ListItemText primary="Meal Planner (Coming Soon)" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <div className="App">
        <Routes>
          <Route path="/" element={<RecipeSearchContainer />} />
          <Route
            path="/recipe/:id"
            element={
              <RecipeSearchSingle
                addToFavorite={addToFavorite}
                deleteFromFavorite={deleteFromFavorite}
                favorites={favorites}
              />
            }
          />
          <Route
            path="/savedrecipes"
            element={
              <SavedRecipes
                favorites={favorites}
                deleteFromFavorite={deleteFromFavorite}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}
