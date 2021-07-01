// import Amplify, { Auth } from "aws-amplify";
// import { useState, useEffect } from "react";
// import {
//   withAuthenticator,
//   AmplifySignOut,
//   AmplifySignUp,
// } from "@aws-amplify/ui-react";
// import { Button } from "react-bootstrap";

// const Signup = () => {
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [imagelink, setImagelink] = useState("");
//   const [password, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     Auth.signUp({
//       username,
//       password,
//       attributes: {
//         email,
//       },
//     }).then(() => {
//       alert("success!");
//     });
//   };

//   return (
//     <>
//       <h2 className="text-center mt-3">Sign Up</h2>
//       <div className="form-wrapper">
//         <form className="signup-form" onSubmit={handleSubmit}>
//           <div className="signup-form-wrapper">
//             <div className="signup-form-element-wrapper">
//               <div>
//                 <label for="firstname">First Name</label>
//                 <input
//                   className="form-control"
//                   id="firstname"
//                   type="text"
//                   // placeholder=" Add a Tweet"
//                   // value={text}
//                   // onChange={(e) => setText(e.target.value)}
//                   maxLength={255}
//                 ></input>
//               </div>
//               {/* </div> */}

//               {/* <div className="signup-form-element-wrapper"> */}
//               <div>
//                 <label for="lastname">Last Name</label>
//                 <input
//                   type="text"
//                   // placeholder=" Add a Tweet"
//                   // value={text}
//                   // onChange={(e) => setText(e.target.value)}
//                   maxLength={255}
//                   className="form-control"
//                   id="lastname"
//                 ></input>
//               </div>
//             </div>

//             <div className="signup-form-element-wrapper">
//               <div>
//                 <label for="email">Email</label>
//                 <input
//                   type="email"
//                   // placeholder=" Add a Tweet"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   maxLength={255}
//                   className="form-control"
//                   id="email"
//                 ></input>
//               </div>

//               <div>
//                 <label for="username">Username</label>
//                 <input
//                   type="text"
//                   // placeholder=" Add a Tweet"
//                   // value={text}
//                   // onChange={(e) => setText(e.target.value)}
//                   maxLength={255}
//                   className="form-control"
//                   id="username"
//                 ></input>
//               </div>
//             </div>

//             <div className="signup-form-element-wrapper">
//               <div>
//                 <label for="bio">Bio</label>
//                 <input
//                   type="text"
//                   // placeholder=" Add a Tweet"
//                   // value={text}
//                   // onChange={(e) => setText(e.target.value)}
//                   maxLength={255}
//                   size={100}
//                   className="form-control"
//                   id="bio"
//                 ></input>
//               </div>
//             </div>

//             <div className="signup-form-element-wrapper">
//               <div>
//                 <label for="imagelink">Image Link</label>
//                 <input
//                   type="text"
//                   // placeholder=" Add a Tweet"
//                   // value={text}
//                   // onChange={(e) => setText(e.target.value)}
//                   maxLength={255}
//                   className="form-control"
//                   id="imagelink"
//                 ></input>
//               </div>
//             </div>

//             <div className="signup-form-element-wrapper">
//               <div>
//                 <label for="pass1">Password</label>
//                 <input
//                   type="password"
//                   // placeholder=" Add a Tweet"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   maxLength={255}
//                   size={100}
//                   className="form-control"
//                   id="pass1"
//                 ></input>
//               </div>
//             </div>

//             <div className="signup-form-element-wrapper">
//               <div>
//                 <label for="pass2">Confirm Password</label>
//                 <input
//                   type="password"
//                   // placeholder=" Add a Tweet"
//                   // value={text}
//                   // onChange={(e) => setText(e.target.value)}
//                   maxLength={255}
//                   size={100}
//                   className="form-control"
//                   id="pass2"
//                 ></input>
//               </div>
//             </div>

//             <input
//               type="submit"
//               // placeholder=" Add a Tweet"
//               value="Sign up"
//               // onChange={(e) => setText(e.target.value)}
//               className="signup-form-button btn btn-primary"
//             ></input>
//           </div>

//           {/* <div className="signup-form-element-wrapper"> */}

//           {/* </div> */}
//         </form>
//       </div>
//     </>
//   );
// };

// export default Signup;
