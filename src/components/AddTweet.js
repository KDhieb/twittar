import "../css/components.css";
import { useState } from "react";
import { addTweet } from "../fetcher";

const AddTweet = ({ authUserID, onAddTweet, forceUpdate }) => {
  const [text, setText] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (text != "") {
      try {
        await addTweet(authUserID[0], text);
        setText("");
        forceUpdate();
        onAddTweet();
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
          maxLength={255}
        />

        <input
          className="btn btn-primary font-weight-bold"
          type="submit"
          value="Tweet"
        />
      </form>
    </div>
  );
};

export default AddTweet;
