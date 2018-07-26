import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import VexPanel from './VexPanel';
import Vex from 'vexflow';
import { randoMeasure } from './utils/randoMeasure';
import { vexify } from './utils/vexify';

const {StaveNote} = Vex.Flow;

const notes = vexify(randoMeasure());

const Page = ({ title }) => (
    <div className="App">
      <VexPanel notation={notes} time="4/4"/>
    </div>
);

const Home = (props) => (
  <Page title="Home"/>
);

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
      </Router>
    );
  }
}

export default App;
