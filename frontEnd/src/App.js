import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './componentes/Sidebar.js';
import Calendario from './pages/Calendario.js';
import Home from './pages/Home.js';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const userid = urlParams.get('userId');

  return (
    
    <Router>
      <div style={{ display: 'flex'}}>
      <Sidebar />
      </div>
        <div style={{ flex: 1, marginLeft: 200, padding: '20px', background: 'linear-gradient(to right, #007150,#323238, #121214)' }}>
          <Switch>
            <Route exact path='/'><Home userId={userid} /></Route>
            <Route path='/calendario'><Calendario userId={userid} /></Route>
            <Route path='/atividades'><Calendario /></Route>
          </Switch>
        </div>

    </Router>
  );
}

export default App;
