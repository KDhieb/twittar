import "../css/components.css";
import { useState } from "react";

const AddTweet = () => {
  const [text, setText] = useState("");

  const onSubmitForm = async (e) => {
    console.log("works");
    e.preventDefault();
    try {
      // const body = { description };
      // const response = fetch("http://localhost:5000/tweets", {
      //   method: "POST",
      //   header: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     tweeterID: 1,
      //     tweet: text,
      //     likes: 0,
      //     retweets: 0,
      //   }),
      // });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <form className="tweet-form" onSubmit={onSubmitForm}>
        {/* <div className="tweet-form"> */}
        {/* <div className="form-control"> */}
        <input
          className="tweet-form-input"
          type="text"
          placeholder=" Add a Tweet"
          value={text}
          onChange={(e) => setText(e.target.value)}
          size={100}
          maxLength={100}
        />
        {/* </div> */}

        <input
          className="btn btn-primary font-weight-bold"
          type="submit"
          value="Tweet"
        />
        {/* </div> */}
      </form>
    </div>
  );
};

export default AddTweet;
