import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TablePage from './views/TablePage';
import LandingPage from './views/LandingPage';
 
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={LandingPage} exact/>
            <Route path="/table" component={TablePage}/>
            <Route component={Error}/>
          </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;