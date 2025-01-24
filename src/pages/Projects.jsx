import React, { useState } from "react";
import {
  Card,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Box,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  BottomNavigation,
  BottomNavigationAction
} from "@mui/material";
import {
  ArrowDropDown as ArrowDropDownIcon,
  MoreVert as MoreVertIcon,
  ViewModule as ViewModuleIcon,
  ViewList as ViewListIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  Group as GroupIcon,
  Add as AddIcon
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import Projects from "../constants/ProjectData";

const AllProjects = () => {
  const [projects, setProjects] = useState(Projects);

  const [view, setView] = useState("grid");
  const [activeTab, setActiveTab] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [editedProject, setEditedProject] = useState({
    id: "",
    name: "",
    date: ""
  });
  const [bottomTabValue, setBottomTabValue] = useState(0);

  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handleToggle = (projectId) => {
    setDropdownOpen((prev) => (prev === projectId ? null : projectId));
  };

  const filteredProjects = projects
    .filter((project) => {
      if (activeTab === 1) return project.category === "GroupedProject";
      if (activeTab === 2) return project.category === "UngroupedProject";
      return true;
    })
    .filter((project) =>
      project?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleMenuOpen = (event, project) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedProject(null);
  };

  const handleEdit = () => {
    setEditedProject(selectedProject);
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    setProjects(projects?.filter((p) => p.id !== selectedProject.id));
    handleMenuClose();
  };

  const toggleSearch = () => setShowSearch((prev) => !prev);

  const handleEditDialogClose = () => setEditDialogOpen(false);

  const handleEditDialogSave = () => {
    if (editedProject?.id) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editedProject?.id
            ? { ...p, name: editedProject?.name, date: editedProject?.date }
            : p
        )
      );
    } else {
      const newProject = { ...editedProject, id: projects.length + 1 };
      setProjects((prev) => [...prev, newProject]);
    }

    setEditDialogOpen(false);
  };

  const handleViewToggle = () => setView(view === "grid" ? "list" : "grid");

  const handleAddNewProject = () => {
    setEditedProject({ id: "", name: "", date: "" });
    setEditDialogOpen(true);
  };

  return (
    <div>
      {!isMobile ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2
          }}
        >
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="All Projects" />
            <Tab label="GroupedProject" />
            <Tab label="UngroupedProject" />
          </Tabs>
          <Box>
            {showSearch ? (
              <TextField
                size="small"
                placeholder="Search projects"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mr: 2 }}
              />
            ) : null}
            <IconButton onClick={toggleSearch}>
              <SearchIcon />
            </IconButton>
            <IconButton onClick={handleViewToggle}>
              {view === "grid" ? <ViewListIcon /> : <ViewModuleIcon />}
            </IconButton>
            {!isMobile && (
              <Button
                onClick={handleAddNewProject}
                style={{
                  backgroundColor: "#0056b3",
                  color: "white",
                  borderRadius: "10px"
                }}
              >
                Create New +
              </Button>
            )}
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box>
          <h1
            style={{
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "15px",
              padding: "4px"
            }}
          >
            Projects
          </h1>
          <TextField
            size="large"
            placeholder="Search projects"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={toggleSearch}>
                  <SearchIcon />
                </IconButton>
              )
            }}
            sx={{
              mr: 4,
              display: "flex",
              justifyContent: "center",
              borderRadius: "16px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px"
              }
            }}
          />
        </Box>
      )}
      {!isMobile ? (
        <div
          style={{
            display: view === "grid" ? "grid" : "block",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "16px",
            padding: "16px"
          }}
        >
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              sx={{
                position: "relative",
                padding: "16px",
                textAlign: "center",
                borderRadius: "16px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                minHeight: "200px",
                cursor: "pointer",
                display: view === "list" ? "flex" : "block",
                flexDirection: view === "list" ? "row" : "column",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px"
              }}
            >
              <Link to={`/project/${project.id}`}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    position: "absolute",
                    top: "8px",
                    left: "16px",
                    fontWeight: "bold"
                  }}
                >
                  {project.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    position: "absolute",
                    top: "8px",
                    right: "16px",
                    color: "gray"
                  }}
                >
                  {project.date}
                </Typography>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    sx={{
                      bgcolor: project.color || "#1976d2",
                      width: 64,
                      height: 64,
                      margin: "40px 0 16px"
                    }}
                  >
                    {project.logo}
                  </Avatar>
                </div>
              </Link>
              <Button
                size="small"
                onClick={() => handleToggle(project.id)}
                sx={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  backgroundColor: "#1976d2",
                  color: "white",
                  borderRadius: "20px",
                  textTransform: "none"
                }}
                endIcon={<ArrowDropDownIcon />}
              >
                Enterprise
              </Button>
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: "16px",
                  right: "16px"
                }}
                onClick={(event) => handleMenuOpen(event, project)}
              >
                <MoreVertIcon />
              </IconButton>
              {dropdownOpen === project?.id && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% +8px)",
                    left: "120px",
                    textAlign: "left"
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{
                      marginBottom: "4px",
                      background: "#f5f5f5",
                      padding: "6px",
                      borderRadius: "8px"
                    }}
                  >
                    Personal
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      background: "#f5f5f5",
                      padding: "6px",
                      borderRadius: "8px"
                    }}
                  >
                    More
                  </Typography>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "16px",
            padding: "16px"
          }}
        >
          {filteredProjects?.map((project) => (
            <Card
              key={project.id}
              sx={{
                position: "relative",
                padding: "16px",
                textAlign: "center",
                borderRadius: "16px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                minHeight: "200px",
                cursor: "pointer"
              }}
            >
              <Link to={`/project/${project.id}`}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    position: "absolute",
                    top: "8px",
                    left: "6px",
                    fontSize: "12px"
                  }}
                >
                  {project?.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    position: "absolute",
                    top: "8px",
                    right: "6px",
                    color: "gray",
                    fontSize: "12px"
                  }}
                >
                  {project?.date}
                </Typography>

                <Avatar
                  sx={{
                    bgcolor: project.color || "#1976d2",
                    width: 64,
                    height: 64,
                    margin: "40px auto 16px"
                  }}
                >
                  {project.logo}
                </Avatar>
              </Link>

              <Button
                size="small"
                onClick={() => handleToggle(project.id)}
                sx={{
                  position: "absolute",
                  bottom: "16px",
                  left: "8px",
                  backgroundColor: "#1976d2",
                  color: "white",
                  borderRadius: "20px",
                  textTransform: "none"
                }}
                endIcon={<ArrowDropDownIcon />}
              >
                Enterprise
              </Button>
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: "16px",
                  right: "8px"
                }}
                onClick={(event) => handleMenuOpen(event, project)}
              >
                <MoreVertIcon />
              </IconButton>

              {dropdownOpen === project?.id && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% +8px)",
                    left: "100px",
                    textAlign: "left"
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{
                      marginBottom: "4px",
                      background: "#f5f5f5",
                      padding: "6px",
                      borderRadius: "8px"
                    }}
                  >
                    Personal
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      background: "#f5f5f5",
                      padding: "6px",
                      borderRadius: "8px"
                    }}
                  >
                    More
                  </Typography>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>
          {editedProject.id ? "Edit Project" : "Create New Project"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Project Name"
            type="text"
            fullWidth
            value={editedProject.name}
            onChange={(e) =>
              setEditedProject({ ...editedProject, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Date"
            type="text"
            fullWidth
            value={editedProject.date}
            onChange={(e) =>
              setEditedProject({ ...editedProject, date: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button
            onClick={handleEditDialogSave}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {isMobile && (
        <BottomNavigation
          value={bottomTabValue}
          onChange={(event, newValue) => setBottomTabValue(newValue)}
          showLabels
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Groups" icon={<GroupIcon />} />
          <BottomNavigationAction
            label="Add"
            icon={<AddIcon />}
            onClick={handleAddNewProject}
          />
        </BottomNavigation>
      )}
    </div>
  );
};

export default AllProjects;
