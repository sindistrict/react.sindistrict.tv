import React from 'react'
import ReactDOM from 'react-dom'

import Axios from 'axios'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import './styles.scss'

import PageSetup from './pages/setup'
import PageLogin from './pages/login'
import PageHome from './pages/home'

import Page401 from './pages/status/401'
import Page404 from './pages/status/404'


Axios.get('/api/status').then(response => {


  let status = response.data
  const authToken = localStorage.getItem('authToken') || false

  Axios.post('/api/authenticate', {authToken}).then(response => {

    status.account = response.data.account

    const SinDistrict = () => {

      function LoginRoute({children, ...rest}) {
  
        return <Route {...rest} render={({location}) => 
              !status.account ? (children) : (
              <Redirect to={{ pathname: "/", state: {from: location} }}/>
              )}/>
  
      }
  
  
      function PrivateRoute({children, ...rest}) {
  
        return <Route {...rest} render={({location}) => 
               status.account ? (children) : (
               <Redirect to={{ pathname: "/login", state: {from: location} }}/>
               )}/>
  
      }
  
      if(status.installed) {
  
        return <Router>
                 <Switch>
  
                   <Route exact path="/setup">
                     <Redirect to={{ pathname: "/"}}/>
                   </Route>
  
                   <LoginRoute exact path="/login">
                     <PageLogin/>
                   </LoginRoute>
  
                   <PrivateRoute exact path="/">
                     <PageHome status={status}/>
                   </PrivateRoute>
  
                   <PrivateRoute>
                     <Page404/>
                   </PrivateRoute>
  
                 </Switch>
               </Router>
  
      }else{
  
        return <Router>
                 <Switch>
  
                   <Route exact path="/setup">
                     <PageSetup status={status}/>
                   </Route>
  
                   <Redirect to={{ pathname: "/setup"}}/>
  
                 </Switch>
               </Router>
  
      }
  
    }
  
    ReactDOM.render(<SinDistrict/>, document.getElementById('root'))

  })

})