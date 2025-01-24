import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

const Navbar = ({ toggleSidebar, environment }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
            <Menu />
          </IconButton>
          <Typography variant="h6">Projects</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
