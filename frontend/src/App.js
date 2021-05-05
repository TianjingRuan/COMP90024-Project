import './App.css';
import React from "react";
import Navbar from '../../../COMP90024-Project/frontend/src/components/navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../../../COMP90024-Project/frontend/src/pages/home';
import {BarChart,WordCloud} from "./pages/diagram";
import {Language,Sentiment} from "./pages/map";


class App extends React.Component{
  render(){
    return (
      <div>
        <Router>
        <Navbar />
        <Switch>
          <Route path='/pages/home' exact component={Home} />
          <Route path='/map/language' exact component={Language} />
          <Route path='/map/sentiment' exact component={Sentiment} />
          <Route path='/diagram/barchart' exact component={BarChart} />
          <Route path='/diagrams/wordcloud' exact component={WordCloud} />
        </Switch>
      </Router>
      </div>
    )
  }
}
export default App;

