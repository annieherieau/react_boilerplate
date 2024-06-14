import { NavLink } from "react-router-dom";
import { useAtomValue } from "jotai";
import { isAuthAtom, userAtom } from "../app/atoms";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { redirectTo, removeCookie } from "../app/utils";
import { buildRequestOptions } from "../app/api";
import NoticeModal from "./NoticeModal";

export default function Header() {
  const { token } = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [anchorEl, setAnchorEl] = useState(null);

  const hendleResponse = (response)=>{
    if(response.status.code == 200){
      removeCookie();
      redirectTo();
    }
  }
  // déconnexion
  const handleLogout = () => {
    // créer les options de requete
    const { url, options } = buildRequestOptions("users", "sign_out", {
      token: token,
    });
    // lancer la requete
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => hendleResponse(response))
      .catch((err) => console.error(err));  
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            RAYM Marketplace
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button component={NavLink} to="/" color="inherit">
              Accueil
            </Button>
            {!isLoggedIn && (
              <div>
                <Button component={NavLink} to="/login" color="inherit">
                  Connexion
                </Button>
                <Button component={NavLink} to="/register" color="inherit">
                  Inscription
                </Button>
              </div>
            )}
            {isLoggedIn && (
              <div>
                <Button component={NavLink} to="/user_settings" color="inherit">
                  Mes informations
                </Button>
                <Button onClick={handleLogout} color="inherit">
                  Se déconnecter
                </Button>
              </div>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton edge="start" color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={NavLink} to="/" onClick={handleMenuClose}>
          Accueil
        </MenuItem>
        {!isLoggedIn && (
          <div>
            <MenuItem component={NavLink} to="/login" onClick={handleMenuClose}>
              Connexion
            </MenuItem>
            <MenuItem
              component={NavLink}
              to="/register"
              onClick={handleMenuClose}
            >
              Inscription
            </MenuItem>
          </div>
        )}
        {isLoggedIn && (
          <div>
            <MenuItem
              component={NavLink}
              to="/user_settings"
              onClick={handleMenuClose}
            >
              Mes informations
            </MenuItem>
            <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
          </div>
        )}
      </Menu>
    </AppBar>
    <NoticeModal />
    </header>
  );
}
