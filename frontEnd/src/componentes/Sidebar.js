// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';


import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GradeIcon from '@mui/icons-material/Grade';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';




const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          boxSizing: 'border-box',
          backgroundColor: '#121214',  // Defina a cor de fundo como preta
          color: 'white',
        },
      }}

    >
      <List>
      <img style={{ paddingLeft:60,margin: 6.6 }} src="https://uploaddeimagens.com.br/images/004/670/425/thumb/icone.png?1700639164" alt="Dashboard Icon" width="70" height="70" />
      
      
      
      
<ListItemButton component={Link} to="/">
  <ListItemIcon>
    <DashboardIcon style={{ color: '#FFFFFF' }} />
  </ListItemIcon>
  <ListItemText primary="Dashboard" />
</ListItemButton>

<ListItemButton component={Link} to="/calendario">
  <ListItemIcon>
    <EventIcon style={{ color: '#FFFFFF' }} />
  </ListItemIcon>
  <ListItemText primary="Calendário" />
</ListItemButton>

<ListItemButton component={Link} to="/atividades">
  <ListItemIcon>
    <AssignmentIcon style={{ color: '#FFFFFF' }} />
  </ListItemIcon>
  <ListItemText primary="Atividades" />
</ListItemButton>

<ListItemButton component={Link} to="/materias">
  <ListItemIcon>
    <MenuBookIcon style={{ color: '#FFFFFF' }} />
  </ListItemIcon>
  <ListItemText primary="Matérias" />
</ListItemButton>

<ListItemButton component={Link} to="/notas">
  <ListItemIcon>
    <GradeIcon style={{ color: '#FFFFFF' }} />
  </ListItemIcon>
  <ListItemText primary="Notas" />
</ListItemButton>

<ListItemButton component={Link} to="/amigos">
  <ListItemIcon>
    <PeopleIcon style={{ color: '#FFFFFF' }} />
  </ListItemIcon>
  <ListItemText primary="Amigos" />
</ListItemButton>

<ListItemButton component={Link} to="/ajustes">
  <ListItemIcon>
    <SettingsIcon style={{ color: '#FFFFFF' }} />
  </ListItemIcon>
  <ListItemText primary="Ajustes" />
</ListItemButton>
        
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;




//dawd
