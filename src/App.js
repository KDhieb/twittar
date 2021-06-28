import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Tweets from "./components/Tweets";
import Profile from "./components/Profile";
import AddTweet from "./components/AddTweet";
import { fetchTweets, fetchHomeTweets } from "./fetcher";

function App() {
  const authUserId = 6;

  const [homeTweets, setHomeTweets] = useState([]);

  const [exploreTweets, setExploreTweets] = useState([]);

  const [userTweets, setUserTweets] = useState([]);

  const [update, setUpdate] = useState([false]);

  const forceUpdate = () => {
    setUpdate([!update[0]]);
  };

  useEffect(async () => {
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

  return (
    <div className="App">
      <Router>
        <Navbar id={authUserId} />

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
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
