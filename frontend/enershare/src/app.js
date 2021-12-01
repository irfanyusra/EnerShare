import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom' 
import decode from 'jwt-decode'

import { Title } from './components/testComponent/test.sc' 
import Login  from './pages/login/login'
import SignUp from './pages/signup/signup'
import Dashboard from './pages/dashboard/dashboard'

// import Home  from './pages/home/home'

const checkAuth = () => {
  // const token = localStorage.getItem('token')
  // const refreshToken = localStorage.getItem('refreshToken')
  // if (!token || !refreshToken){
  //   return false
  // }

  // try {
  //   const payload = decode(refreshToken)
  //   if (payload.exp < new Date().getTime()/1000){
  //     return true
  //   }
  // } catch (error) {
  //   return false
  // }
  return true
}

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      checkAuth ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    )} />
)


const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Title>Hello world!</Title>
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/signUp">
        <SignUp/>
      </Route>
      <AuthRoute exact path="/dashboard" component={Dashboard}/>
      {/* <Route exact path="/home">
        <Home />
      </Route> */}
    </Switch>
  </Router>
)

export default App;
