"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#ffe6cc" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#800000" }}
        >
          HackYourFuture
        </Typography>
        <Button
          color="inherit"
          component={Link}
          href="/"
          sx={{ color: "#800000" }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          href="/meals"
          sx={{ color: "#800000" }}
        >
          Meals
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
