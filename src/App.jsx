import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import RecipeSearchContainer from "./Components/Recipe/RecipeSearch/RecipeSearchContainer";
import RecipeSearchSingle from "./Components/Recipe/RecipeSearch/RecipeSearchSingle";
import SavedRecipes from "./Components/Recipe/RecipeSearch/SavedRecipes";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import ArticleIcon from "@mui/icons-material/Article";

export default function App() {
  return (
    <div className="App">
      <header>Wellness In Mind</header>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Wellness In Mind
            </Typography>
          </Toolbar>
        </AppBar> */}
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
          <Toolbar />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SavedSearchIcon />
                </ListItemIcon>
                <ListItemText primary="Saved Recipes" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DinnerDiningIcon />
                </ListItemIcon>
                <ListItemText primary="Meal Planner (Coming Soon)" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Articles (Coming Soon)" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
      <Routes>
        <Route path="/" element={<RecipeSearchContainer />} />
        <Route path="/recipe/:id" element={<RecipeSearchSingle />} />
        <Route path="/savedrecipes" element={<SavedRecipes />} />
        {/* <RecipeIngredientContainer /> */}
      </Routes>
    </div>
  );
}
