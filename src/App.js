import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Tweets from "./components/Tweets";
import Profile from "./components/Profile";
import AddTweet from "./components/AddTweet";





function App() {

  const tweets = [
    {
      tweetid: 1,
      tweeterid: 1,
      dp: "dp1.jpg",
      username: "firstUser123",
      text: "I just attended a group wedding for people who have been waiting years to get married. Just wow. #equality #lovewins",
      date: "June 21 2021",
      liked: false,
      likes: 51,
      retweeted: false,
    },
    {
      tweetid: 2,
      tweeterid: 2,
      dp: "dp2.jpg",
      username: "secondUser123",
      text: "All these automated DMs wasting my time :) I get 100 per day at least. Here's a 4-second loop for your enjoyment. LOL pic.twitter.com/jOkebqXb5q",
      date: "June 19 2021",
      liked: true,
      likes: 120,
      retweeted: false,
    },
    {
      tweetid: 3,
      tweeterid: 3,
      dp: "dp4.jpg",
      username: "thirdUser123",
      text: "My #SocialMedia seniors book in 1200+ stores in Canada, next to #1 best seller by Harper Lee. TY @ShopprsDrugMart",
      date: "June 20 2021",
      liked: true,
      likes: 87,
      retweeted: true,
    },
  ];

  return (
    <div className="App">
      <Router>
        <Navbar />


      <Switch>
        <Route path="/" exact>
        <AddTweet/>
        <Tweets tweets={tweets} />

        </Route>


        <Route path="/explore" exact>

        <Tweets tweets={tweets} />
        

        </Route>

        <Route path="/users">
          <Profile/>

        </Route>


        <Route path="/auth">


        </Route>


        </Switch>



        <Footer />
      </Router>
    </div>
  );
}

export default App;
