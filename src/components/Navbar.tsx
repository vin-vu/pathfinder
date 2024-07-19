import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Navbar() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 10,
              width: '100%',
            }}
          >
            <Button color="inherit">SET START NODE</Button>
            <Button color="inherit">SET TARGET NODE</Button>
            <Button color="inherit">ADD WALLS</Button>
            <Button color="inherit">CLEAR BOARD</Button>
            <Button color="inherit">RUN ALGORITHM</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
