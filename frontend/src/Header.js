import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Slide } from "@mui/material";
import { useNavigate } from "react-router-dom";
import languageData from '../../services/languageData.json'; // Import the translation file
import TextField from '@mui/material/TextField'; // Import TextField for the search input

// Стили для бэка header
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: `calc(${theme.shape.borderRadius}px + 0px)`,
  backdropFilter: "blur(24px)",
  backgroundColor: alpha(theme.palette.background.default, 0.6),
  padding: "8px 16px",
  boxShadow: theme.shadows[2],
  width: "162%",
  marginLeft: -375,
}));

const MenuButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  margin: "0 8px",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    transition: "background-color 0.3s ease",
  },
}));

const FlagIcon = ({ language }) => (
  <img
    src={language === "ru" ? "/photo/kaz flag.jpg" : "/photo/ru flag.webp"}
    alt={language === "ru" ? "Russian Flag" : "Kazakh Flag"}
    style={{ width: 20, height: 20, marginRight: 8 }}
  />
);

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [language, setLanguage] = React.useState("ru"); // Default to Russian
  const [searchTerm, setSearchTerm] = React.useState(""); // State for search input
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const switchLanguage = () => {
    setLanguage((prevLang) => (prevLang === "ru" ? "kz" : "ru"));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 0.28,
        width: '100%',
        background: 'linear-gradient(to bottom, #0000FF ,#87CEFA 20%, #D3D3D3 70%)',
      }}
    >
      <Container maxWidth="lg" sx={{ px: 0 }}>
        <StyledToolbar variant="dense" disableGutters >
          {/* Left side - Logo and navigation buttons */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <IconButton
              aria-label="Home button"
              onClick={() => {
                navigate("/");
              }}
              sx={{
                "&:hover img": {
                  transform: "scale(1.1)",
                  transition: "transform 0.3s ease",
                },
              }}
            >
              <img src="login.png" width="50px" height="50px" alt="Logo" />
            </IconButton>

            {/* Desktop Navigation Menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 2 }}>
              {["abiturient", "additionalinfo", "administration", "contacts", "courses", "pck", "photogallery", "umr"].map((menuItem) => (
                <MenuButton
                  key={menuItem}
                  variant="text"
                  color="info"
                  size="small"
                  onClick={() => navigate(`/${menuItem}`)}
                >
                  {languageData[language][menuItem]}
                </MenuButton>
              ))}
            </Box>
          </Box>

          {/* Right side - Language Switch, Login, and Mobile Menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Search input */}
            <TextField
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={language === "ru" ? "Поиск..." : "Іздеу..."}
              sx={{
                display: { xs: "none", md: "inline-flex" },
                mr: 2,
                width: "200px", // Set the width of the search input
              }}
            />

            {/* Language Switch with Flag */}
            <Button
              color="secondary"
              variant="outlined"
              size="small"
              onClick={switchLanguage}
              startIcon={<FlagIcon language={language} />}
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              {language === "ru" ? "KZ" : "RU"}
            </Button>

            {/* Login Button */}
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={() => navigate("/login")}
              sx={{ ml: 2, display: { xs: "none", md: "inline-flex" } }}
            >
              Вход
            </Button>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>

              {/* Animated Drawer for mobile menu */}
              <Drawer
                anchor="top"
                open={open}
                onClose={toggleDrawer(false)}
                TransitionComponent={Slide}
                transitionDuration={500}
              >
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "background.default",
                    minHeight: "100vh", // Makes drawer full height
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <IconButton onClick={toggleDrawer(false)} aria-label="Close menu">
                      <CloseRoundedIcon />
                    </IconButton>
                  </Box>
                  <Divider sx={{ my: 3 }} />

                  {/* Mobile menu items */}
                  {["abiturient", "additionalinfo", "administration", "contacts", "courses", "news", "pck", "photogallery", "umr"].map((menuItem) => (
                    <MenuItem
                      key={menuItem}
                      onClick={() => {
                        navigate(`/${menuItem}`);
                        setOpen(false); // Close drawer after selection
                      }}
                    >
                      {languageData[language][menuItem]}
                    </MenuItem>
                  ))}

                  {/* Login for mobile */}
                  <MenuItem
                    onClick={() => {
                      navigate("/login");
                      setOpen(false); // Close drawer after selection
                    }}
                  >
                    Вход
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
