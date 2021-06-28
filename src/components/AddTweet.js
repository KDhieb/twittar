import "../css/components.css";
import { useState, useEffect } from "react";
import { addTweet, fetchTweets } from "../fetcher";

const AddTweet = ({ id, onAddTweet, forceUpdate }) => {
  const [text, setText] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (text != "") {
      try {
        console.log(id, text);
        await addTweet(id, text);
        setText("");
        forceUpdate();
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  return (
    <div>
      <form className="tweet-form" onSubmit={onSubmitForm}>
        <input
          className="tweet-form-input"
          type="text"
          placeholder=" Add a Tweet"
          value={text}
          onChange={(e) => setText(e.target.value)}
          // size={100}
          maxLength={255}
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
