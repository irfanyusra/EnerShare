import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import decode from 'jwt-decode'

import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import Sell from "./pages/Sell/sell";
import Dashboard from './pages/dashboard/dashboard'

import Home  from './pages/home/home'

const checkAuth = () => {
  const token = localStorage.getItem('token')
  // const refreshToken = localStorage.getItem('refreshToken')
  console.log('token', token)
  if (!token) {
    return false
  }
  try {
    const payload = decode(token)
    if (payload.exp < new Date().getTime() / 1000) {
      return true
    }
  } catch (error) {
    console.log('error:', error)
    return false
  }
  return true
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    )
  )} />
)

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/sell" component={Sell}/>
      <AuthRoute exact path="/dashboard" component={Dashboard}/>
      {/* <Route exact path="/dashboard" component={Dashboard}/> */}
    </Switch>
  </Router>
)

export default App;
