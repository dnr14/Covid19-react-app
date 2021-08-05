import Header from "components/Header";
import Main from "components/Main";
import Home from "components/Home";
import BarChart from "components/chart/BarChart";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/main" component={Main} />
        <Route path="/bar" component={BarChart} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
