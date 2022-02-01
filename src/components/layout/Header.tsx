import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../assets/deso-logo.png";
import Identity from "../DesoIdentity";

export const Header = () => {
  return (
    <>
      <AppBar position="static" className="bg-primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img className="max-h-[25px] mr-2 inline" src={Logo} />
            <div className="inline mt-4 max-h-[32px]">DeSo</div>
          </Typography>
          <Identity></Identity>
        </Toolbar>
      </AppBar>
    </>
  );
};
