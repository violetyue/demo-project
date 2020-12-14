import logo from './logo.svg';
import './App.css';
import Reacr, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { mainRoutes } from './routes/index'
import Frame from './layout/layout'


function App() {
  return (
    <div>
      <Frame>
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
        </Frame>
    </div>
  );
}

export default App;
