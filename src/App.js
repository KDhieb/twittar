import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Tweets from "./components/Tweets";
import Profile from "./components/Profile";
import AddTweet from "./components/AddTweet";
import { fetchTweets } from "./fetcher";

function App() {
  const authUserId = 2;

  const [homeTweets, setHomeTweets] = useState([]);

  const [exploreTweets, setExploreTweets] = useState([]);

  const [update, setUpdate] = useState([false]);

  const forceUpdate = () => {
    setUpdate([!update[0]]);
  };

  useEffect(() => {
    fetchTweets().then((data) => {
      setHomeTweets(data);
      setExploreTweets(data);
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
