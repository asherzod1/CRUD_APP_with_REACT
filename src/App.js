import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/LoginPage';
import StudentP from './pages/StudentP';
import TutorP from './pages/TutorP';
import ProtectedRoute from './const/ProtectedRoute';
import LayOut from './comps/LayOut';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={LoginPage} />
          <LayOut> 
            <ProtectedRoute path='/student' component={StudentP}/>
            <ProtectedRoute path='/tutor' component={TutorP} />
          </LayOut>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
