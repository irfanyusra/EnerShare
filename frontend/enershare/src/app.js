// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 

import { Title } from './components/testComponent/test.sc' 
import Home  from './pages/home/home'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Title>Hello world!</Title>
      </Route>
      <Route exact path="/login">
        <Title>login!</Title>
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
    </Switch>
  </Router>
)

export default App;
