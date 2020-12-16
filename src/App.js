import logo from './logo.svg';
import './App.css';
import Reacr, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { mainRoutes } from './routes/index'
import Frame from './layout/layout'



function App() {
  
  return (  
    
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
  
  );
}

export default App;
