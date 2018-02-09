import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import firebase from 'firebase'
import { connect } from 'react-firebase'

import routes from "./routes";

import Hat from "./images/white-chef-hat.png"

firebase.initializeApp({
  apiKey: 'AIzaSyAky0Bu2elgDLSYw2I317K2i-ynje7sbRI',
  databaseURL: 'https://glowing-heat-8207.firebaseio.com'
})

const BasicExample = ({ recipes }) => (
  <Router>
    <div>
      <div className="header">
        <Link to="/">
          <img src={Hat} alt="Recipes Logo"/>
          <div>Recipes</div>
        </Link>
      </div>
      {routes}
    </div>
  </Router>
);

export default connect((props, ref) => ({
  recipes: 'recipes',
  // setValue: value => ref('counterValue').set(value)
}))(BasicExample)
