import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Tweets from "./components/Tweets";
import Profile from "./components/Profile";
import AddTweet from "./components/AddTweet";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { fetchTweets, fetchHomeTweets } from "./fetcher";

import {
  withAuthenticator,
  AmplifySignOut,
  AmplifySignUp,
  AmplifyAuthenticator,
} from "@aws-amplify/ui-react";

import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  const authUserId = 4;

  const [homeTweets, setHomeTweets] = useState([]);

  const [exploreTweets, setExploreTweets] = useState([]);

  const [userTweets, setUserTweets] = useState([]);

  const [update, setUpdate] = useState([false]);

  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  const forceUpdate = () => {
    setUpdate([!update[0]]);
  };

  useEffect(async () => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
      alert(`authState: ${authState}`);
      alert(`user: ${user}`);
    });

    await fetchTweets().then((data) => {
      setExploreTweets(data);
    });

    await fetchHomeTweets(authUserId).then((data) => {
      setHomeTweets(data);
    });
  }, [update]);

  const onAddTweet = (newTweets) => {
    setHomeTweets(newTweets);
  };

  onAuthUIStateChange((nextAuthState, authData) => {
    if (nextAuthState === AuthState.SignedIn) {
      console.log("user successfully signed in!");
      console.log("user data: ", authData);
    }
    if (!authData) {
      console.log("user is not signed in...");
    }
  });

  onAuthUIStateChange((nextAuthState, authData) => {
    if (nextAuthState === AuthState.SignedIn) {
      console.log("user successfully signed in!");
    }
  });

  const handleAuthStateChange = async (e) => {
    await e;
    alert(e);
    // alert(`auth state change! Auth: ${authState} User: ${user}`);
  };

  // alert(authState);

  return (
    <div className="App">
      <Router>
        <Navbar id={authUserId} forceUpdate={forceUpdate} />

        <Switch>
          <Route path="/" exact>
            <AddTweet
              id={authUserId}
              onAddTweet={onAddTweet}
              forceUpdate={forceUpdate}
            />
            <Tweets
              tweets={homeTweets}
              authUserID={authUserId}
              forceUpdate={forceUpdate}
            />
          </Route>

          <Route path="/explore" exact>
            <Tweets
              tweets={exploreTweets}
              authUserID={authUserId}
              forceUpdate={forceUpdate}
            />
          </Route>

          <Route
            path="/users/:id"
            render={({ match }) => (
              <Profile
                key={window.location.pathname}
                id={match.params.id}
                authUserID={authUserId}
                forceUpdate={forceUpdate}
              />
            )}
          ></Route>

          <Route path="/auth"></Route>

          <Route path="/signup">
            <AmplifyAuthenticator
              className="text-center"
              handleAuthStateChange={handleAuthStateChange}
            >
              <AmplifySignUp />
            </AmplifyAuthenticator>
          </Route>

          {/* <Route path="/login">
            <Login />
          </Route> */}
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
