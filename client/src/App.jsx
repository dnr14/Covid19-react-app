import Header from "components/Header";
import Main from "components/Main";
import Home from "components/Home";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NotFound from "components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/main" component={Main} />
        <Route path="/404" component={NotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
