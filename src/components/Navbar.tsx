import { AppBar, Toolbar, Button } from "@mui/material";

export default function Navbar() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Button color="inherit">SET START NODE</Button>
          <Button color="inherit">SET TARGET NODE</Button>
          <Button color="inherit">ADD WALLS</Button>
          <Button color="inherit">CLEAR BOARD</Button>
          <Button color="inherit">RUN ALGORITHM</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
