import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Tweets from "./components/Tweets";
import Profile from "./components/Profile";
import AddTweet from "./components/AddTweet";
import LoginForm from "./components/LoginForm";
import Error404 from "./components/Error404";
import {
  fetchTweets,
  fetchHomeTweets,
  createUser,
  fetchUserId,
} from "./fetcher";

import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  const [homeTweets, setHomeTweets] = useState([]);
  const [exploreTweets, setExploreTweets] = useState([]);
  const [userTweets, setUserTweets] = useState([]);
  const [authState, setAuthState] = useState([]);
  const [authUserId, setAuthUserId] = useState([]);
  const [authUsername, setAuthUsername] = useState([]);
  const [update, setUpdate] = useState([false]);

  const forceUpdate = () => {
    setUpdate([!update[0]]);
  };

  useEffect(async () => {
    fetchTweets().then((data) => {
      setExploreTweets(data);
    });

    onAuthUIStateChange(async (nextAuthState, authData) => {
      setAuthState([nextAuthState]);

      if (nextAuthState === AuthState.ConfirmSignUp) {
        const signUpAttrs = authData.signUpAttrs;
        const username = signUpAttrs.username;
        const email = signUpAttrs.attributes.email;
        // const phone = signUpAttrs.attributes.phone_number;
        const userID = await createUser(username, email);
        setAuthUserId([parseInt(userID)]);
      }

      if (nextAuthState === AuthState.SignedIn) {
        const username = authData.username;
        setAuthUsername([username]);
        fetchUserId(username).then((id) => {
          setAuthUserId([parseInt(id)]);
        });
      }
    });

    await Auth.currentAuthenticatedUser().then((data) => {
      setAuthUsername([data.username]);
      fetchUserId(data.username).then((id) => {
        setAuthUserId([parseInt(id)]);
      });
    });

    // await fetchTweets().then((data) => {
    //   setExploreTweets(data);
    // });

    if (authUserId) {
      await fetchHomeTweets(authUserId).then((data) => {
        setHomeTweets(data);
      });
    }
  }, [update]);

  const onAddTweet = (newTweets) => {
    setHomeTweets(newTweets);
  };

  const handleSignoutCallback = async (e) => {
    setAuthUserId([]);
  };

  const handleAuthStateChange = async (e) => {
    // empty
  };

  return (
    <div className="App">
      <Router>
        <withRouter></withRouter>
        <Navbar
          authUserID={authUserId}
          forceUpdate={forceUpdate}
          authState={authState}
          handleAuthStateChange={handleAuthStateChange}
          handleSignoutCallback={handleSignoutCallback}
          updateChild={update}
        />

        <Switch>
          <Route path="/" exact>
            {authUserId[0] && (
              <AddTweet
                authUserID={authUserId}
                onAddTweet={onAddTweet}
                forceUpdate={forceUpdate}
              />
            )}
            <Tweets
              tweets={exploreTweets}
              authUserID={authUserId}
              forceUpdate={forceUpdate}
            />
          </Route>

          <Route path="/home" exact>
            {authUserId[0] ? (
              <Tweets
                tweets={homeTweets}
                authUserID={authUserId}
                forceUpdate={forceUpdate}
              />
            ) : (
              <Error404 />
            )}
          </Route>

          <Route
            path="/users/:id"
            exact
            render={({ match }) => (
              <Profile
                key={window.location.pathname}
                id={match.params.id}
                authUserID={authUserId}
                forceUpdate={forceUpdate}
                onAddTweet={onAddTweet}
              />
            )}
          ></Route>

          <Route path="/auth" exact></Route>

          <Route path="/login" exact>
            <LoginForm
              handleAuthStateChange={handleAuthStateChange}
              forceUpdate={forceUpdate}
            />
          </Route>

          <Route path="*">
            <Error404 />
          </Route>

          <Redirect path="/404" />
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
