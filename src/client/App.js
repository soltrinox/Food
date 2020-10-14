import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Link } from "react-router-dom";

import Upload from "./Upload";
import Gallery from "./Gallery";
import Home from "./Home";
import TopNav from "./NavBar";
import PageTitle from "./PageTitle";

const App = () => {
  return (
    <>
      <TopNav />
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/upload"
        render={(props) => (
          <PageTitle {...props} component={Upload} title="Upload images" />
        )}
      />
      <Route
        exact
        path="/gallery"
        render={(props) => (
          <PageTitle {...props} component={Gallery} title="Gallery" />
        )}
      />
    </>
  );
};

export default App;
