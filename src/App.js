import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Charts from "./pages/Charts";
import Footer from "./components/Footer.js";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
      </Switch>
      <Switch>
        <Route path="/chart" exact>
          <Charts />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
