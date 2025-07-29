"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#001a33" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#d9f2e6" }}
        >
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
            HackYourFuture
          </a>
        </Typography>
        <Button
          color="inherit"
          component={Link}
          href="/"
          sx={{ color: "#d9f2e6" }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          href="/meals"
          sx={{ color: "#d9f2e6" }}
        >
          Meals
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
