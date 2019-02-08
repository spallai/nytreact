import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Saved from './pages/saved';
import Search from './pages/search';
import Nav from './components/Nav'
import './App.css';

function App() {
    return (
      <Router>
        <div>
          <Nav />
          <div className="jumbotron text-center col-md-10 mx-auto" style={{ border: '5px solid black', backgroundColor: 'white' }}>
          <h1>(React) Google Books Search</h1>
          </div>
          <Switch>
            <Route exact path="/" component ={Search}/>
            <Route exact path="/saved" component = {Saved}/>
            <Route path ="*" component = {Search}/>
          </Switch>
        </div>
      </Router>
    )
}

export default App;
