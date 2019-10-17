import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Main from "./pages/main";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="page/1" />} />
        <Route exact path="/page/:pageNumber" component={Main} />
      </Switch>
    </BrowserRouter>
  );
}
