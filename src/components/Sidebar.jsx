import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Tabs,
  Tab
} from "@mui/material";
import { Build, Person, ExitToApp } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  return (
    <Drawer
      variant="persistent"
      open={isOpen}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: "blue",
          color: "white"
        }
      }}
    >
      <div
        style={{
          padding: "16px",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Typography variant="h6">StrideFuture</Typography>
        <span style={{ cursor: "pointer" }} onClick={toggleSidebar}>
          X
        </span>
      </div>
      <List>
        <ListItem>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: "white",
                height: "3px",
                borderRadius: "25px"
              }
            }}
            style={{
              border: "2px solid white",
              borderRadius: "25px"
            }}
          >
            <Tab
              style={{
                fontSize: "12px",
                color: activeTab === 0 ? "white" : "gray",
                textTransform: "none"
              }}
              label="Development"
            />
            <Tab
              style={{
                fontSize: "12px",
                color: activeTab === 1 ? "white" : "gray",
                textTransform: "none"
              }}
              label="Production"
            />
          </Tabs>
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemIcon style={{ color: "white" }}>
            <Build />
          </ListItemIcon>
          <ListItemText primary="Projects" style={{ color: "white" }} />
        </ListItem>
        <ListItem button component={Link} to="/user-management">
          <ListItemIcon style={{ color: "white" }}>
            <Person />
          </ListItemIcon>
          <ListItemText primary="User Management" style={{ color: "white" }} />
        </ListItem>
      </List>
      <div style={{ marginTop: "auto", padding: "16px", textAlign: "center" }}>
        <Avatar sx={{ margin: "0 auto" }}>JD</Avatar>
        <Typography
          variant="subtitle1"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          John Doe <ExitToApp />
        </Typography>
      </div>
    </Drawer>
  );
};

export default Sidebar;
