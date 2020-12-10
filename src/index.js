import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { loginRoutes } from './routes/index'

ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/admin' render={routeProps=><App {...routeProps} />}/>
      {loginRoutes.map(route => {
        return <Route key={route.path} {...route} />
      })}
    </Switch>
    <Redirect to='/login' from='/' />
  </Router>,
  document.getElementById('root')
);


reportWebVitals();
