import { BrowserRouter, Switch, Route } from "react-router-dom";

import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import VerifyEmail from "./pages/VerifyEmail";
import User from "./pages/User";
import Enterprise from "./pages/Enterprise";

import TopBar from "./components/TopBar";
import Dock from "./components/Dock";

import AuthProvider from "./contexts/auth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route
            exact
            path="/verify-email/:token/:id"
            component={VerifyEmail}
          />
          <Route exact path="/" component={Authentication} />
          <Route path="/app">
            <TopBar />
            <Route exact path="/app" component={Home} />
            <Route path="/app/settings" component={Settings} />
            <Route path="/app/enterprise/:id" component={Enterprise} />
            <Route path="/app/user/:id" component={User} />
          </Route>
        </Switch>
        <Dock />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
