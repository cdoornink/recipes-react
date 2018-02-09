import React from "react";
import { Route, Link } from "react-router-dom";

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to="/topics/rendering">Rendering with React</Link>
        </li>
        <li>
          <Link to="/topics/components">Components</Link>
        </li>
        <li>
          <Link to="/topics/props-v-state">Props v. State</Link>
        </li>
      </ul>
      <Route path="/topics/:topicId" component={Topic} />
      <Route
        exact
        path="/topics"
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}
