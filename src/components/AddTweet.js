
import "../css/components.css";
import { useState } from "react";


const AddTweet = () => {

    const [text, setText] = useState('')

    return (
        <div>
    <form className="tweet-form" onSubmit={console.log("submitted")}>
      
      {/* <div className="tweet-form"> */}
      {/* <div className="form-control"> */}
        <input className="tweet-form-input"
          type="text"
          placeholder=" Add a Tweet"
          value={text}
          onChange={(e) => setText(e.target.value)}
          size={100}
          maxLength={100}
        />
      {/* </div> */}

      <input className="btn btn-primary font-weight-bold" type="submit" value="Tweet" />
      {/* </div> */}
    </form>
        </div>
    )
}

export default AddTweet
