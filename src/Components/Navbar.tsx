import React from 'react';
import { AppBar, Toolbar, IconButton, Button, Box, Typography } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

interface NavbarProps {
  onNavigation: () => void;
  isOnMovieSelection: boolean;
}

const CustomNavbar: React.FC<NavbarProps> = ({ onNavigation, isOnMovieSelection }) => {
  const handleNavigation = () => {
    if (!isOnMovieSelection) {
      onNavigation();
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
    <AppBar className="nav" style={{ backgroundColor: '#fff', color: "black" }} position="static">
      <Toolbar className="toolbar">
        <IconButton edge="start" style={{ color: "#f06807" }} aria-label="menu" onClick={handleNavigation}>
          <MovieFilterIcon />
        </IconButton>
        <Navbar.Brand href="/" style={{textDecoration:"none",color:"black"}}>
          Book My Ticket
          </Navbar.Brand>
        <Box sx={{ flexGrow: 1 }} />
        <Navbar.Brand href="/" style={{textDecoration:"none",color:"black"}}>Home</Navbar.Brand>
        </Toolbar>
        </AppBar>
    </Container>
    </Navbar>
  );
};

export default CustomNavbar;
