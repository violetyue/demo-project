
import './App.css';

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
          <Redirect to={mainRoutes[0].path} from="/admin" />
          </Switch>
        </div>
        </Frame>
  
  );
}

export default App;
