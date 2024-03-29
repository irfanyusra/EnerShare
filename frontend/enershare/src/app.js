import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import decode from 'jwt-decode'

import Home from './pages/home/home'
import Login from './pages/login/login'
import SignUp from './pages/signup/signup'
import Sell from "./pages/Sell/sell"
import Blockchain from "./pages/Blockchain/blockchain"

import NavigationBar from "./components/navigationBar/navigationBar"
import Dashboard from './pages/dashboard/dashboard'
import Marketplace from './pages/marketplace/marketplace';

const checkAuth = () => {
  const token = localStorage.getItem('token')
  // const refreshToken = localStorage.getItem('refreshToken')
  if (!token && token === 'undefined') {
    return false
  }
  try {
    const payload = decode(token)
    if (payload.exp < new Date().getTime() / 1000) {
      return true
    }
  } catch (error) {
    console.log('token error:', error)
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
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />

      <> {/* This empty div is for the navigation to only show on authenticated routes */}
        <NavigationBar></NavigationBar>
        <AuthRoute exact path="/dashboard" component={Dashboard} />
        <AuthRoute exact path="/marketplace" component={Marketplace} />
        <AuthRoute exact path="/sell" component={Sell} />
        <AuthRoute exact path="/blockchain" component={Blockchain} />
      </>
    </Switch>
  </Router>
)

export default App;
