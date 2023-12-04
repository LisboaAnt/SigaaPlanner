// AppBar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppBarComponent = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Seu Aplicativo
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
