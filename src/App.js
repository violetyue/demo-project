import logo from './logo.svg';
import './App.css';
import Reacr, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { mainRoutes } from './routes/index'


function App() {
  return (
    <div>
      <div className='App'>
          <Switch>
          {
            mainRoutes.map(route=>{
              return <
                Route 
                key={route.path} 
                path={route.path} 
                render={routeProps=>{
                  return <route.component {...routeProps} />
                }} 
              />
            })
          }
          </Switch>
        </div>
    </div>
  );
}

export default App;
