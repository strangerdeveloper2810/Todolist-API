import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./pages/Home/Header";
import Todolist from "./Todolist/Todolist";
import TodolistReduxSaga from "./Todolist/TodolistReduxSaga";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/todolist" component={Todolist} />
        <Route exact path="/todolistSaga" component={TodolistReduxSaga}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
